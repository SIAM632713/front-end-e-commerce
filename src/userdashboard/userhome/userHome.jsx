import React from 'react';
import { useSelector } from "react-redux";
import { useUserstateQuery } from "../../redux/feature/State/stateAPI.js";
import Loading from "../../Screenloading/Loading.jsx";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const UserHome = () => {

    const { user } = useSelector((state) => state.auth);
    const { data, error, isLoading } = useUserstateQuery(user?.email);

    if (isLoading) return (
        <div className="flex justify-center mt-10">
            <Loading />
        </div>
    );

    const { totalReviews, totalpurchaseProducts, totalPaymentamount } = data || {};

    const barChartData = {
        labels: ['Payments', 'Reviews', 'Purchased Products'],
        datasets: [
            {
                label: 'User Stats',
                data: [totalPaymentamount, totalReviews * 10, totalpurchaseProducts * 10],
                backgroundColor: ['#60a5fa', '#34d399', '#fbbf24'],
                borderRadius: 5,
            },
        ],
    };

    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: '📊 User Statistics Overview',
                font: {
                    size: 18,
                    weight: 'bold',
                },
                color: '#374151',
            },
            tooltip: {
                backgroundColor: '#1f2937',
                titleColor: '#fff',
                bodyColor: '#e5e7eb',
            },
        },
        scales: {
            y: {
                ticks: {
                    color: '#6b7280',
                    font: {
                        weight: '500'
                    }
                }
            },
            x: {
                ticks: {
                    color: '#6b7280',
                    font: {
                        weight: '500'
                    }
                }
            }
        }
    };

    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">User Dashboard</h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6">Hi, user! Welcome to your dashboard.</p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-5 bg-white rounded-xl shadow-md hover:shadow-xl transition">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-1">💰 Total Payments</h2>
                    <p className="text-xl sm:text-2xl font-bold text-blue-500">${totalPaymentamount}</p>
                </div>

                <div className="p-5 bg-white  rounded-xl shadow-md hover:shadow-xl transition">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-1">⭐ Total Reviews</h2>
                    <p className="text-xl sm:text-2xl font-bold text-green-500">{totalReviews}</p>
                </div>

                <div className="p-5 bg-white  rounded-xl shadow-md hover:shadow-xl transition">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-1">🛒 Purchased Products</h2>
                    <p className="text-xl sm:text-2xl font-bold text-yellow-500">{totalpurchaseProducts}</p>
                </div>
            </div>

            {/* Chart */}
            <div className="mt-10 bg-white p-4 sm:p-6 rounded-xl shadow overflow-x-auto">
                <div className="w-full h-[300px] sm:h-[400px]">
                    <Bar data={barChartData} options={barChartOptions} />
                </div>
            </div>
        </div>
    );
};

export default UserHome;
