import React from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {useLogoutUserMutation} from "../redux/feature/auth/authAPI.js";
import {logOutUser} from "../redux/feature/auth/authSlice.jsx";

const UserDashboard = () => {
    const navigate = useNavigate();
     const dispatch = useDispatch();
     const [logoutUser]=useLogoutUserMutation()

    const handleLogout =async () => {
     try {
         await logoutUser().unwrap()
         alert("User logged out successfully");
         dispatch(logOutUser());
         navigate("/");
     }catch(err){
         console.log(err);
     }
    };

    return (
        <div className=" min-h-screen flex flex-col justify-between">
            <div>
                <div className="p-4 border-b">
                    <Link to="/">
                        <h2 className="text-2xl font-bold">
                            <span className="text-black">Le</span>
                            <span className="text-gray-500">baba.</span>
                        </h2>
                    </Link>
                    <p className="text-sm text-gray-500">User dashboard</p>
                </div>
                <nav className="flex flex-col gap-4 p-4 font-semibold">
                    <NavLink className={({ isActive }) => isActive ? "text-[#ed3849]" : ""} to="/dashboard/user">Dashboard</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "text-[#ed3849]" : ""} to="/dashboard/order">Order</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "text-[#ed3849]" : ""} to="/dashboard/payment">Payment</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "text-[#ed3849]" : ""} to="/dashboard/profile">Profile</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "text-[#ed3849]" : ""} to="/dashboard/review">Review</NavLink>
                </nav>
            </div>
            <div className="p-4">
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 w-full rounded hover:bg-red-600 transition cursor-pointer"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserDashboard;
