import React,{useContext} from "react";
import { Navigate, Outlet } from "react-router-dom";
import { DataContext } from "../contexts/DataContextProvider";

const PrivateRoute = () => {
    const {data, setData,token, setToken}=useContext(DataContext)
    console.log("data",data)
  if (!data.Token) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;