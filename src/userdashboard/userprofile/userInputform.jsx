import React, { useState } from 'react';
import { X } from 'lucide-react';
import {useGetupdateProfileMutation} from "../../redux/feature/auth/authAPI.js";
import {useSelector} from "react-redux";
import Loading from "../../component/loading/Loading.jsx";
import axios from "axios";
import {getBaseURL} from "../../utilis/getBaseURL.js";

const UserInputform = ({ HandleModalclose, isModalOpen }) => {
    if (!isModalOpen) return null;

    const {user}=useSelector((state) => state.auth);
    const [GetupdateProfile,{error,isLoading}]=useGetupdateProfileMutation()

    const [inputData, setInputData] = useState({
        username:"",
        profileImage:"",
        bio:"",
        profession:""
    });



    const handleImageUpload = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setInputData((prev) => ({
                ...prev,
                profileImage: reader.result,
            }));
        };
        reader.readAsDataURL(file);
    };


    const HandleonChange=(e)=>{
        const {name,value,type,files}=e.target;
        if(type === 'file'){
            handleImageUpload(files[0])
        }else {
            setInputData({
                ...inputData,
                [name]:value
            })
        }
    }


    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
            const imageUploadResponse = await axios.post(`${getBaseURL()}/uploadImage`, {
                profileImage: inputData.profileImage,
            });

            const imageUrl = imageUploadResponse.data;

            const userdata={
                username:inputData.username,
                profileImage:inputData,
                bio:inputData.bio,
                profession:""
            }
        }catch(err){

        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center mt-10">
                <Loading />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 backdrop-brightness-25 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 relative">
                <button
                    onClick={HandleModalclose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black"
                >
                    <X size={20} />
                </button>
                <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
                <form  className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <input
                            value={inputData.username}
                            onChange={HandleonChange}
                            type="text"
                            name="username"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Profile Image </label>
                        <input
                            onChange={HandleonChange}
                            type="file"
                            name="image"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Bio</label>
                        <textarea
                            value={inputData.bio}
                            onChange={HandleonChange}
                            name="bio"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Profession</label>
                        <input
                            value={inputData.profession}
                            onChange={HandleonChange}
                            type="text"
                            name="profession"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserInputform;
