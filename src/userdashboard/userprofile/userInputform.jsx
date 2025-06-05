import React, {useRef, useState} from 'react';
import { X } from 'lucide-react';
import {useGetupdateProfileMutation} from "../../redux/feature/auth/authAPI.js";
import Loading from "../../component/loading/Loading.jsx";
import axios from "axios";
import {getBaseURL} from "../../utilis/getBaseURL.js";
import {useSelector} from "react-redux";

const UserInputform = ({ HandleModalclose, isModalOpen }) => {
    if (!isModalOpen) return null;

    const {user}=useSelector((state)=>state.auth)
    const [GetupdateProfile,{error,isLoading}]=useGetupdateProfileMutation()

    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);
    const [inputForm,setinputForm] = useState({
        Name:"",
        Image:null,
        Bio:"",
        Profession:"",
    })



    const handleImageUpload = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setinputForm((prev) => ({
                ...prev,
                Image: reader.result,
            }));
        };
        reader.readAsDataURL(file);
    };



    const HandleonChange = (e) => {
        const { name, value, files, type } = e.target;

        if (type === 'file') {
            handleImageUpload(files[0]);
        } else {
            setinputForm({
                ...inputForm,
                [name]: value,
            });
        }
    };


    const HandleonSubmit = async (e) => {
        e.preventDefault();

        if (!inputForm.Name || !inputForm.Bio || !inputForm.Profession || !inputForm.Image) {
            alert("Please fill in all required fields.");
            return;
        }

        setUploading(true);
        try {
            const imageUploadResponse = await axios.post(`${getBaseURL()}/uploadImage`, {
                image: inputForm.Image,
            });

            const imageUrl = imageUploadResponse.data;

            const userdata = {
                username: inputForm.Name,
                bio: inputForm.Bio,
                profession: inputForm.Profession,
                profileImage: imageUrl,
            };

            await GetupdateProfile({ id: user?._id, userdata }).unwrap();
            alert("profile updated successfully.");
            setinputForm({ Name: "", Image: null, Bio: "", Profession: "" });
            if (fileInputRef.current) fileInputRef.current.value = null;

        } catch (err) {
            console.error('Error uploading image:', err);
        } finally {
            setUploading(false);
        }
    };



    if (isLoading || uploading) return (
        <div className="flex justify-center mt-10">
            <Loading />
        </div>
    );


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
                <form onSubmit={HandleonSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <input
                            value={inputForm.Name}
                            onChange={HandleonChange}
                            type="text"
                            name="Name"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Profile Image </label>
                        <input
                            onChange={HandleonChange}
                            ref={fileInputRef}
                            type="file"
                            name="Image"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Bio</label>
                        <textarea
                            value={inputForm.Bio}
                            onChange={HandleonChange}
                            name="Bio"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Profession</label>
                        <input
                            value={inputForm.Profession}
                            onChange={HandleonChange}
                            type="text"
                            name="Profession"
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
