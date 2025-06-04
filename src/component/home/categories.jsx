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
        <div>
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {
                        categories.map((item, index) => (
                            <Link to={`/categories/${item.path}`} key={index}>
                                <div className="space-y-2 flex flex-col items-center text-center">
                                    <img src={item.img} alt="logo" className="rounded-full w-24 h-24 sm:w-20 sm:h-20 object-cover" />
                                    <h1 className="font-semibold text-base sm:text-lg">{item.name}</h1>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Categories;
