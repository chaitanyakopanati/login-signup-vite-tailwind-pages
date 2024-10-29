import './App.css'
import React, { useContext } from 'react';
import {Routes,Route,Navigate,useLocation  } from 'react-router-dom' ;
import NavbarNav from './components/layout/NavbarNav';
import Header from './components/pages/Header';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import NotFound from './components/pages/NotFound';
import ForgotPassword from './components/pages/ForgotPassword';
import Dashboard from './components/pages/Dashboard';
import  {DataContext}  from './contexts/DataContextProvider';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  const {data, setData}=useContext(DataContext)
  const fetchStoreData = JSON.parse(localStorage.getItem('formData')) 
  //console.log("fetchStoreData",fetchStoreData[0]?.email)
  const location = useLocation();
const showNavbar = 
  // !fetchStoreData || 
  // fetchStoreData.length === 0 || 
  // !fetchStoreData[0]?.email || 
  !data.Token ||
  ['/','/register', '/login', '/forgot-password'].includes(location.pathname);
  return (
    <>
      <div>
      <div className='bg-slate-900'>
      {/* {(!fetchStoreData || fetchStoreData.length === 0 || !fetchStoreData[0]?.email) && <NavbarNav />} */}
      {showNavbar && !data.Token&& <NavbarNav />}
      </div>
      <div className='text-black h-[100vh] flex justify-center items-center bg-cover bg-[#d4d6ea]	 ' >
      {/* style={{background:"url('https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=600')"}} */}
        <Routes>
          <Route path='/' element={<Header/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          {/* <Route
            path="/dashboard"
            element={fetchStoreData?.length>0 && fetchStoreData[0]?.email ? <Dashboard /> : <Navigate to="/login" />}
          /> */}

          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </div>
      </div>
    </>
  )
}

export default App
