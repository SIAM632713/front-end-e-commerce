import React from 'react';
import { useSelector } from "react-redux";
import { useUserstateQuery } from "../../redux/feature/State/stateAPI.js";
import Loading from "../../component/loading/Loading.jsx";
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
        <div className="p-5">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">User Dashboard</h1>
            <p className="text-gray-600 mb-6">Hi, user! Wlcome to your dashboard.</p>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                    <h2 className="text-lg font-semibold text-gray-700 mb-1">💰 Total Payments</h2>
                    <p className="text-2xl font-bold text-blue-500">${totalPaymentamount}</p>
                </div>

                <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                    <h2 className="text-lg font-semibold text-gray-700 mb-1">⭐ Total Reviews</h2>
                    <p className="text-2xl font-bold text-green-500">{totalReviews}</p>
                </div>

                <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                    <h2 className="text-lg font-semibold text-gray-700 mb-1">🛒 Purchased Products</h2>
                    <p className="text-2xl font-bold text-yellow-500">{totalpurchaseProducts}</p>
                </div>
            </div>

            <div className="my-12 bg-white p-6 rounded-xl shadow-md">
                <Bar data={barChartData} options={barChartOptions} />
            </div>
        </div>
    );
};

export default UserHome;
