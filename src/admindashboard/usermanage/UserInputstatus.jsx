import React, { useState } from 'react';
import { useGetUpdateUserMutation } from "../../redux/feature/auth/authAPI.js";
import toast from "react-hot-toast";

const UserInputstatus = ({ HandleModalclose, isModalOpen,user }) => {
    if (!isModalOpen) return null;


    const [role, setRole] = useState(user.role);
    const [updateUser] = useGetUpdateUserMutation();

    const handleSubmit = async () => {
        try {
            await updateUser({ id: user?._id, role }).unwrap();
            alert("User successfully updated");
            HandleModalclose();
            window.location.reload();
        } catch (err) {
            toast.error("Update failed");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-brightness-25 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm">
                <h3 className="text-lg font-semibold mb-4">Edit User!</h3>
                <div className="mb-4">
                    <label className="block mb-1 text-sm">Email:</label>
                    <input
                        value={user?.email}
                        type="text"
                        className="w-full px-3 py-2 border rounded bg-gray-100"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 text-sm">Role:</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={HandleModalclose}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserInputstatus;
