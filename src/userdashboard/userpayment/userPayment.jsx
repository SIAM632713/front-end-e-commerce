import React from 'react';
import { useSelector } from 'react-redux';
import { useGetOrderByEmailQuery } from '../../redux/feature/Order/orderAPI.js';
import Loading from '../../component/loading/Loading.jsx';

const statusClasses = {
    pending: 'bg-red-100 text-red-600',
    processing: 'bg-yellow-100 text-yellow-600',
    completed: 'bg-blue-100 text-blue-600',
    shipped: 'bg-blue-200 text-blue-800',
};

const UserPayment = () => {
    const { user } = useSelector((state) => state.auth);
    const { data, error, isLoading } = useGetOrderByEmailQuery(user?.email);
    const order = data?.data || [];

    if (isLoading) {
        return (
            <div className="flex justify-center mt-10">
                <Loading />
            </div>
        );
    }

    const totalSpent = order.reduce((sum, item) => sum + item.amount, 0).toFixed(2);

    return (
        <div className="px-4 sm:px-6 py-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">💳 Total Payments</h2>

            <div className="p-4 sm:p-6 bg-white shadow-md rounded-md mt-4 sm:mt-6">
                <p className="font-medium text-sm sm:text-base mb-4">
                    Total Spent:
                    <span className="text-green-600 ml-2 font-semibold">${totalSpent}</span>
                </p>

                <div className="space-y-8">
                    {order.map((item, index) => (
                        <div
                            key={index}
                            className="border-b border-gray-200 pb-4"
                        >
                            <p className="text-sm sm:text-base font-semibold text-gray-700">📦 Order #{index + 1}</p>
                            <p className="text-sm text-gray-600">🆔 Order ID: <span className="font-medium">{item.orderID}</span></p>
                            <p className="text-sm text-gray-600">💵 Amount: <span className="font-medium">${item.amount.toFixed(2)}</span></p>
                            <p className="text-sm text-gray-600 flex flex-wrap items-center gap-1">
                                📅 Date: {new Date(item.createdAt).toLocaleString()}
                                <span className={`ml-2 px-2 py-1 text-xs sm:text-sm rounded ${statusClasses[item.status]}`}>
                                    {item.status}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserPayment;
