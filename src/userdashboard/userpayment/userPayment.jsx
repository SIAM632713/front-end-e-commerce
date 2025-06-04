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
        <div>
            <h2 className="text-lg font-bold">Total Payments</h2>
            <div className="p-6 bg-white shadow-md rounded-md mt-5">
                <p className="font-medium mt-3 mb-4">
                    Total Spent: <span className="text-green-600">${totalSpent}</span>
                </p>
                <div className="space-y-4">
                    {order.map((item, index) => (
                        <div key={index} className="border-b border-gray-300 pb-4 space-y-2">
                            <p className="font-semibold">Order #{index + 1}</p>
                            <p className="text-md text-gray-600">Order id: ${item.orderID}</p>
                            <p className="text-md text-gray-600">Price #: ${item.amount.toFixed(2)}</p>
                            <p className="text-md text-gray-600">Date: {new Date(item.createdAt).toLocaleString()},
                                Status :<span
                                    className={`ml-2 px-2 py-1 text-sm rounded ${statusClasses[item.status]}`}>
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
