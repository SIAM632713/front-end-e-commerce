import React, { useState } from 'react';
import {
    useDeleteOrderByIDMutation,
    useGetAllOrderQuery
} from "../../redux/feature/Order/orderAPI.js";
import Loading from "../../component/loading/Loading.jsx";
import Orderstatus from "./orderstatus.jsx";
import { Link } from "react-router-dom";
import {
    confirmDelete,
    showError,
    showSuccess
} from "../../utilis/sweetAlertHelper.js";

const statusColors = {
    pending: 'bg-yellow-400 text-white',
    processing: 'bg-blue-500 text-white',
    completed: 'bg-gray-600 text-white',
    shipped: 'bg-green-500 text-white',
};

const Manageorder = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const HandleModalopen = (orderData) => {
        setSelectedUser(orderData);
        setIsModalOpen(true);
    };
    const HandleModalclose = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };

    const [DeleteOrderByID] = useDeleteOrderByIDMutation();
    const { data, error, isLoading } = useGetAllOrderQuery();

    if (isLoading) return (
        <div className="flex justify-center mt-10">
            <Loading />
        </div>
    );

    const orderData = data?.data || [];

    const HandledeleteOrder = async (id) => {
        const result = await confirmDelete();
        if (result.isConfirmed) {
            try {
                await DeleteOrderByID(id).unwrap();
                showSuccess("Order deleted successfully!");
            } catch (error) {
                console.error(error);
                showError("Order delete failed!");
            }
        }
    };

    return (
        <div className="p-4 sm:p-6 bg-white shadow rounded-lg overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4">Manage Orders</h2>
            <div className="w-full overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                    <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                        <th className="p-3 whitespace-nowrap">Order ID</th>
                        <th className="p-3 whitespace-nowrap">Customer</th>
                        <th className="p-3 whitespace-nowrap">Status</th>
                        <th className="p-3 whitespace-nowrap">Date</th>
                        <th className="p-3 whitespace-nowrap">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700">
                    {orderData.map((item, index) => (
                        <tr key={index} className="border-t">
                            <td className="p-3 whitespace-nowrap">{item.orderID}</td>
                            <td className="p-3 whitespace-nowrap">{item.email}</td>
                            <td className="p-3 whitespace-nowrap">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[item.status]}`}>
                                        {item.status}
                                    </span>
                            </td>
                            <td className="p-3 whitespace-nowrap">{new Date(item.createdAt).toLocaleDateString()}</td>
                            <td className="p-3 space-x-2 whitespace-nowrap">
                                <Link to={`/order/${item?._id}`} className="text-blue-500 hover:underline">View</Link>
                                <button onClick={() => HandleModalopen(item)} className="text-green-500 hover:underline cursor-pointer">Edit</button>
                                <button onClick={() => HandledeleteOrder(item?._id)} className="text-red-500 hover:underline cursor-pointer">Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <Orderstatus
                HandleModalclose={HandleModalclose}
                orderData={selectedUser}
                isModalOpen={isModalOpen}
            />
        </div>
    );
};

export default Manageorder;
