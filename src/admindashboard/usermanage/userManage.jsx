import React, { useState } from 'react';
import {
    useGetDeleteUserMutation,
    useGetUserQuery
} from "../../redux/feature/auth/authAPI.js";
import Loading from "../../Screenloading/Loading.jsx";
import { Pencil, Trash2 } from 'lucide-react';
import UserInputstatus from "./UserInputstatus.jsx";
import { useSelector } from "react-redux";
import {
    confirmDelete,
    showError,
    showSuccess
} from "../../utilis/sweetAlertHelper.js";

const UserManage = () => {
    const { user } = useSelector((state) => state.auth);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const HandleModalopen = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const HandleModalclose = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };

    const { data, error, isLoading, refetch } = useGetUserQuery();
    const [GetDeleteUser] = useGetDeleteUserMutation();

    if (isLoading) {
        return (
            <div className="flex justify-center mt-10">
                <Loading />
            </div>
        );
    }

    const userData = data?.data || [];

    const HandleDeleteUser = async (id) => {
        const result = await confirmDelete();
        if (result.isConfirmed) {
            try {
                await GetDeleteUser(id).unwrap();
                showSuccess("User deleted successfully.");
                refetch();
            } catch (err) {
                console.log(err);
                showError("Failed to delete User");
            }
        }
    };

    return (
        <div className="p-4">
            <div className="bg-white rounded shadow-md overflow-x-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 p-4 border-b">
                    <h2 className="text-lg font-semibold">All Users</h2>
                    <button className="bg-blue-500 text-white px-4 py-1 rounded text-sm hover:bg-blue-600">
                        SEE ALL
                    </button>
                </div>

                <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                    <tr className="bg-gray-100 text-sm">
                        <th className="p-3 border-b">NO.</th>
                        <th className="p-3 border-b">USER EMAIL</th>
                        <th className="p-3 border-b">USER ROLE</th>
                        <th className="p-3 border-b">EDIT OR MANAGE</th>
                        <th className="p-3 border-b">DELETE</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userData.map((item, index) => (
                        <tr
                            key={index}
                            className="border-b hover:bg-gray-50 text-sm"
                        >
                            <td className="p-3">{index + 1}</td>
                            <td className="p-3 break-words">{item.email}</td>
                            <td className="p-3">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            item.role === "admin"
                                                ? "bg-purple-500 text-white"
                                                : "bg-yellow-400 text-black"
                                        }`}
                                    >
                                        {item.role}
                                    </span>
                            </td>
                            <td
                                onClick={() => HandleModalopen(item)}
                                className="p-3 text-blue-600 cursor-pointer flex items-center gap-1"
                            >
                                <Pencil size={14} /> Edit
                            </td>
                            <td className="p-3">
                                <button
                                    onClick={() => HandleDeleteUser(item._id)}
                                    className="bg-red-600 text-white px-3 py-1 text-sm rounded hover:bg-red-700 flex items-center gap-1 cursor-pointer"
                                >
                                    <Trash2 size={14} /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <UserInputstatus
                HandleModalclose={HandleModalclose}
                isModalOpen={isModalOpen}
                user={selectedUser}
                refetch={refetch}
            />
        </div>
    );
};

export default UserManage;
