import React, { useState,useEffect,useContext} from 'react';
import { AiOutlineUnlock } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { DataContext } from '../../contexts/DataContextProvider';
import * as jwt_decode from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); 
  const [alert, setAlert] = useState({ type: '', message: '', visible: false });
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const {data, setData,token, setToken}=useContext(DataContext)
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token:" + response.credential);
    var userObject = jwt_decode.default(response.credential);
    setData(userObject);
    setToken(response.credential);
    document.getElementById("signInDiv").hidden = true;
    console.log("Google User Object", userObject);
    navigate('/dashboard'); 
  };

  useEffect(() => {
    if (window.google && window.google.accounts) {
      const signInDiv = document.getElementById("signInDiv");
      if (signInDiv) {
        window.google.accounts.id.initialize({
          client_id: "1061442873056-t4jstmkpoorvg0bj4eeqrbps1v5rf8g3.apps.googleusercontent.com",
          callback: handleCallbackResponse,
        });
        window.google.accounts.id.renderButton(signInDiv, {
          theme: "filled_blue",
          size: "large",
        });
        window.google.accounts.id.prompt();
      } else {
        console.error("signInDiv not found");
      }
    } else {
      console.error("Google API not loaded");
    }
  }, []);
  
  
  const handleSubmit = (e) => {
    // console.log("logingevent",e)
    e.preventDefault();
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/;
    setEmailError('');
    setPasswordError('');

    if (!email && !password) {
      setEmailError('Email is required.');
      setPasswordError('Password is required.');
      toast.error('All fields are required.');
      return;
    }
    
    if (!email) {
      setEmailError('Email is required.');
      toast.error('Email is required.');
      return;
    }
    
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format. Email must include "@", ".", and only valid characters.');
      toast.error('Invalid email format. Email must include "@", ".", and only valid characters.');
      return;
    }
    
    if (!password) {
      setPasswordError('Password is required.');
      toast.error('Password is required.');
      return;
    }
    
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be 8-14 characters long and include uppercase, lowercase, digit, and special character.');
      toast.error('Password must be 8-14 characters long and include uppercase, lowercase, digit, and special character.');
      return;
    }
    
  
    saveFormData();
  
  };
  useEffect(() => {
    const storedEmail = localStorage.getItem('rememberedEmail');
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  const saveFormData = async (userData) => {
    try {
      const loginObject = {
        Email: email,
        Password: password,
      };
  
      const response = await axios.post(`${API_BASE_URL}/Login`, loginObject,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      console.log("Response", response)
      // const res = await response.json();
      if (response.status === 200 && response.data) {
        setData(response.data)
        setToken(response.data.Token);
        setAlert({
          type: 'success',
          message: response?.data?.Message || 'Login Successfully',
          visible: true,
        });
        toast.success(response?.data?.Message || 'Login Successfully');
        
        
        if (rememberMe) {
          localStorage.setItem('authToken', response.data.Token);
          localStorage.setItem('rememberedEmail', email); 
        } else {
          sessionStorage.setItem('authToken', response.data.Token);
        }
  
        setTimeout(() => {
          setAlert({ visible: false });
          navigate('/dashboard');
        }, 1000);
      } else {
        
        setAlert({ type: 'danger', message: 'Login failed. Please check your credentials and try again.', visible: true });
        setTimeout(() => setAlert({ visible: false }), 3000);
      }
    } catch (error) {
     
      const errorData = error.response?.data;
      const errorMessage = errorData?.Description || error.message;
  
      console.error('Error during login:', errorData || error.message);
  
      if (errorData?.ErrorCode === 80035) {
        setAlert({ type: 'danger', message: 'Email not registered. Please check your email or register.', visible: true });
      } else if (errorData?.ErrorCode === 80036) {
        setAlert({ type: 'danger', message: 'Incorrect password. Please try again.', visible: true });
      } else {
        setAlert({ type: 'danger', message: `Login failed: ${errorMessage}`, visible: true });
      }
  
      setTimeout(() => setAlert({ visible: false }), 3000);
    }
  };
  
  
  
  
  

  // const handleGoogleLogin = () => {
  //   navigate('/googleonetablogin');
  // };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='w-full flex justify-center items-center min-h-screen bg-[#d4d6ea]'>
      <div className='border-slate-100 bg-white rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm max-w-md w-full'>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        <div className='flex justify-start mb-6'>
          <a href="#" className='flex items-center text-2xl font-semibold text-gray-900'>
            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
            KCV
          </a>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <h2 className='text-4xl text-black font-bold text-start mb-6'>Welcome back!</h2>
          <p className='text-center mb-4'>Enter to get unlimited access to data & information</p>
          <div className='relative mb-4'>
          <div className='flex items-center justify-between'>
            <label htmlFor='email' className='required block text-sm mb-2'>Email</label>
            <BiUser className='text-gray-400 mr-2' />
          </div>
            <div className='flex items-center'>
              
              <input
                className='block w-full py-2.5 px-3 text-sm text-gray-700 bg-gray-100 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none'
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>
          <div className='relative mb-4'>
          <div className='flex items-center justify-between'>
            <label htmlFor='password' className='required block text-sm mb-2'>Password</label>
            <AiOutlineUnlock className='text-gray-400 mr-2' />
          </div>
            <div className='flex items-center'>
              <input
                className='block w-full py-2.5 px-3 text-sm text-gray-700 bg-gray-100 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none'
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 end-0 flex items-center px-3 text-gray-400"
              >
                <svg className="w-5 h-5 mt-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    className={!showPassword ? 'block' : 'hidden'}
                    d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                  />
                  <path
                    className={!showPassword ? 'block' : 'hidden'}
                    d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                  />
                  <path
                    className={!showPassword ? 'block' : 'hidden'}
                    d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                  />
                  <line
                    className={!showPassword ? 'block' : 'hidden'}
                    x1="2" x2="22" y1="2" y2="22"
                  />
                  <path
                    className={showPassword ? 'block' : 'hidden'}
                    d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                  />
                  <circle
                    className={showPassword ? 'block' : 'hidden'}
                    cx="12"
                    cy="12"
                    r="3"
                  />
                </svg>
              </button>
            </div>
             {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          </div>
         
          <div className='flex justify-between items-center mb-6'>
            <div className='flex items-center'>
              <input  type='checkbox'
                id='remember-me'
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)} className='mr-2' 
                />
              <label htmlFor='remember-me' className='text-sm text-gray-700'>Remember Me</label>
            </div>
            <Link to='/forgot-password' className='text-sm text-[#5138ee] hover:underline'>Forget Password?</Link>
          </div>
          <button
            className='w-full mb-4 text-white rounded-md bg-[#5138ee] hover:bg-blue-600 py-2.5 transition-colors duration-300'
            type="submit"
          >
            Login
          </button>

          <div className='flex items-center my-4'>
            <hr className='flex-grow border-gray-200' />
            <span className='px-4 text-sm text-gray-400'>Or Login with</span>
            <hr className='flex-grow border-gray-200' />
          </div>
        
          {/* <button
            onClick={handleGoogleLogin}
            className='w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:border-gray-400 hover:text-gray-900 transition duration-150'
            type="button"
          >
            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google logo" />
            <span>Sign Up with Google</span>
          </button> */}
  <div id="signInDiv"  className='w-full flex items-center justify-center gap-2 px-4 py-2  hover:border-gray-400 hover:text-gray-900 transition duration-150'></div>


          <div className='mt-4 text-center'>
            <small>Don't have an account? </small>
            <Link className='text-[#5138ee] hover:underline' to='/register'>Register</Link>
          </div>
        </form>
      </div>
   <div className='mt-100'>
   {alert.visible && (
        <div className={`w-96 fixed bottom-10 left-1/2 transform -translate-x-1/2 p-4 mb-4 text-sm rounded-lg ${alert.type === 'danger' ? 'bg-red-100 text-red-700 flex items-center justify-center ' : 'bg-green-100 text-green-700 flex items-center justify-center'}`} role="alert">
          {alert.message}
        </div>
      )}
   </div>
    </div>
  );
};

export default Login;
