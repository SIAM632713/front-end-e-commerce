import React from 'react';
import card1 from "../../assets/card-1.png";
import card2 from "../../assets/card-2.png";
import card3 from "../../assets/card-3.png";

const Trend = () => {
    return (
        <div className="max-w-[1400px] mx-auto mt-15">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Card 1 */}
                <div className="relative">
                    <img src={card1} alt="Card 1" className="h-[250px] w-full rounded-md" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center  text-center">
                        <h1 className="text-red-600 font-semibold">2023 Trend</h1>
                        <p className="text-lg font-bold">Womens Shirt</p>
                        <p className="underline text-sm">Discover More +</p>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="relative">
                    <img src={card2} alt="Card 2" className="h-[250px] w-full rounded-md" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pl-10">
                        <h1 className="text-red-600 font-semibold">2023 Trend</h1>
                        <p className="text-lg font-bold">Womens Dresses</p>
                        <p className="underline text-sm">Discover More +</p>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="relative">
                    <img src={card3} alt="Card 3" className="h-[250px] w-full rounded-md" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pl-15">
                        <h1 className="text-red-600 font-semibold">2023 Trend</h1>
                        <p className="text-lg font-bold">Womens Casuals</p>
                        <p className="underline text-sm">Discover More +</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Trend;
