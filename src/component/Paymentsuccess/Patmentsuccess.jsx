import React, {useEffect, useState} from 'react';
import { Edit2, Loader, Truck, Check } from 'lucide-react';
import axios from "axios";
import {getBaseURL} from "../../utilis/getBaseURL.js";
import Loading from "../../Screenloading/Loading.jsx";

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
]

const Patmentsuccess = () => {

    const [order, setOrder] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const query=new URLSearchParams(window.location.search);
        const sessionID=query.get('session_id')
        if(sessionID){
            const confimedPayment=async ()=>{
                const response=await axios.post(`${getBaseURL()}/api/order/confirm-payment`,{
                    session_id:sessionID
                },{
                    headers:{
                        'content-type': 'application/json'
                    }
                })
                if(response?.data){
                    setIsLoading(false)
                    setOrder(response?.data.data);
                }
            }
            confimedPayment()
        }
    },[])


    const {status,orderID,createdAt}=order || {}


    if(isLoading) return <Loading/>

    const statusIndex = steps.findIndex(step => step.label.toLowerCase() === status?.toLowerCase());

    return (
        <div className="p-6 max-w-[1400px] mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Payment {status}</h2>
            <p className="text-sm text-gray-600 mb-2">Order ID: {orderID}</p>
            <p className="text-sm text-gray-600 mb-8">Status: {status}</p>

            <div className="flex justify-between gap-4">
                {steps.map((step, index) => {
                    const isActive = index <= statusIndex;
                    return (
                        <div key={index} className="relative flex-1">
                            <div className={`flex flex-col items-center ${isActive ? "text-black" : "text-gray-400"}`}>
                                <div className="mb-2">{step.icon}</div>
                                <p className="font-medium">{step.label}</p>
                                <p className="text-xs mt-1 text-gray-500">{new Date(createdAt).toLocaleDateString()}</p>
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

export default Patmentsuccess;
