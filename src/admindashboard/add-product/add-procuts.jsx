import React, { useRef, useState } from 'react';
import axios from "axios";
import { getBaseURL } from "../../utilis/getBaseURL.js";
import { useAddProductMutation } from "../../redux/feature/Product/productAPI.js";
import { useSelector } from "react-redux";
import ButtonLoader from "../../ButtonLoader/buttonLoader.jsx";

const AddProducts = () => {
    const [AddProduct, {isLoading }] = useAddProductMutation();
    const [uploading, setUploading] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const fileInputRef = useRef(null);

    const [inputForm, setinputForm] = useState({
        Productname: "",
        Category: "",
        Color: "",
        Price: "",
        imageFile: null,
        Description: "",
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

            if (!inputForm.Productname || !inputForm.Category || !inputForm.Color || !inputForm.Price || !inputForm.Description) {
                alert("Please fill in all required fields.");
                return;
            }

            const newProduct = {
                name: inputForm.Productname,
                category: inputForm.Category,
                description: inputForm.Description,
                price: Number(inputForm.Price),
                color: inputForm.Color,
                image: imageUrl,
                author: user?._id,
            };

            await AddProduct(newProduct).unwrap();
            alert("Product added successfully.");
            setinputForm({
                Productname: "",
                Category: "",
                Color: "",
                Price: "",
                imageFile: null,
                Description: "",
            });
            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }
        } catch (err) {
            console.error('Error uploading image:', err);
        } finally {
            setUploading(false);
        }
    };


    return (
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">Add New Product</h2>
            <form className="space-y-6" onSubmit={HandleonSubmit}>
                {/* Product Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">Product Name</label>
                    <input
                        value={inputForm.Productname}
                        onChange={handleOnChange}
                        name="Productname"
                        type="text"
                        placeholder="Ex: Diamond Earrings"
                        className="w-full bg-gray-100 px-4 py-3 rounded-md text-gray-700 placeholder-gray-400 outline-none"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                        value={inputForm.Category}
                        onChange={handleOnChange}
                        name="Category"
                        className="w-full bg-gray-100 px-4 py-3 rounded-md text-gray-700 outline-none"
                    >
                        <option>Select Category</option>
                        <option>Accessories</option>
                        <option>Dress</option>
                        <option>Jewellery</option>
                        <option>Cosmetics</option>
                    </select>
                </div>

                {/* Color */}
                <div>
                    <label className="block text-sm font-medium mb-1">Color</label>
                    <select
                        value={inputForm.Color}
                        onChange={handleOnChange}
                        name="Color"
                        className="w-full bg-gray-100 px-4 py-3 rounded-md text-gray-700 outline-none"
                    >
                        <option>Select Color</option>
                        <option>Black</option>
                        <option>Red</option>
                        <option>Gold</option>
                        <option>Blue</option>
                        <option>Silver</option>
                        <option>Beige</option>
                        <option>Green</option>
                    </select>
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium mb-1">Price</label>
                    <input
                        value={inputForm.Price}
                        onChange={handleOnChange}
                        name="Price"
                        type="number"
                        placeholder="0"
                        className="w-full bg-gray-100 px-4 py-3 rounded-md text-gray-700 outline-none"
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium mb-1">Product Image</label>
                    <input
                        ref={fileInputRef}
                        onChange={handleOnChange}
                        type="file"
                        name="Image"
                        className="w-full bg-gray-100 px-4 py-2 rounded-md text-gray-700 outline-none"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        value={inputForm.Description}
                        onChange={handleOnChange}
                        name="Description"
                        placeholder="Write a product description"
                        rows="4"
                        className="w-full bg-gray-100 px-4 py-3 rounded-md text-gray-700 outline-none resize-none"
                    ></textarea>
                </div>

                {/* Add Product Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white font-medium px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-200 w-full sm:w-auto"
                    >
                        {
                            isLoading || uploading ? <ButtonLoader/> : "Add Product"
                        }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProducts;
