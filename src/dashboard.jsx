import React from 'react';
import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";
import toast from "react-hot-toast";
import UserDashboard from "./userdashboard/user-dashboard.jsx";
import AdminDashboard from "./admindashboard/admin-dashboard.jsx";

const Dashboard = () => {

    const {user}=useSelector((state)=>state.auth);
   if(!user){
       toast.error("Please login");
      return <Navigate to="/login" replace={true}/>
   }

   const renderDashboard = () => {
       switch (user?.role){
           case "admin": return <AdminDashboard/>
           case "user": return <UserDashboard/>
           default:return <Navigate to="/login" replace={true}/>
       }
   }

    return (
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-4 items-start justify-start ">
            <header className="lg:w-1/5 sm:w-2/5 w-full border border-gray-500 mt-5">
                {
                    renderDashboard()
                }
            </header>
            <main className="p-8 w-full border border-gray-500 mt-5">
                <Outlet/>
            </main>
        </div>
    );
};

export default Dashboard;