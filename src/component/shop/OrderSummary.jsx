import React from 'react';
import { Trash2, ShoppingCart } from 'lucide-react';
import {useDispatch, useSelector} from "react-redux";
import {Clearcart} from "../../redux/feature/Cart/cartSlice.js";
import {loadStripe} from "@stripe/stripe-js";
import axios from "axios";
import {getBaseURL} from "../../utilis/getBaseURL.js";

const OrderSummary = () => {

    const { products,selectedItem,totalPrice,}=useSelector((state)=>state.cart);
    const dispatch = useDispatch();
    const Handleclear=()=>{
        dispatch(Clearcart())
    }

    const {user}=useSelector((state)=>state.auth)

    const HandlePayment=async (e)=>{
        const stripe=await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
        const body={
            products:products,
            userID:user?._id
        }
        try {
            const response=await axios.post(`${getBaseURL()}/api/order/create-checkout-session`,body,{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const result=stripe.redirectToCheckout({
                sessionId:response.data.id
            })
            if(result.error){
                console.error("Error redirecting to checkout", result.error)
                return;
            }
        }catch(error){
            console.log("Error redirecting to checkout",error)
        }
    }

    return (
        <div className="bg-pink-100 p-6 rounded-lg shadow-sm w-full mx-auto mt-5">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            <p className="text-sm text-gray-700 mb-1">Selected Items : {selectedItem}</p>
            <p className="text-sm text-gray-700 mb-4">Total Price :${totalPrice.toFixed(2)}</p>

            <div className="flex gap-3">
                <button
                    onClick={Handleclear}
                    className="bg-red-500 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-red-600 cursor-pointer"
                >
                    Clear Cart <Trash2 size={16} />
                </button>

                <button
                    onClick={(e)=>{e.stopPropagation(),HandlePayment()}}
                    className="bg-green-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-green-700 cursor-pointer"
                >
                    Proceed Checkout <ShoppingCart size={16} />
                </button>
            </div>
        </div>
    );
};

export default OrderSummary;
