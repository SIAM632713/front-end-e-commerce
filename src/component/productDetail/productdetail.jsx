import React from 'react';
import { Link, useParams } from "react-router-dom";
import { useFetchProductbyIDQuery } from "../../redux/feature/Product/productAPI.js";
import Loading from "../../Screenloading/Loading.jsx";
import StarRatings from "react-star-ratings/build/star-ratings.js";
import Productreview from "./Productreview.jsx";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/feature/Cart/cartSlice.js";
import { getToken } from "../../sessionHelper/sessionHelper.js";
import toast from "react-hot-toast";

const Productdetail = () => {
    const { id } = useParams();
    const { data: { data: productData } = {}, isLoading } = useFetchProductbyIDQuery(id);
    const Singleproduct = productData?.Singleproduct;
    const singleReview = productData?.singleReview;

    const dispatch = useDispatch();

    const HandleaddToCart = () => {
        if (!getToken()) {
            toast.error("Please Login First");
            return;
        }
        try {
            dispatch(addToCart(Singleproduct));
        } catch (error) {}
    };

    if (isLoading) {
        return (
            <div className="flex justify-center mt-10">
                <Loading />
            </div>
        );
    }

    return (
        <>
            {/* Header Section */}
            <section>
                <div className="max-w-[1400px] mx-auto bg-[#F8E9EF] px-4 py-10 md:p-20 text-center rounded-xl space-y-3">
                    <h1 className="text-2xl md:text-3xl font-bold">Single Product Page</h1>
                    <p className="space-x-2 text-sm text-gray-500">
                        <span><Link to="/">Home</Link> &gt;</span>
                        <span><Link to="/shop">Shop</Link> &gt;</span>
                        <span>{Singleproduct?.name}</span>
                    </p>
                </div>
            </section>

            {/* Product Detail Section */}
            <section className="mt-10 px-4">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-start gap-6 md:gap-10">
                    {/* Image */}
                    <div className="w-full md:max-w-[550px]">
                        <img
                            src={Singleproduct?.image}
                            alt={Singleproduct?.name}
                            className="w-full object-contain rounded-md border border-gray-200"
                        />
                    </div>

                    {/* Details */}
                    <div className="w-full space-y-4">
                        <h1 className="text-xl md:text-3xl font-bold text-gray-900">{Singleproduct?.name}</h1>
                        <h2 className="text-lg md:text-2xl font-semibold text-red-600">
                            ${Singleproduct?.price}
                            {Singleproduct?.oldPrice && (
                                <strike className="ml-2 text-gray-500 text-base">${Singleproduct?.oldPrice}</strike>
                            )}
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base">{Singleproduct?.description}</p>
                        <h3 className="font-bold text-sm md:text-base">Category: <span className="font-normal">{Singleproduct?.category}</span></h3>
                        <h3 className="font-bold text-sm md:text-base">Color: <span className="font-normal">{Singleproduct?.color}</span></h3>
                        <h3 className="font-bold text-sm md:text-base flex items-center space-x-1">
                            <span>Rating:</span>
                            <StarRatings
                                rating={Number(Singleproduct?.rating) || 0}
                                starRatedColor="gold"
                                numberOfStars={5}
                                name={`rating-${Singleproduct?.name}`}
                                starDimension="15px"
                                starSpacing="2px"
                            />
                        </h3>
                        <button
                            onClick={HandleaddToCart}
                            className="mt-4 w-full md:w-auto px-6 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors duration-300"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </section>

            {/* Review Section */}
            <section className="mt-10 px-4">
                <Productreview ReviewProduct={singleReview} />
            </section>
        </>
    );
};

export default Productdetail;
