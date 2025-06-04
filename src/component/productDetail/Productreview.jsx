import React, {useState} from "react";
import image from "../../assets/avatar.png"
import StarRatings from "react-star-ratings/build/star-ratings.js";
import { Pen } from 'lucide-react';
import Postreview from "./Postreview.jsx";


const Productreview = ({ReviewProduct}) => {

      const [isModalOpen, setIsModalOpen] = useState(false);
      const HandleModalopen=()=>{
          setIsModalOpen(true);
      }
      const HandleModalclose=()=>{
          setIsModalOpen(false);
      }

    return (
        <div className="max-w-[1400px] mx-auto p-4">
            <h2 className="text-lg font-semibold mb-4">All Comments...</h2>

            {
                ReviewProduct.length > 0 ? (
                    ReviewProduct.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4 bg-white p-4 rounded shadow mb-4">
                            {/* User avatar */}
                            <img
                                src={image}
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full"
                            />

                            {/* Comment Content */}
                            <div className="flex-1">
                                <div>
                                    <h1 className="text-blue-600 font-semibold underline">
                                        {item?.userID?.username}
                                    </h1>
                                    <span className="text-gray-500 text-sm">
                                {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                                </div>

                                <div className="flex items-center text-yellow-500 text-sm mt-1">
                                    <StarRatings
                                        rating={Number(item?.rating) || 0}
                                        starRatedColor="gold"
                                        numberOfStars={5}
                                        name={`rating-${item?._id || index}`}
                                        starDimension="15px"
                                        starSpacing="2px"
                                    />
                                </div>

                                <div className="mt-2 bg-gray-100 p-3 rounded">
                                    <p className="text-sm text-gray-700">
                                        {item?.comment}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : <div>No Comments Found....</div>
            }

            {/* Add Comment Button */}
            <button
                onClick={HandleModalopen}
                className="mt-6 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow cursor-pointer">
                  <Pen className="size-4" />
                Add A Comment
            </button>


            <Postreview Handleclose={HandleModalclose} isModalOpen={isModalOpen}/>
        </div>
    );
};

export default Productreview;
