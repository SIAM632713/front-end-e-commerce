import React, {useState} from 'react';
import avater from "../../assets/avatar.png";
import { PanelLeftOpen } from 'lucide-react';
import UserInputform from "./userInputform.jsx";

const UserProfile = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const HandleModalopen=()=>{
        setIsModalOpen(true);
    }
    const HandleModalclose=()=>{
        setIsModalOpen(false);
    }

    return (
        <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-md  mt-10">
            <div className="flex items-center">
                <img
                    src={avater}
                    alt="User Avatar"
                    className="w-20 h-20 rounded-full object-cover mr-6"
                />
                <div>
                    <h2 className="text-xl font-bold">Username: user1</h2>
                    <p className="text-gray-500 text-sm">User Bio: I am User 1</p>
                    <p className="text-gray-500 text-sm">Profession: student</p>
                </div>
            </div>
            <PanelLeftOpen onClick={HandleModalopen} className="text-gray-500 cursor-pointer hover:text-gray-700" />
            <UserInputform isModalOpen={isModalOpen} HandleModalclose={HandleModalclose}/>
        </div>
    );
};

export default UserProfile;
