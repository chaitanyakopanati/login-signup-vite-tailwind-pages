import React, { useState, useEffect } from 'react';
import { AiOutlineUnlock } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [roles, setRoles] = useState([]);
  const [roleid, setRoleid] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '', visible: false });

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [fullnameError, setFullnameError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [contactError, setContactError] = useState('');
  const [roleError, setRoleError] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE_URL}/GetAllRoles`)
      .then(response => {
        setRoles(response.data);
      })
      .catch(error => {
        setAlert({ type: 'danger', message: 'Failed to load roles.', visible: true });
        setTimeout(() => setAlert({ visible: false }), 3000);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/;
  
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setFullnameError('');
    setAddressError('');
    setContactError('');
    setRoleError('');
  

    // if (!username && !email && !password && !fullname && !address && !contact && !roles) {
    //   setUsernameError('Username is required.');
    //   setEmailError('Email is required.');
    //   setPasswordError('Password is required.');
    //   setFullnameError('Full name is required.');
    //   setAddressError('Address is required.');
    //   setContactError('Contact number is required.');
    //   setRoleError('Role selection is required.');
    //   toast.error('All fields are required.'); 
    //   return;
    // }
    let isValid = true;
  

    if (!username) {
      setUsernameError('Username is required.');
      toast.error('Username is required.');
      
      isValid = false;
      return; 
    }
    if (!email) {
      setEmailError('Email is required.');
      toast.error('Email is required.');
     
      isValid = false;
      return;
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid email format.Email must include "@", ".", and only valid characters.')
      toast.error('Invalid email format.Email must include "@", ".", and only valid characters.');
      isValid = false;
      return;
    }
    if (!password) {
      setPasswordError('Password is required.');
      toast.error('Password is required.');
      isValid = false;
      return;
    } else if (!passwordRegex.test(password)) {
      setPasswordError('Password must be 8-14 characters, include at least one uppercase letter, one lowercase letter, one digit, and one special character.')
      toast.error('Password must be 8-14 characters, include at least one uppercase letter, one lowercase letter, one digit, and one special character.');
      isValid = false;
      return;
    }
    if (!fullname) {
      setFullnameError('Full name is required.');
      toast.error('Full name is required.');
      isValid = false;
      return;
    }
    if (!address) {
      setAddressError('Address is required.');
      toast.error('Address is required.');
      isValid = false;
      return;
    } else if (address.length > 500) {
      setAddressError('Address must be less than 500 characters.');
      toast.error('Address must be less than 500 characters.');
      isValid = false;
      return;
    }
    if (!contact) {
      setContactError('Contact number is required.');
      toast.error('Contact number is required.');
      isValid = false;
      return;
    } else if (isNaN(contact) || contact.length !== 10) {
      setContactError('Contact number must be a 10-digit number.');
      toast.error('Contact number must be a 10-digit number.');
      isValid = false;
      return;
    }
    if (!roleid) {
      setRoleError('Role selection is required.');
      toast.error('Role selection is required.');
      isValid = false;
      return;
    }
  
    if (isValid) {
      saveFormData();
    }
  };
  

  const saveFormData = async () => {
    const createObject = {
      UserName: username,
      Email: email,
      Password: password,
      FullName: fullname,
      Address: address,
      Contact: contact,
      RoleId: roleid,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/RegisterNewUser`, createObject);

      if (response.status === 200) {
        toast.success('Registration successful!');
        setTimeout(() => navigate('/'), 1000);
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { Description, Parameter } = error.response.data;
        toast.error(`${Parameter}: ${Description}`);
      } else {
        toast.error('Registration failed. Please try again.');
      }
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-[#d4d6ea]">
      <div className="border-slate-100 bg-white rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm max-w-md w-full">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className='flex justify-start mb-6'>
           <a href="#" className='flex items-center text-2xl font-semibold text-gray-900'>
             <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
             KCV
           </a>
         </div>
        <form onSubmit={handleSubmit} noValidate>
          <h2 className="text-4xl text-black font-bold text-start mb-6">Register</h2>

          <div className="relative mb-4">
            <div className='flex justify-between'>
            <label htmlFor="username" className="required block text-sm mb-2">UserName</label>
            <BiUser className='text-gray-400 mr-2' />
            </div>
            <input
              className="block w-full py-2.5 px-3 text-sm text-gray-700 bg-gray-100 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())}
              required
            />
            {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
          </div>

          
          <div className="relative mb-4">
            <label htmlFor="email" className="required block text-sm mb-2">Email</label>
            <input
              className="block w-full py-2.5 px-3 text-sm text-gray-700 bg-gray-100 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              required
            />
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
                 onChange={(e) => setPassword(e.target.value.trim())}
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
           </div>
           {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
           
        
          <div className="relative mb-4">
            <label htmlFor="fullname" className="required block text-sm mb-2">Full Name</label>
            <input
              className="block w-full py-2.5 px-3 text-sm text-gray-700 bg-gray-100 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value.trim())}
              required
            />
            {fullnameError && <p className="text-red-500 text-sm">{fullnameError}</p>}
          </div>

          <div className="relative mb-4">
            <label htmlFor="address" className="required block text-sm mb-2">Address</label>
            <input
              className="block w-full py-2.5 px-3 text-sm text-gray-700 bg-gray-100 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value.trim())}
              required
            />
            {addressError && <p className="text-red-500 text-sm">{addressError}</p>}
          </div>

          <div className="relative mb-4">
            <label htmlFor="contact" className="required block text-sm mb-2">Contact</label>
            <input
              className="block w-full py-2.5 px-3 text-sm text-gray-700 bg-gray-100 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              type="number"
              value={contact}
              onChange={(e) => setContact(e.target.value.trim())}
              required
            />
            {contactError && <p className="text-red-500 text-sm">{contactError}</p>}
          </div>

        
          <div className="relative mb-4">
            <label htmlFor="roleid" className="required block text-sm mb-2">Role</label>
            <select
              className="block w-full py-2.5 px-3 text-sm text-gray-700 bg-gray-100 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              value={roleid}
              onChange={(e) => setRoleid(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              {roles.filter((role)=>(role.RoleName!=="admin")).map((role) => (
                <option key={role.RoleId} value={role.RoleId}>{role.RoleName}</option>
              ))}
            </select>
            {roleError && <p className="text-red-500 text-sm">{roleError}</p>}
          </div>

          <div className="relative mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2.5 rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              Register
            </button>
          </div>
        </form>
        <div className='flex justify-between items-center mt-2'>
           <span className="text-sm">
             Already have an account? <Link to="/" className="underline">Login</Link>
           </span>
           <Link to="/forgot-password" className='text-sm underline'>Forgot Password?</Link>
         </div>

         {alert.visible && (
         <div className={`w-96 fixed bottom-10 left-1/2 transform -translate-x-1/2 p-4 mb-4 text-sm rounded-lg ${alert.type === 'danger' ? 'bg-red-100 text-red-700 flex items-center justify-center ' : 'bg-green-100 text-green-700 flex items-center justify-center'}`} role="alert">
           {alert.message}
         </div>
       )}
      </div>
    </div>
  );
};

export default Register;
