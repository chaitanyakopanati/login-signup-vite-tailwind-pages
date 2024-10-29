import React,{useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineHome, AiOutlineSetting, AiOutlineUser } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { DataContext } from '../../contexts/DataContextProvider';

const Dashboard = () => {
  const navigate = useNavigate();
  // const fetchStoreData = JSON.parse(localStorage.getItem('formData')) 
  const {data, setData,token, setToken}=useContext(DataContext)

  const handleLogout = () => {
    setData("");
    setToken("");
    localStorage.removeItem('authToken'); 
    localStorage.removeItem('rememberedEmail'); 
    navigate('/login'); 
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-blue-600">Dashboard</h1>
          <ul className="space-y-4">
            <li>
              <Link to="/dashboard" className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-md">
                <AiOutlineHome className="mr-2" />
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard/profile" className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-md">
                <AiOutlineUser className="mr-2" />
                Profile
              </Link>
            </li>
            <li>
              <Link to="/dashboard/settings" className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-md">
                <AiOutlineSetting className="mr-2" />
                Settings
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-md">
                <BiLogOut className="mr-2" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <main className="flex-1 p-10">
        <h2 className="text-3xl font-bold mb-4">Welcome to {data.Username} Dashboard</h2>
        <p className="text-gray-600 mb-8">
          Here you can manage your profile, settings, and view other important information.
        </p>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Overview</h3>
          <p className="text-gray-600">
            This is your dashboard overview. You can add more sections here according to your requirements.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
