import React from 'react';
import { useParams } from "react-router-dom";
import { useGetOrderByIDQuery } from "../../redux/feature/Order/orderAPI.js";
import Loading from "../../component/loading/Loading.jsx";
import { Check, Edit2, Loader, Truck } from "lucide-react";

const steps = [
    {
        label: "Pending",
        icon: <Edit2 size={20} className="text-red-500" />,
        description: "Your order has been created and is awaiting processing.",
    },
    {
        label: "Processing",
        icon: <Loader size={20} className="animate-spin text-blue-500" />,
        description: "Your order is currently being processed.",
    },
    {
        label: "Shipped",
        icon: <Truck size={20} className="text-gray-700" />,
        description: "Your order has been shipped.",
    },
    {
        label: "Completed",
        icon: <Check size={20} className="text-gray-400" />,
        description: "Your order has been successfully completed.",
    },
];

const Orderdetail = () => {
    const { orderId } = useParams();
    const { data, error, isLoading } = useGetOrderByIDQuery(orderId);

    const order = data?.data || {};
    const { status, createdAt ,orderID} = order;

    if (isLoading) {
        return (
            <div className="flex justify-center mt-10">
                <Loading />
            </div>
        );
    }

    const statusIndex = steps.findIndex(step => step.label.toLowerCase() === status?.toLowerCase());
    const formattedDate = createdAt ? new Date(createdAt).toLocaleString() : '';

    return (
        <div className="p-6 max-w-[1400px] mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Payment {status}</h2>
            <p className="text-sm text-gray-600 mb-2">Order ID: {orderID}</p>
            <p className="text-sm text-gray-600 mb-8">Status: {status}</p>

            <div className="flex justify-between gap-4">
                {steps.map((step, index) => {
                    const isActive = index <= statusIndex;
                    return (
                        <div className="relative flex-1">
                            <div className={`flex flex-col items-center ${isActive ? "text-black" : "text-gray-400"}`}>
                                <div className="mb-2">{step.icon}</div>
                                <p className="font-medium">{step.label}</p>
                                <p className="text-xs mt-1 text-gray-500">{formattedDate}</p>
                                <p className="text-sm mt-1 text-gray-600">{step.description}</p>
                            </div>
                            {index !== steps.length - 1 && (
                                <div className="absolute top-32 right-0 w-full h-1 z-[-1]">
                                    <div className={`h-1 ${isActive ? "bg-blue-500" : "bg-gray-200"}`}></div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Orderdetail;
