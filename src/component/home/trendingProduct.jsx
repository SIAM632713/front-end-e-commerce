import React, { useState } from 'react';
import StarRatings from "react-star-ratings/build/star-ratings";
import { ShoppingCart } from 'lucide-react';
import {useDispatch} from "react-redux";
import {addToCart} from "../../redux/feature/Cart/cartSlice.js";
import {useAllProductsQuery} from "../../redux/feature/Product/productAPI.js";
import Loading from "../loading/Loading.jsx";
import {Link} from "react-router-dom";


const TrendingProduct = () => {

    const dispatch = useDispatch();
    const HandleaddToCart = (product) => {
        dispatch(addToCart(product));
    }


    const { data, error, isLoading } = useAllProductsQuery();
   const productData=data?.data || []

    const [VisibleProduct, setVisibleProduct] = useState(8);

    const HandleClick = () => {
        setVisibleProduct(prev=>prev + 4)
    }

    if (isLoading) {
        return <div className="flex justify-center mt-10">
            <Loading/>
        </div>
    }

    return (
        <div className="mt-20">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col items-center justify-center space-y-3">
                    <h1 className="text-4xl font-semibold">Trending Products</h1>
                    <p className="text-sm mx-auto max-w-md text-center text-gray-500">
                        Discover the Hottest Picks: Elevate Your Style with Our Curated Collection of Trending Women's
                        Fashion Products.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
                    {productData.slice(0, VisibleProduct).map((item, index) => (
                        <div key={index} className="relative">
                            {/* Image with shopping cart on top */}
                            <div className="relative">
                                <img src={item.image} alt="img" className="w-full h-50 "/>
                                <div className="absolute top-3 right-3 bg-white p-1 rounded-full shadow">
                                    <ShoppingCart onClick={() => HandleaddToCart(item)} className="text-pink-500 cursor-pointer"/>
                                </div>
                            </div>

                            {/* Product details */}
                            <Link to={`/shope/${item._id}`}>
                                <div className="mt-3">
                                <h1 className="text-center text-xl font-bold">{item.name}</h1>
                                    <h1 className="text-center font-semibold">${item.price}</h1>
                                    <div className="flex justify-center">
                                        <StarRatings
                                            rating={item.rating}
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
                    ))}
                </div>

                <div className="flex items-center justify-center mt-5">
                    {
                        VisibleProduct < productData.length && <button onClick={HandleClick}
                                                                       className="px-4 py-2 bg-red-500 text-white text-sm rounded-md cursor-pointer"> Load
                            More</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default TrendingProduct;
