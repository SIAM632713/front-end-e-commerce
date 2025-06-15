import React from 'react';
import logo from "../../assets/header.png";

const Banner = () => {
    return (
        <div className="py-6 sm:py-8">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 bg-[#F8E9EF] bg-opacity-10 rounded-xl">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10">
                    {/* Left Text Content */}
                    <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6 text-center lg:text-left px-4 sm:px-8">
                        <p className="text-xs sm:text-sm font-bold text-red-600 uppercase">Up to 20% Discount On</p>
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                            Girl's Fashion
                        </h1>
                        <p className="text-gray-700 text-sm sm:text-base">
                            Discover the latest trends and express your unique style with our Women’s
                            Fashion website. Explore a curated collection of clothing, accessories, and
                            footwear that caters to every taste and occasion.
                        </p>
                        <button className="px-5 py-2 sm:px-6 sm:py-3 bg-[#FF4D4D] text-white rounded-md hover:bg-red-600 transition duration-300 cursor-pointer">
                            EXPLORE NOW
                        </button>
                    </div>

                    {/* Right Image */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <img
                            src={logo}
                            alt="Fashion Girl"
                            className="w-full max-w-[280px] sm:max-w-sm lg:max-w-md object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
