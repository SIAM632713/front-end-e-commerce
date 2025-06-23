import React, { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useGetupdateProfileMutation } from "../../redux/feature/auth/authAPI.js";
import axios from "axios";
import { getBaseURL } from "../../utilis/getBaseURL.js";
import { useSelector } from "react-redux";
import ButtonLoader from "../../ButtonLoader/buttonLoader.jsx";

const UserInputform = ({ HandleModalclose, isModalOpen }) => {
    if (!isModalOpen) return null;

    const { user } = useSelector((state) => state.auth);
    const [GetupdateProfile, { error, isLoading }] = useGetupdateProfileMutation();
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const [inputForm, setinputForm] = useState({
        Name: "",
        imageFile: null,
        Bio: "",
        Profession: "",
    });

    const handleOnChange = (e) => {
        const { name, value, files, type } = e.target;
        if (type === 'file') {
            setinputForm(prev => ({ ...prev, imageFile: files[0] }));
        } else {
            setinputForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const HandleonSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            let imageUrl = "";

            if (inputForm.imageFile) {
                const formData = new FormData();
                formData.append("image", inputForm.imageFile);

                const imageUploadResponse = await axios.post(`${getBaseURL()}/api/upload`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                imageUrl = imageUploadResponse.data.url;
            }

            if (!inputForm.Name || !inputForm.Bio || !inputForm.Profession || !inputForm.imageFile) {
                alert("Please fill in all required fields.");
                return;
            }

            const userdata = {
                username: inputForm.Name,
                bio: inputForm.Bio,
                profession: inputForm.Profession,
                profileImage: imageUrl,
            };

            await GetupdateProfile({ id: user?._id, userdata }).unwrap();
            alert("Profile updated successfully.");
            setinputForm({
                Name: "",
                imageFile: null,
                Bio: "",
                Profession: ""
            });
            if (fileInputRef.current) fileInputRef.current.value = null;
        } catch (err) {
            console.error('Error uploading image:', err);
        } finally {
            setUploading(false);
        }
        HandleModalclose()
    };

    return (
        <div className="fixed inset-0  backdrop-brightness-25  flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
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
                            onChange={handleOnChange}
                            type="text"
                            name="Name"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Profile Image</label>
                        <input
                            onChange={handleOnChange}
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
                            onChange={handleOnChange}
                            name="Bio"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Profession</label>
                        <input
                            value={inputForm.Profession}
                            onChange={handleOnChange}
                            type="text"
                            name="Profession"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading || uploading}
                        className="w-full py-2 rounded-md text-white flex justify-center items-center bg-blue-600 hover:bg-blue-700">
                        {isLoading || uploading ? <ButtonLoader/> : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserInputform;
