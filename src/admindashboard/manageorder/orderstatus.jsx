import React, { useState } from 'react';
import { useUpdateOrderStatusMutation } from "../../redux/feature/Order/orderAPI.js";

const Orderstatus = ({ isModalOpen, HandleModalclose, orderData }) => {
    if (!isModalOpen) return null;

    const [status, setStatus] = useState(orderData?.status);
    const [UpdateOrderStatus] = useUpdateOrderStatusMutation();

    const Handlesubmmit = async () => {
        try {
            await UpdateOrderStatus({ id: orderData?._id, status }).unwrap();
            alert("Order successfully updated");
            HandleModalclose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-25 px-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm sm:max-w-md md:max-w-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Update Order Status</h3>

                <div className="mb-4">
                    <label className="block mb-1 text-gray-600">Status:</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-2">
                    <button
                        onClick={HandleModalclose}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full sm:w-auto"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={Handlesubmmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Orderstatus;
