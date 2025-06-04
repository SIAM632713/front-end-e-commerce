import React from 'react';
import {Link, useParams} from "react-router-dom";
import {useFetchProductbyIDQuery} from "../../redux/feature/Product/productAPI.js";
import Loading from "../loading/Loading.jsx";
import StarRatings from "react-star-ratings/build/star-ratings.js";
import Productreview from "./Productreview.jsx";
import {useDispatch} from "react-redux";
import {addToCart} from "../../redux/feature/Cart/cartSlice.js";

const Productdetail = () => {

   const {id}=useParams()
    const {data:{data:productData}={},isLoading, error}=useFetchProductbyIDQuery(id)
    const Singleproduct=productData ?.Singleproduct
    const singleReview=productData ?.singleReview

    if (isLoading)  return <div className="flex justify-center mt-10">
        <Loading/>
    </div>


    const dispatch = useDispatch();

    const HandleaddToCart=(product)=>{
        dispatch(addToCart(product));
    }

    return (
        <>
            <section>
                <div className="max-w-[1400px] mx-auto bg-[#F8E9EF] p-20 text-center rounded-xl space-y-4">
                    <h1 className="text-3xl font-bold">Single Product Page</h1>
                    <p className="space-x-3 text-sm text-gray-500">
                        <span><Link to="/">Home</Link> ></span>
                        <span><Link to="/shop">Shop</Link> ></span>
                        <span>{Singleproduct?.name}</span>
                    </p>
                </div>
            </section>

            <section>
                <div
                    className="max-w-[1400px] mx-auto flex items-center justify-start gap-10 p-8 ">
                    <div className="flex-shrink-0">
                        <img
                            src={Singleproduct?.image}
                            alt={Singleproduct?.name}
                            className="max-w-[550px] object-contain rounded-md border border-gray-200"
                        />
                    </div>
                    <div className="space-y-4 max-w-xl">
                        <h1 className="text-3xl font-bold text-gray-900">{Singleproduct?.name}</h1>
                        <h2 className="text-2xl font-semibold text-red-600">${Singleproduct?.price} {Singleproduct?.oldPrice && <strike>${Singleproduct?.oldPrice}</strike>}</h2>
                        <p className="text-gray-700">{Singleproduct?.description}</p>
                        <h3 className="font-bold">Category: <span className="font-normal">{Singleproduct?.category}</span></h3>
                        <h3 className="font-bold text-gray-800">Color: <span className="font-normal">{Singleproduct?.color}</span></h3>
                        <h3 className="font-bold text-gray-800 space-x-1">
                            <span>Rating :</span>
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
                            className="mt-4 px-6 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors duration-300 cursor-pointer">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </section>


            <section>
                <Productreview ReviewProduct={singleReview}/>
            </section>
        </>
    );
};

export default Productdetail;