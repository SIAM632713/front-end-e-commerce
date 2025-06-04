import React from 'react';
import logo from "../../assets/header.png";

const Banner = () => {
    return (
        <div className="py-8">
            <div className="max-w-[1400px] mx-auto px-6 bg-[#F8E9EF] bg-opacity-10 rounded-xl">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                    {/* Left Text Content */}
                    <div className="lg:w-1/2 space-y-6 text-center lg:text-left px-8">
                        <p className="text-sm font-bold text-red-600 uppercase">Up to 20% Discount On</p>
                        <h1 className="text-7xl  font-bold">Girl's Fashion</h1>
                        <p className="text-gray-700 text-sm w-lg">
                            Discover the latest trends and express your unique style with our Women’s
                            Fashion website. Explore a curated collection of clothing, accessories, and
                            footwear that caters to every taste and occasion.
                        </p>
                        <button className="px-6 py-3 bg-[#FF4D4D] text-white rounded-md hover:bg-red-600 transition duration-300 cursor-pointer">
                            EXPLORE NOW
                        </button>
                    </div>

                    {/* Right Image */}
                    <div className="lg:w-1/2 flex justify-center">
                        <img src={logo} alt="Fashion Girl" className="w-full max-w-sm lg:max-w-md object-contain" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
