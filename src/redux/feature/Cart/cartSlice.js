import {createSlice} from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    products: [],
    selectedItem:0,
    totalPrice: 0,
}

const calculateCarttotal=(products)=>{
    const selectedItem=products.reduce((total,product)=>total+product.quantity,0);
    const totalPrice=products.reduce((total,product)=>total+product.quantity*product.price,0);

    return {selectedItem,totalPrice};
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const isExist=state.products.find(product=>product._id===action.payload._id);
            if(!isExist){
                state.products.push({...action.payload,quantity:1});
                toast.success("Product added successfully!");
            }else {
                toast.error("Product already Added to Cart")
            }
            const totals=calculateCarttotal(state.products)
            state.selectedItem=totals.selectedItem
            state.totalPrice=totals.totalPrice
        },

        UpdateQuantity: (state, action) => {
            const product=state.products.find((item)=>item._id===action.payload.id)
            if(product){
                if(action.payload.type === "increment"){
                    product.quantity +=1
                } else if(action.payload.type === "decrement" &&  product.quantity >1){
                    product.quantity -=1
                }
            }
            const totals=calculateCarttotal(state.products)
            state.selectedItem=totals.selectedItem
            state.totalPrice=totals.totalPrice
        },
        removeQuantity:(state, action) => {
            state.products=state.products.filter(product=>product._id !== action.payload.id)
            const totals=calculateCarttotal(state.products)
            state.selectedItem=totals.selectedItem
            state.totalPrice=totals.totalPrice
        },
        Clearcart:(state) => {
            Object.assign(state,initialState)
        }
    }
})


export const {addToCart,UpdateQuantity,removeQuantity,Clearcart}=cartSlice.actions;
export default cartSlice.reducer;