import React from 'react';
import { useGetReviewByUserIdQuery } from "../../redux/feature/Reviews/ReviewAPI.js";
import { useSelector } from "react-redux";
import Loading from "../../Screenloading/Loading.jsx";
import { Link } from "react-router-dom";

const UserReview = () => {
    const { user } = useSelector((state) => state.auth);
    const { data, error, isLoading } = useGetReviewByUserIdQuery(user?._id);
    const review = data?.data || [];

    if (isLoading) {
        return (
            <div className="flex justify-center mt-10">
                <Loading />
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-6 py-4">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Your Given Reviews</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {review.map((item, index) => (
                    <div
                        key={index}
                        className="border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition duration-300 p-4 bg-white space-y-2"
                    >
                        <p className="text-sm sm:text-base"><strong>Rating:</strong> {item.rating}</p>
                        <p className="text-sm sm:text-base"><strong>Comment:</strong> {item.comment}</p>
                        <p className="text-xs sm:text-sm text-gray-600">
                            <strong>Product ID:</strong> {item.productID}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600">
                            <strong>Created At:</strong> {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                ))}
                <Link
                    to="/shope"
                    className="flex items-center justify-center border border-gray-300 rounded-lg shadow-sm p-4 bg-gray-100 text-center hover:bg-gray-200 transition cursor-pointer"
                >
                    <span className="text-base sm:text-lg font-semibold">+ Add New Review</span>
                </Link>
            </div>
        </div>
    );
};

export default UserReview;
