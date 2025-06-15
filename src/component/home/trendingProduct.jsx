import React, { useState } from 'react';
import StarRatings from "react-star-ratings/build/star-ratings";
import { ShoppingCart } from 'lucide-react';
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/feature/Cart/cartSlice.js";
import { useAllProductsQuery } from "../../redux/feature/Product/productAPI.js";
import Loading from "../loading/Loading.jsx";
import { Link } from "react-router-dom";

const TrendingProduct = () => {
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const { data, error, isLoading } = useAllProductsQuery();
    const productData = data?.data || [];

    const [visibleProduct, setVisibleProduct] = useState(8);

    const handleClick = () => {
        setVisibleProduct(prev => prev + 4);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center mt-10">
                <Loading />
            </div>
        );
    }

    return (
        <div className="mt-20 px-4 sm:px-6">
            <div className="max-w-[1400px] mx-auto">
                {/* Heading Section */}
                <div className="flex flex-col items-center justify-center space-y-3 text-center">
                    <h1 className="text-3xl sm:text-4xl font-semibold">Trending Products</h1>
                    <p className="text-sm sm:text-base max-w-md text-gray-500">
                        Discover the Hottest Picks: Elevate Your Style with Our Curated Collection of Trending Women's Fashion Products.
                    </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
                    {productData.slice(0, visibleProduct).map((item, index) => (
                        <div key={index} className="relative bg-white rounded shadow-sm p-3 hover:shadow-md transition duration-200">
                            {/* Image & Cart Icon */}
                            <div className="relative">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-52 object-cover rounded"
                                />
                                <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
                                    <ShoppingCart
                                        onClick={() => handleAddToCart(item)}
                                        className="text-pink-500 cursor-pointer w-5 h-5"
                                    />
                                </div>
                            </div>

                            {/* Product Details */}
                            <Link to={`/shope/${item._id}`}>
                                <div className="mt-3 text-center">
                                    <h1 className="text-base font-bold truncate">{item.name}</h1>
                                    <h2 className="text-sm font-semibold text-red-500">${item.price}</h2>
                                    <div className="flex justify-center mt-1">
                                        <StarRatings
                                            rating={item.rating}
                                            starRatedColor="gold"
                                            numberOfStars={5}
                                            name={`rating-${item.name}`}
                                            starDimension="16px"
                                            starSpacing="2px"
                                        />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Load More Button */}
                {visibleProduct < productData.length && (
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={handleClick}
                            className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md transition"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrendingProduct;
