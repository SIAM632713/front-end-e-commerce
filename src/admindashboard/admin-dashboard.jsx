import React from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {useLogoutUserMutation} from "../redux/feature/auth/authAPI.js";
import {logOutUser} from "../redux/feature/auth/authSlice.jsx";

const AdminDashboard = () => {

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
                            <span className="text-black">Au</span>
                            <span className="text-gray-500">rellia.</span>
                        </h2>
                    </Link>
                    <i className="text-sm text-gray-500">Admin dashboard</i>
                </div>
                <nav className="flex flex-col gap-4 p-4 font-semibold">
                    <NavLink className={({isActive}) => isActive ? "text-[#ed3849]" : ""} to="/dashboard/admin">Dashboard</NavLink>
                    <NavLink className={({isActive}) => isActive ? "text-[#ed3849]" : ""} to="/dashboard/add-product">Add Product</NavLink>
                    <NavLink className={({isActive}) => isActive ? "text-[#ed3849]" : ""} to="/dashboard/manage-product">Manage Products</NavLink>
                    <NavLink className={({isActive}) => isActive ? "text-[#ed3849]" : ""} to="/dashboard/user-manage">Users</NavLink>
                    <NavLink className={({isActive}) => isActive ? "text-[#ed3849]" : ""} to="/dashboard/manage-order">Manage Orders</NavLink>
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

export default AdminDashboard;