import React, {useState} from 'react';
import avater from "../../assets/avatar.png";
import { PanelLeftOpen } from 'lucide-react';
import UserInputform from "./userInputform.jsx";
import {useGetSingleProfileQuery} from "../../redux/feature/auth/authAPI.js";
import Loading from "../../component/loading/Loading.jsx";
import {useSelector} from "react-redux";

const UserProfile = () => {

    const {user}=useSelector((state) => state.auth);
    const {data,error,isLoading} = useGetSingleProfileQuery(user?._id);

    const userData=data?.data || {}
    console.log(userData)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const HandleModalopen=()=>{
        setIsModalOpen(true);
    }
    const HandleModalclose=()=>{
        setIsModalOpen(false);
    }

    if (isLoading) return (
        <div className="flex justify-center mt-10">
            <Loading />
        </div>
    );

    return (
        <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-md  mt-10">
            <div className="flex items-center">
                <img
                    src={userData?.profileImage}
                    alt="User Avatar"
                    className="w-20 h-20 rounded-full object-cover mr-6"
                />
                <div>
                    <h2 className="text-xl font-bold">Username: {userData?.username}</h2>
                    <p className="text-gray-500 text-sm">User Bio:  {userData?.bio}</p>
                    <p className="text-gray-500 text-sm">Profession:  {userData?.profession}</p>
                </div>
            </div>
            <PanelLeftOpen onClick={HandleModalopen} className="text-gray-500 cursor-pointer hover:text-gray-700" />
            <UserInputform isModalOpen={isModalOpen} HandleModalclose={HandleModalclose}/>
        </div>
    );
};

export default UserProfile;
