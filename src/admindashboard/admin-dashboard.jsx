import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useLogoutUserMutation } from "../redux/feature/auth/authAPI.js";
import { logOutUser } from "../redux/feature/auth/authSlice.jsx";
import {removeToken} from "../sessionHelper/sessionHelper.js";

const AdminDashboard = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logoutUser] = useLogoutUserMutation();

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logOutUser());
            removeToken()
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-between bg-white px-4 py-6 sm:px-6">
            {/* Header */}
            <div>
                <div className="pb-4 border-b mb-4">
                    <Link to="/">
                        <h2 className="text-2xl font-bold">
                            <span className="text-black">Au</span>
                            <span className="text-gray-500">rellia.</span>
                        </h2>
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">Admin dashboard</p>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-3 font-semibold text-sm sm:text-base">
                    <NavLink className={({ isActive }) => isActive ? "text-[#ed3849]" : "text-gray-700 hover:text-black"} to="/dashboard/admin">Dashboard</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "text-[#ed3849]" : "text-gray-700 hover:text-black"} to="/dashboard/add-product">Add Product</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "text-[#ed3849]" : "text-gray-700 hover:text-black"} to="/dashboard/manage-product">Manage Products</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "text-[#ed3849]" : "text-gray-700 hover:text-black"} to="/dashboard/user-manage">Users</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "text-[#ed3849]" : "text-gray-700 hover:text-black"} to="/dashboard/manage-order">Manage Orders</NavLink>
                </nav>
            </div>

            {/* Logout Button */}
            <div className="pt-6 mt-6 border-t">
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600 transition duration-200 text-sm sm:text-base"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;
