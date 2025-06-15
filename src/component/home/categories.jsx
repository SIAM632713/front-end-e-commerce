import React from 'react';
import logo1 from "../../assets/category-1.jpg";
import logo2 from "../../assets/category-2.jpg";
import logo3 from "../../assets/category-3.jpg";
import logo4 from "../../assets/category-4.jpg";
import { Link } from "react-router-dom";

const Categories = () => {
    const categories = [
        { name: "Accesories", path: "accesories", img: logo1 },
        { name: "Dress Collection", path: "dress", img: logo2 },
        { name: "Jewellery", path: "jewellery", img: logo3 },
        { name: "Cosmetics", path: "cosmetics", img: logo4 },
    ];

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1400px] mx-auto">
                <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">Shop by Category</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8">
                    {categories.map((item, index) => (
                        <Link to={`/categories/${item.path}`} key={index}>
                            <div className="flex flex-col items-center text-center space-y-2 transition-transform duration-300 hover:scale-105">
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="rounded-full w-20 h-20 sm:w-24 sm:h-24 object-cover shadow-md"
                                />
                                <h1 className="text-sm sm:text-base font-medium">{item.name}</h1>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;
