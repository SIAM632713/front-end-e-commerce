import React from 'react';
import logo from "../../assets/deals.png";

const Dealsection = () => {
    return (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-10">
            <div className="flex flex-col lg:flex-row items-center justify-between bg-[#F8E9EF] rounded-md gap-6 lg:gap-10 p-6">

                {/* Image Section */}
                <div className="flex justify-center lg:justify-start w-full lg:w-1/2">
                    <img
                        src={logo}
                        alt="Deals"
                        className="w-full max-w-xs sm:max-w-sm md:max-w-md object-contain"
                    />
                </div>

                {/* Text Section */}
                <div className="space-y-4 text-center lg:text-left w-full lg:w-1/2">
                    <h1 className="text-red-600 font-semibold text-sm sm:text-base">
                        Get Up To 20% Discount
                    </h1>
                    <h1 className="text-2xl sm:text-3xl font-semibold">
                        Deals Of This Month
                    </h1>
                    <p className="text-sm text-gray-500 max-w-xl mx-auto lg:mx-0">
                        Our Women's Fashion Deals of the Month are here to make your style dreams a reality without
                        breaking the bank. Discover a curated collection of exquisite clothing, accessories, and
                        footwear, all handpicked to elevate your wardrobe.
                    </p>

                    {/* Countdown Section */}
                    <div className="grid grid-cols-4 gap-3 max-w-xs mx-auto lg:mx-0">
                        {[
                            { value: "14", label: "Days" },
                            { value: "20", label: "Hours" },
                            { value: "15", label: "Mins" },
                            { value: "05", label: "Secs" },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="w-16 h-16 sm:w-18 sm:h-18 flex flex-col items-center justify-center rounded-full shadow-md bg-white"
                            >
                                <h1 className="text-lg font-bold">{item.value}</h1>
                                <h1 className="text-sm">{item.label}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dealsection;
