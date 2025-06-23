import React from 'react';
import { useAdminstateQuery } from "../../redux/feature/State/stateAPI.js";
import Loading from "../../Screenloading/Loading.jsx";

import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Linechart = () => {
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

    const { monthlyEarnings = [] } = data || {};

    // Initialize earnings array with 0 for all 12 months
    const earningsByMonth = new Array(12).fill(0);
    monthlyEarnings.forEach(entry => {
        const monthIndex = entry.month - 1;
        earningsByMonth[monthIndex] = entry.earnings;
    });

    const chartData = {
        labels: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December',
        ],
        datasets: [
            {
                label: 'Monthly Earnings',
                data: earningsByMonth,
                fill: false,
                borderColor: '#36A2EB',
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        maintainAspectRatio: false,
        responsive: true,
    };

    return (
        <div className="w-full max-w-[500px] mx-auto">
            <div className="aspect-[5/4]">
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default Linechart;
