import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";


const NavbarNav = () => {
const[click,setClick]=useState(false);
const handleClick=()=>{
setClick(!click)
}
    const content=(
        <div className='lg:hidden block absolute top-16 w-full left-0 right-0 bg-slate-900 transition'>
                <ul className='text-center text-rose-600 text-xl p-20'>
                    <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded'>
                        <Link to='/' onClick={handleClick} >Home</Link>
                    </li>
                    <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded'>
                        <Link to='/services' onClick={handleClick} >Services</Link>
                    </li>
                    <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded'>
                        <Link to='/about' onClick={handleClick} >About</Link>
                    </li>
                    <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded'>
                        <Link to='/projects' onClick={handleClick} >Projects</Link>
                    </li>
                    <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded'>
                        <Link to='/contact' onClick={handleClick} >Contact Us</Link>
                    </li>
                </ul>
        </div>
    )

  return (
    <div>
       <nav>
        <div className='h-10vh flex jusfify-between z-50 text-white lg:py-5 px-20 py-4 flex-1 '>
        <div className='flex items-center flex-1'>
            <span className='text-3xl font-bold'>LOGO</span>
        </div>
        <div className='lg:flex md:flex lg:flex-1 items-center justify-end  font-normal hidden'>
        <div className='flex-10'>
            <ul className='flex gap-8 mr-16 text-[18px]'>
                <li className='hover: text-rose-600 transition border-b-2 border-slate-900 cursor-pointer'>
                    <Link to="/">Home</Link>
                </li>
                <li className='hover: text-rose-600 transition border-b-2 border-slate-900 cursor-pointer'>
                    <Link to="/services">Services</Link>
                </li>
                <li className='hover: text-rose-600 transition border-b-2 border-slate-900 cursor-pointer'>
                    <Link to="/about">About</Link>
                </li>
                <li className='hover: text-rose-600 transition border-b-2 border-slate-900 cursor-pointer'>
                    <Link to="/projects">Projects</Link>
                </li>
                <li className='hover: text-rose-600 transition border-b-2 border-slate-900 cursor-pointer'>
                    <Link to="/contact">Contact Us</Link>
                </li>
            </ul>
        </div>
        </div>
        <div>
            {click&&content}
        </div>
        <button className='block sm:hidden transition ' onClick={handleClick}>
            {click?<FaTimes />:<CiMenuFries />}
        </button>
        </div>
        </nav> 
    </div>
  )
}

export default NavbarNav