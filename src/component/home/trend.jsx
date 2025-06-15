import React from 'react';
import card1 from "../../assets/card-1.png";
import card2 from "../../assets/card-2.png";
import card3 from "../../assets/card-3.png";

const Trend = () => {
    return (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Card 1 */}
                <div className="relative rounded-md overflow-hidden group">
                    <img src={card1} alt="image" className="h-[250px] w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0  bg-opacity-60 flex flex-col items-center justify-center text-white text-center px-4">
                        <h1 className="text-red-500 font-semibold drop-shadow-md">2023 Trend</h1>
                        <p className="text-xl font-bold text-black">Womens Shirt</p>
                        <p className="underline text-sm text-black">Discover More +</p>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="relative rounded-md overflow-hidden group">
                    <img src={card2} alt="Card 2" className="h-[250px] w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0  bg-opacity-60 flex flex-col items-center justify-center text-white text-center px-4">
                        <h1 className="text-red-500 font-semibold drop-shadow-md">2023 Trend</h1>
                        <p className="text-xl font-bold text-black">Womens Dresses</p>
                        <p className="underline text-sm text-black">Discover More +</p>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="relative rounded-md overflow-hidden group">
                    <img src={card3} alt="Card 3" className="h-[250px] w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0  bg-opacity-60 flex flex-col items-center justify-center text-white text-center px-4">
                        <h1 className="text-red-500 font-semibold drop-shadow-md">2023 Trend</h1>
                        <p className="text-xl font-bold text-black">Womens Casuals</p>
                        <p className="underline text-sm text-black">Discover More +</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Trend;
