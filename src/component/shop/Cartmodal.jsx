import React from 'react';
import { X, Plus, Minus } from 'lucide-react';
import OrderSummary from "./OrderSummary.jsx";
import {useDispatch} from "react-redux";
import {removeQuantity, UpdateQuantity} from "../../redux/feature/Cart/cartSlice.js";

const Cartmodal = ({ products, isCartOpen, handleCartClose }) => {

    const dispatch = useDispatch();
    const HnadleupdateQuantity=(type,id)=>{
        const playload={type,id}
        dispatch(UpdateQuantity(playload))
    }
    const HandleremoveQuantity=(e,id)=>{
        e.preventDefault();
        dispatch(removeQuantity({id}))
    }

    if (!isCartOpen) return null;

    return (
        <div className="fixed top-0 right-0 w-full max-w-lg h-full bg-white shadow-xl z-50 p-6 overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-4 mb-6">
                <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
                <button onClick={handleCartClose} className="text-gray-700 hover:text-black cursor-pointer">
                    <X size={22} />
                </button>
            </div>

            {/* Cart Items */}
            {products.length === 0 ? (
                <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
            ) : (
                <div className="space-y-4">
                    {products.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white shadow-sm ">
                            {/* Left: Number + Image */}
                            <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                                    {String(index + 1).padStart(2, '0')}
                                </div>
                                <img
                                    src={item?.image}
                                    alt={item?.name}
                                    className="w-14 h-14 object-cover rounded-md border"
                                />
                                <div className="flex flex-col justify-center">
                                    <h3 className="text-sm font-semibold text-gray-800">{item?.name}</h3>
                                    <p className="text-sm text-gray-500">${item?.price} {item?.oldPrice && <strike>${item?.oldPrice}</strike>}</p>
                                </div>
                            </div>

                            {/* Right: Quantity + Remove */}
                            <div className="flex  items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <button onClick={()=>HnadleupdateQuantity('decrement',item?._id)}
                                        className="w-6 h-6 flex items-center justify-center border rounded hover:bg-gray-100"
                                    >
                                        <Minus size={12} />
                                    </button>
                                    <span className="text-sm font-medium px-2">{item?.quantity}</span>
                                    <button onClick={()=>HnadleupdateQuantity('increment',item?._id)}
                                        className="w-6 h-6 flex items-center justify-center border rounded hover:bg-gray-100"
                                    >
                                        <Plus size={12} />
                                    </button>
                                </div>
                                <button onClick={(e)=>HandleremoveQuantity(e,item?._id)}
                                    className="font-semibold text-red-500 hover:underline cursor-pointer"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {
                products.length > 0 && <OrderSummary/>
            }
        </div>
    );
};

export default Cartmodal;
