import React from 'react';
import { useAdminstateQuery } from "../../redux/feature/State/stateAPI.js";
import Loading from "../../Screenloading/Loading.jsx";
import { DollarSign, ShoppingCart, Users, Boxes } from 'lucide-react';
import BarChart from "./barChart.jsx";
import Linechart from "./linechart.jsx";

const Adminhome = () => {
    const { data, error, isLoading } = useAdminstateQuery();

    if (isLoading) return (
        <div className="flex justify-center mt-10">
            <Loading />
        </div>
    );

    const { totalEarning, totalOrders, totalUsers, totalProducts } = data || [];

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600 mb-6">Hi, admin! Welcome to your dashboard.</p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                    <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="text-blue-500 w-5 h-5" />
                        <h2 className="text-lg font-semibold text-gray-700">Total Earning</h2>
                    </div>
                    <p className="text-2xl font-bold text-blue-500">${totalEarning?.toFixed(2)}</p>
                </div>

                <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                    <div className="flex items-center gap-2 mb-1">
                        <ShoppingCart className="text-green-500 w-5 h-5" />
                        <h2 className="text-lg font-semibold text-gray-700">All Orders</h2>
                    </div>
                    <p className="text-2xl font-bold text-green-500">{totalOrders}</p>
                </div>

                <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                    <div className="flex items-center gap-2 mb-1">
                        <Users className="text-yellow-500 w-5 h-5" />
                        <h2 className="text-lg font-semibold text-gray-700">All Users</h2>
                    </div>
                    <p className="text-2xl font-bold text-yellow-500">{totalUsers}</p>
                </div>

                <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                    <div className="flex items-center gap-2 mb-1">
                        <Boxes className="text-yellow-500 w-5 h-5" />
                        <h2 className="text-lg font-semibold text-gray-700">Total Products</h2>
                    </div>
                    <p className="text-2xl font-bold text-yellow-500">{totalProducts}</p>
                </div>
            </div>

            {/* Charts */}
            <div className="mt-10">
                <h2 className="text-lg sm:text-xl font-bold text-gray-700 mb-4">Admin Stats Overview</h2>

                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full h-[300px] sm:h-[400px] bg-white p-4 rounded-lg shadow-md flex items-center justify-center">
                        <BarChart />
                    </div>
                    <div className="w-full h-[300px] sm:h-[400px] bg-white p-4 rounded-lg shadow-md flex items-center justify-center">
                        <Linechart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Adminhome;
