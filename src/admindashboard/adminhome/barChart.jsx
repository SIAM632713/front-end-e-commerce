import React from 'react';
import { useAdminstateQuery } from "../../redux/feature/State/stateAPI.js";
import Loading from "../../component/loading/Loading.jsx";
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const BarChart = () => {
    const { data, error, isLoading } = useAdminstateQuery();

    if (isLoading) {
        return (
            <div className="flex justify-center mt-10">
                <Loading />
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-500 mt-10">Failed to load data</div>;
    }

    const {
        totalOrders,
        totalProducts,
        totalReviews,
        totalUsers
    } = data || {};

    const chartData = {
        labels: ['Total Orders', 'Total Products', 'Total Reviews', 'Total Users'],
        datasets: [
            {
                label: 'Metrics',
                data: [totalOrders, totalProducts, totalReviews, totalUsers],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                ],
                hoverOffset: 4,
            },
        ],
    };

    return (
        <div className="w-full max-w-[400px] sm:max-w-[400px] mx-auto">
            <div className="aspect-square">
                <Pie data={chartData} options={{ maintainAspectRatio: false }} />
            </div>
        </div>
    );
};

export default BarChart;
