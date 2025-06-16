import React, { useState } from 'react';
import StarRatings from "react-star-ratings/build/star-ratings";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFetchProductbyIDQuery } from "../../redux/feature/Product/productAPI.js";
import { usePostReviewMutation } from "../../redux/feature/Reviews/ReviewAPI.js";
import toast from "react-hot-toast";

const Postreview = ({ isModalOpen, Handleclose }) => {
    if (!isModalOpen) return null;

    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useSelector((state) => state.auth);
    const { refetch } = useFetchProductbyIDQuery(id, { skip: !id });

    const [ratings, setRatings] = useState(0);
    const [comments, setComments] = useState('');
    const [reviewData] = usePostReviewMutation();

    const handleRating = (value) => {
        setRatings(value);
    };

    const Handlesubmit = async (e) => {
        e.preventDefault();

        if (ratings === 0) {
            alert("Please select a rating.");
            return;
        }

        if (!user) {
            alert("Please login first.");
            navigate("/login");
            return;
        }

        const newReview = {
            comment: comments,
            rating: ratings,
            userID: user?._id,
            productID: id
        };

        try {
            const result = await reviewData(newReview);
            toast.success("Review posted successfully!");
            setRatings(0);
            setComments('');
            refetch();
        } catch (err) {
            alert("Error posting review");
        }
        Handleclose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-white w-full max-w-md md:max-w-lg rounded-lg shadow-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3">Post a Review</h3>

                <div className="mb-3">
                    <StarRatings
                        rating={ratings}
                        changeRating={handleRating}
                        starRatedColor="gold"
                        numberOfStars={5}
                        name="rating"
                        starDimension="20px"
                        starSpacing="3px"
                    />
                </div>

                <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Write your comment here..."
                    className="w-full h-24 p-3 text-sm border rounded focus:outline-none focus:ring focus:ring-red-300"
                />

                <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={Handleclose}
                        className="bg-gray-200 text-black px-4 py-2 text-sm rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={Handlesubmit}
                        className="bg-red-500 text-white px-4 py-2 text-sm rounded hover:bg-red-600"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Postreview;
