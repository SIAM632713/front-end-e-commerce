import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import toast from "react-hot-toast";
import UserDashboard from "./userdashboard/user-dashboard.jsx";
import AdminDashboard from "./admindashboard/admin-dashboard.jsx";
import { Menu, X } from 'lucide-react';

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if (!user) {
        toast.error("Please login");
        return <Navigate to="/login" replace={true} />;
    }

    const renderDashboard = () => {
        switch (user?.role) {
            case "admin":
                return <AdminDashboard />;
            case "user":
                return <UserDashboard />;
            default:
                return <Navigate to="/login" replace={true} />;
        }
    };

    return (
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-4 px-4 sm:px-6 py-6 relative">
            {/* Toggle Button for Mobile */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden absolute top-4 left-6 z-50 bg-white p-2 rounded shadow"
            >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed md:static top-0 left-0 h-full md:h-auto w-3/4 max-w-xs bg-white z-40 shadow-md md:shadow-none transition-transform duration-300 ease-in-out p-4 border border-gray-300 rounded-md ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                }`}
            >
                {renderDashboard()}
            </aside>

            {/* Main Content */}
            <main className="w-full border border-gray-300 rounded-md p-4 bg-white min-h-[300px] md:ml-0"
              onClick={()=>isSidebarOpen && setIsSidebarOpen(false)}
            >
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;
