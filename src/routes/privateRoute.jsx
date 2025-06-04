import React from 'react';
import {useSelector} from "react-redux";
import toast from "react-hot-toast";
import {Navigate, useLocation} from "react-router-dom";
import {getToken} from "../sessionHelper/sessionHelper.js";

const PrivateRoute = ({children,role}) => {

    const token=getToken();
    if(!token){
        toast.error("You must be logged in");
        return <Navigate to="/login" replace/>
    }

    const {user}=useSelector((state)=>state.auth);
    const location = useLocation();
    if(!user){
        toast.error("Please login");
        return <Navigate to="/login" state={{from:location}} replace={true}/>
    }

    if(role && user?.role !== role){
        toast.error("Access denied! you must be an admin");
        return <Navigate to="/login" state={{from:location}} replace={true}/>
    }

    return children;
};

export default PrivateRoute;