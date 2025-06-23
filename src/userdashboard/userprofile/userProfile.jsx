import React, { useState } from 'react';
import { PanelLeftOpen } from 'lucide-react';
import UserInputform from "./userInputform.jsx";
import { useGetSingleProfileQuery } from "../../redux/feature/auth/authAPI.js";
import Loading from "../../Screenloading/Loading.jsx";
import { useSelector } from "react-redux";

const UserProfile = () => {
    const { user } = useSelector((state) => state.auth);
    const { data, error, isLoading } = useGetSingleProfileQuery(user?._id);
    const userData = data?.data || {};

    const [isModalOpen, setIsModalOpen] = useState(false);
    const HandleModalopen = () => setIsModalOpen(true);
    const HandleModalclose = () => setIsModalOpen(false);

    if (isLoading) return (
        <div className="flex justify-center mt-10">
            <Loading />
        </div>
    );

    return (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mt-10">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
                    <img
                        src={userData?.profileImage}
                        alt="User Avatar"
                        className="w-20 h-20 rounded-full object-cover mb-4 sm:mb-0 sm:mr-6"
                    />
                    <div>
                        <h2 className="text-lg sm:text-xl font-bold">Username: {userData?.username}</h2>
                        <p className="text-gray-500 text-sm">User Bio: {userData?.bio}</p>
                        <p className="text-gray-500 text-sm">Profession: {userData?.profession}</p>
                    </div>
                </div>
                <div className="self-center md:self-start">
                    <PanelLeftOpen
                        onClick={HandleModalopen}
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    />
                </div>
            </div>

            <UserInputform
                isModalOpen={isModalOpen}
                HandleModalclose={HandleModalclose}
            />
        </div>
    );
};

export default UserProfile;
