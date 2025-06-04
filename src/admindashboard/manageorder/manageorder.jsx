import React, {useState} from 'react';
import {useDeleteOrderByIDMutation, useGetAllOrderQuery} from "../../redux/feature/Order/orderAPI.js";
import Loading from "../../component/loading/Loading.jsx";
import Orderstatus from "./orderstatus.jsx";
import {Link} from "react-router-dom";


const statusColors = {
    pending: 'bg-yellow-400 text-white',
    processing: 'bg-blue-500 text-white',
    completed: 'bg-gray-600 text-white',
    shipped: 'bg-green-500 text-white',
};

const Manageorder = () => {

    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const HandleModalopen=(orderData)=>{
        setSelectedUser(orderData)
        setIsModalOpen(true);
    }
    const HandleModalclose=()=>{
        setSelectedUser(null);
        setIsModalOpen(false);
    }


    const [DeleteOrderByID]=useDeleteOrderByIDMutation()
    const {data,error,isLoading}=useGetAllOrderQuery()
    if (isLoading) return (
        <div className="flex justify-center mt-10">
            <Loading />
        </div>
    );
    const orderData= data?.data || []

    const HandledeleteOrder=async(id)=>{
       try {
           const response=await DeleteOrderByID(id).unwrap()
           alert("Successfully deleted")
           refetch();
       }catch(error){
           console.error(error)
       }
    }

    return (
        <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Manage Orders</h2>
            <table className="min-w-full table-auto border-collapse">
                <thead>
                <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Actions</th>
                </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                {orderData.map((item, index) => (
                    <tr key={index} className="border-t">
                        <td className="p-3">{item.orderID}</td>
                        <td className="p-3">{item.email}</td>
                        <td className="p-3">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[item.status]}`}>
                  {item.status}
                </span>
                        </td>
                        <td className="p-3">{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td className="p-3 space-x-2">
                            <Link to={`/order/${item?._id}`}> <a className="text-blue-500 hover:underline">View</a></Link>
                            <a onClick={() => HandleModalopen(item)} href="#" className="text-green-500 hover:underline">Edit</a>
                            <a onClick={()=>HandledeleteOrder(item?._id)} href="#" className="text-red-500 hover:underline">Delete</a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Orderstatus HandleModalclose={HandleModalclose} orderData={selectedUser} isModalOpen={isModalOpen}/>
        </div>
    );
};

export default Manageorder;
