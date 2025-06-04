import React from 'react';
import logo from "../../assets/deals.png";

const Dealsection = () => {
    return (
        <div className="max-w-[1400px] mx-auto mt-15">
            <div className="flex flex-col lg:flex-row items-center justify-between bg-[#F8E9EF] rounded-md ">
                <div>
                    <img
                        src={logo}
                        alt="Deals"
                        className="h-100 w-130 lg:ml-10 mt-5"
                    />
                </div>

                <div className="space-y-4 text-center lg:text-left lg:mr-10 ">
                    <h1 className="text-red-600 font-semibold text-lg ">Get Up To 20% Discount</h1>
                    <h1 className="text-2xl md:text-3xl font-semibold">Deals Of This Month</h1>
                    <p className="text-sm text-gray-500 max-w-xl mx-auto lg:mx-0">
                        Our Women's Fashion Deals of the Month are here to make your style dreams a reality without
                        breaking the bank. Discover a curated collection of exquisite clothing, accessories, and
                        footwear, all handpicked to elevate your wardrobe.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-md">
                        <div
                            className="w-18 h-18 flex flex-col items-center justify-center rounded-full shadow-md bg-white text-center">
                            <h1 className="text-lg font-bold">14</h1>
                            <h1 className="text-sm">Days</h1>
                        </div>
                        <div
                            className="w-18 h-18 flex flex-col items-center justify-center rounded-full shadow-md bg-white text-center">
                            <h1 className="text-lg font-bold">20</h1>
                            <h1 className="text-sm">Hours</h1>
                        </div>
                        <div
                            className="w-18 h-18 flex flex-col items-center justify-center rounded-full shadow-md bg-white text-center">
                            <h1 className="text-lg font-bold">15</h1>
                            <h1 className="text-sm">Mins</h1>
                        </div>
                        <div
                            className="w-18 h-18 flex flex-col items-center justify-center rounded-full shadow-md bg-white text-center">
                            <h1 className="text-lg font-bold">05</h1>
                            <h1 className="text-sm">Secs</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dealsection;
