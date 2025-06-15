import React from 'react';

const Blogs = () => {
    return (
        <div className="mt-12 sm:mt-20 px-4">
            <div className="max-w-[1400px] mx-auto p-6 sm:p-12 rounded-md bg-gray-200">

                {/* Title Section */}
                <div className="text-center mt-4 space-y-3 sm:space-y-4">
                    <h1 className="text-2xl sm:text-3xl font-bold">Latest From Blog</h1>
                    <p className="text-sm sm:text-base text-gray-500 max-w-xs sm:max-w-sm mx-auto">
                        Elevate your wardrobe with our freshest style tips, trends, and inspiration on our blog.
                    </p>
                </div>

                {/* Blog Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 mt-10">
                    {/* Card 1 */}
                    <div className="rounded-md shadow-md overflow-hidden bg-white cursor-pointer">
                        <div className="overflow-hidden">
                            <img
                                className="w-full h-52 sm:h-60 object-cover duration-300 hover:scale-105"
                                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
                                alt="img"
                            />
                        </div>
                        <div className="text-center space-y-2 py-4 px-3">
                            <h1 className="text-red-500 text-sm font-semibold">Timeless Elegance</h1>
                            <h1 className="text-lg font-semibold">Mastering the Art of Capsule Wardrobes</h1>
                            <p className="text-sm text-gray-500">12th August 2022</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="rounded-md shadow-md overflow-hidden bg-white cursor-pointer">
                        <div className="overflow-hidden">
                            <img
                                className="w-full h-52 sm:h-60 object-cover duration-300 hover:scale-105"
                                src="https://images.unsplash.com/photo-1700159017572-de76bb0c5719?q=80&w=2072&auto=format&fit=crop"
                                alt="img"
                            />
                        </div>
                        <div className="text-center space-y-2 py-4 px-3">
                            <h1 className="text-red-500 text-sm font-semibold">Summer Breeze</h1>
                            <h1 className="text-lg font-semibold">Unveiling the Hottest Beachwear Trends</h1>
                            <p className="text-sm text-gray-500">18th January 2023</p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="rounded-md shadow-md overflow-hidden bg-white cursor-pointer">
                        <div className="overflow-hidden">
                            <img
                                className="w-full h-52 sm:h-60 object-cover duration-300 hover:scale-105"
                                src="https://plus.unsplash.com/premium_photo-1682142715511-27bfbfdc044f?q=80&w=2069&auto=format&fit=crop"
                                alt="img"
                            />
                        </div>
                        <div className="text-center space-y-2 py-4 px-3">
                            <h1 className="text-red-500 text-sm font-semibold">Power Dressing</h1>
                            <h1 className="text-lg font-semibold">Navigating the World of Women’s Tailoring</h1>
                            <p className="text-sm text-gray-500">5th January 2025</p>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="rounded-md shadow-md overflow-hidden bg-white cursor-pointer">
                        <div className="overflow-hidden">
                            <img
                                className="w-full h-52 sm:h-60 object-cover duration-300 hover:scale-105"
                                src="https://plus.unsplash.com/premium_photo-1713720663924-4e3fe8f20f79?q=80&w=1948&auto=format&fit=crop"
                                alt="img"
                            />
                        </div>
                        <div className="text-center space-y-2 py-4 px-3">
                            <h1 className="text-red-500 text-sm font-semibold">New York Times</h1>
                            <h1 className="text-lg font-semibold">The World’s Best Fashion Fair 2025</h1>
                            <p className="text-sm text-gray-500">25th May 2025</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blogs;
