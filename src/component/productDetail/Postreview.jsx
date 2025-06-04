import React, {useState} from 'react';
import StarRatings from "react-star-ratings/build/star-ratings";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useFetchProductbyIDQuery} from "../../redux/feature/Product/productAPI.js";
import {usePostReviewMutation} from "../../redux/feature/Reviews/ReviewAPI.js";
import toast from "react-hot-toast";

const Postreview = ({isModalOpen,Handleclose}) => {

   if(!isModalOpen) return null;

   const navigate = useNavigate();
   const {id}=useParams();
   const {user}=useSelector((state)=>state.auth);
   const {refetch}=useFetchProductbyIDQuery(id,{skip:!id});

   const [ratings, setRatings] = useState(0);
   const [comments, setComments] = useState('');

    const handleRating = (value) => {
        console.log("User selected rating:", value);
        setRatings(value);
    };


   const [reviewData]=usePostReviewMutation()

    const Handlesubmit=async (e)=>{
       e.preventDefault();

        if (ratings === 0) {
            alert("Please select a rating.");
            return;
        }

       const newReview={
           comment:comments,
           rating:ratings,
           userID:user?._id,
           productID:id
       }

        if(!user){
            alert("Please login first.");
            navigate("/login");
            return;
        }

       try{
           const result=await reviewData(newReview)
           console.log(result)
           toast.success("Review posted successfully!")
           setRatings(0)
           setComments('')
           refetch()
       }catch(err){
           alert("Error posting review")
       }
        Handleclose();
    }



    return (
        <div className="fixed inset-0 backdrop-brightness-25 bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h3 className="text-lg font-semibold mb-2">Post a Review</h3>

                <div className="mb-2">
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
                    onChange={(e)=>setComments(e.target.value)}
                    placeholder="Write your comment here..."
                    className="w-full h-24 p-2 border rounded focus:outline-none focus:ring"
                />

                <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={Handleclose}
                        className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={Handlesubmit}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Postreview;