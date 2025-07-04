import React from 'react';
import { useSelector } from "react-redux";
import { useGetOrderByEmailQuery } from "../../redux/feature/Order/orderAPI.js";
import Loading from "../../Screenloading/Loading.jsx";
import { Link } from "react-router-dom";

const UserOrder = () => {
    const { user } = useSelector((state) => state.auth);
    const { data, error, isLoading } = useGetOrderByEmailQuery(user?.email);
    const Orderdata = data?.data || [];

    if (isLoading)
        return (
            <div className="flex justify-center mt-10">
                <Loading />
            </div>
        );

    return (
        <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md w-full mt-10">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                <h2 className="text-lg sm:text-xl font-bold">Your Orders</h2>
                <button className="px-4 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer">
                    SEE ALL
                </button>
            </div>

            {/* Table layout for medium and up */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full table-auto text-left border-t mt-6">
                    <thead>
                    <tr className="text-sm font-semibold text-gray-600 border-b">
                        <th className="py-2">#</th>
                        <th className="py-2">ORDER ID</th>
                        <th className="py-2">DATE</th>
                        <th className="py-2">STATUS</th>
                        <th className="py-2">TOTAL</th>
                        <th className="py-2">VIEW ORDER</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Orderdata.map((order, index) => (
                        <tr key={order._id} className="text-sm border-b">
                            <td className="py-3">{index + 1}</td>
                            <td className="py-3">{order.orderID}</td>
                            <td className="py-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td className="py-3">
                                    <span
                                        className={`px-2 py-1 rounded-md text-xs font-semibold ${
                                            order.status === 'pending'
                                                ? 'bg-red-100 text-red-600'
                                                : order.status === 'processing'
                                                    ? 'bg-blue-100 text-blue-600'
                                                    : 'bg-green-100 text-green-600'
                                        }`}
                                    >
                                        {order.status}
                                    </span>
                            </td>
                            <td className="py-3">${order.amount}</td>
                            <td className="py-3 hover:underline text-blue-600 cursor-pointer">
                                <Link to={`/order/${order._id}`}>View Order</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Card layout for small devices */}
            <div className="md:hidden mt-4 space-y-4">
                {Orderdata.map((order, index) => (
                    <div key={order._id} className="border rounded-lg p-4 shadow-sm">
                        <p className="text-sm mb-1"><strong>Order #{index + 1}</strong></p>
                        <p className="text-sm text-gray-600 mb-1">ID: {order.orderID}</p>
                        <p className="text-sm text-gray-600 mb-1">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600 mb-1">
                            Status:{" "}
                            <span
                                className={`px-2 py-1 rounded-md text-xs font-semibold ${
                                    order.status === 'pending'
                                        ? 'bg-red-100 text-red-600'
                                        : order.status === 'processing'
                                            ? 'bg-blue-100 text-blue-600'
                                            : 'bg-green-100 text-green-600'
                                }`}
                            >
                                {order.status}
                            </span>
                        </p>
                        <p className="text-sm text-gray-600 mb-2">Total: ${order.amount}</p>
                        <Link
                            to={`/order/${order._id}`}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            View Order
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserOrder;
