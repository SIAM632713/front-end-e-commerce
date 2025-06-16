import React, { useState } from 'react';
import { useGetUpdateUserMutation } from "../../redux/feature/auth/authAPI.js";
import toast from "react-hot-toast";

const UserInputstatus = ({ HandleModalclose, isModalOpen, user, refetch }) => {
    if (!isModalOpen) return null;

    const [role, setRole] = useState(user.role);
    const [updateUser] = useGetUpdateUserMutation();

    const handleSubmit = async () => {
        try {
            await updateUser({ id: user?._id, role }).unwrap();
            alert("User successfully updated");
            HandleModalclose();
            refetch();
        } catch (err) {
            toast.error("Update failed");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-25 bg-opacity-40 px-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm sm:max-w-md shadow-md">
                <h3 className="text-lg font-semibold mb-4">Edit User</h3>

                {/* Email */}
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Email:</label>
                    <input
                        value={user?.email}
                        type="text"
                        readOnly
                        className="w-full px-3 py-2 border rounded bg-gray-100 text-sm"
                    />
                </div>

                {/* Role Selector */}
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Role:</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3 py-2 border rounded text-sm"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={HandleModalclose}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserInputstatus;
