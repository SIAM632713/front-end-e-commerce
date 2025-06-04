import React, {useState} from 'react';
import {useUpdateOrderStatusMutation} from "../../redux/feature/Order/orderAPI.js";

const Orderstatus = ({isModalOpen,HandleModalclose,orderData}) => {
    if (!isModalOpen) return null;
    console.log(orderData)


    const [status,setstatus]=useState(orderData?.status);
    const [UpdateOrderStatus]=useUpdateOrderStatusMutation()

    const Handlesubmmit=async ()=>{
        try {
          const response=await UpdateOrderStatus({id:orderData?._id,status}).unwrap()
            alert("Order successfully updated")
            HandleModalclose()
            refetch();
        }catch(error){
          console.log(error)
        }
    }


    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-brightness-25 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm">
                <h3 className="text-lg font-semibold mb-4">Update Order Status</h3>
                <div className="mb-4">
                    <label className="block mb-1 text-gray-500">Status:</label>
                    <select value={status} onChange={(e)=>setstatus(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="pending">pending</option>
                        <option value="processing">processing</option>
                        <option value="shipped">shipped</option>
                        <option value="completed">completed</option>
                    </select>
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={HandleModalclose}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button onClick={Handlesubmmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Orderstatus;