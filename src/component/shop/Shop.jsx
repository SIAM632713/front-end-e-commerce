import React, { useState } from 'react';
import { useFetchAllProductsQuery } from "../../redux/feature/Product/productAPI.js";
import StarRatings from "react-star-ratings/build/star-ratings.js";
import Loading from "../../Screenloading/Loading.jsx";
import {Meh, ShoppingCart, X} from "lucide-react";
import ShopFiltering from "./shopFiltering.jsx";
import {Link, useSearchParams} from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/feature/Cart/cartSlice.js";
import { getToken } from "../../sessionHelper/sessionHelper.js";
import toast from "react-hot-toast";

const Shop = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") || "";

    const HandleaddToCart = (product) => {
        if (!getToken()) {
            toast.error("Please Login First");
            return;
        }
        try {
            dispatch(addToCart(product));
        } catch (error) {}
    };

    const [filterState, setFilterState] = useState({
        category: 'all',
        color: 'all',
        priceRange: ''
    });

    const { category, color, priceRange } = filterState;
    const [minPrice, maxPrice] = priceRange.split('-').map(Number);

    const { data: Productdata = {}, isLoading, error } = useFetchAllProductsQuery({
        keyword,
        category: category !== 'all' ? category : '',
        color: color !== 'all' ? color : '',
        minPrice: isNaN(minPrice) ? '' : minPrice,
        maxPrice: isNaN(maxPrice) ? '' : maxPrice,
    });

    const clearFilterState = () => {
        setFilterState({
            category: 'all',
            color: 'all',
            priceRange: ''
        });
    };

    const productData = Productdata?.data || [];
    const totalProducts = productData.length;

    const [currentPage, setCurrentPage] = useState(1);
    const ProductperPage = 8;

    const indexOfLastProduct = currentPage * ProductperPage;
    const indexOfFirstProduct = indexOfLastProduct - ProductperPage;
    const currentProducts = productData.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(totalProducts / ProductperPage);

    const Startproduct = totalProducts === 0 ? 0 : indexOfFirstProduct + 1;
    const Endproduct = Math.min(indexOfLastProduct, totalProducts);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const HandlecurrerentPage = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    if (isLoading) {
        return (
            <div className="flex justify-center mt-10">
                <Loading />
            </div>
        );
    }

    return (
        <>
            {/* Toggle Filter Button (Mobile only) */}
            <div className="md:hidden px-4 mt-6">
                <button
                    onClick={() => setIsFilterOpen(true)}
                    className="px-4 py-2 bg-pink-500 text-white rounded shadow-md"
                >
                    Show Filters
                </button>
            </div>

            {/* Slide-in Filter Panel for Mobile (Left) */}
            <div
                className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white z-50 p-5 shadow-lg transition-transform duration-300 ease-in-out transform ${
                    isFilterOpen ? 'translate-x-0' : '-translate-x-full'
                } md:hidden`}
            >
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => setIsFilterOpen(false)}
                        className="text-gray-600 hover:text-red-500 text-sm"
                    >
                        <X/>
                    </button>
                </div>
                <ShopFiltering
                    filterState={filterState}
                    setFilterState={setFilterState}
                    clearFilterState={clearFilterState}
                />
            </div>

            <section>
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start gap-6 mt-10 px-4">
                    {/* Filters for Desktop */}
                    <div className="md:w-[250px] w-full hidden md:block">
                        <ShopFiltering
                            filterState={filterState}
                            setFilterState={setFilterState}
                            clearFilterState={clearFilterState}
                        />
                    </div>

                    {/* Product List */}
                    <div className="flex-1 w-full">
                        <h1 className="text-xl font-semibold mb-4">
                            Showing {Startproduct} to {Endproduct} of {totalProducts} products
                        </h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {currentProducts.length > 0 ? (
                                currentProducts.map((item, index) => (
                                    <div key={index} className="relative group">
                                        <div className="relative">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full object-cover aspect-[4/5] rounded"
                                            />
                                            <div
                                                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow cursor-pointer hover:bg-pink-100 transition">
                                                <ShoppingCart
                                                    onClick={() => HandleaddToCart(item)}
                                                    className="text-pink-500 w-6 h-6 md:w-5 md:h-5"
                                                />
                                            </div>
                                        </div>

                                        <Link to={`/shope/${item._id}`}>
                                            <div className="mt-3">
                                                <h1 className="text-center text-lg font-bold truncate">{item.name}</h1>
                                                <h1 className="text-center font-semibold text-pink-600">${item.price}</h1>
                                                <div className="flex justify-center mt-2">
                                                    <StarRatings
                                                        rating={Number(item.rating) || 0}
                                                        starRatedColor="gold"
                                                        numberOfStars={5}
                                                        name={`rating-${item.name}`}
                                                        starDimension="15px"
                                                        starSpacing="2px"
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center text-gray-500 mt-10">
                                    <Meh className="w-10 h-10 mb-2" />
                                    <p className="font-medium">No products available right now. Please check back later.</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {currentProducts.length > 0 && (
                            <div className="text-center mt-8 space-x-1 flex flex-wrap justify-center gap-2">
                                <button
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className={`px-3 py-2 rounded-md border text-sm font-medium ${
                                        currentPage === 1
                                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                            : "bg-white text-gray-700 hover:bg-gray-100"
                                    }`}
                                >
                                    Previous
                                </button>

                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        onClick={() => HandlecurrerentPage(index + 1)}
                                        key={index}
                                        className={`px-3 py-2 rounded-md border text-sm font-medium ${
                                            currentPage === index + 1
                                                ? "bg-blue-500 text-white"
                                                : "bg-white text-gray-700 hover:bg-gray-100"
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className={`px-3 py-2 rounded-md border text-sm font-medium ${
                                        currentPage === totalPages
                                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                            : "bg-white text-gray-700 hover:bg-gray-100"
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Shop;
