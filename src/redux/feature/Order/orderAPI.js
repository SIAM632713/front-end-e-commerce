import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {getBaseURL} from "../../../utilis/getBaseURL.js";


const orderAPI=createApi({
    reducerPath:'orderAPI',
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/api/order`,
        credentials:'include'
    }),
    tagTypes:['Order'],

    endpoints:(builder)=>({
        GetOrderByEmail:builder.query({
            query:(email)=>{
                return `/get-orderbyemail/${email}`
            },
            providesTags:(result,error,email)=>[{type:'Order',email}]
        }),
        GetOrderByID:builder.query({
            query:(id)=>{
                return `/get-orderbyid/${id}`
            },
            providesTags:(result,error,id)=>[{type:'Order',id:id}]
        }),
        GetAllOrder:builder.query({
            query:()=>{
                return `/get-allorder`
            },
            providesTags:(result,error)=>[{type:'Order'}]
        }),
        UpdateOrderStatus:builder.mutation({
            query:({status, id})=>({
                url:`/updateorder/${id}`,
                method:'POST',
                body: {status},
                credentials:'include'
            }),
            invalidatesTags:['Order']
        }),
        DeleteOrderByID:builder.mutation({
            query:(id)=>({
                url:`/deleteorder/${id}`,
                method:'POST',
                credentials:'include'
            }),
            invalidatesTags:['Order']
        })
    })
})

export const {useDeleteOrderByIDMutation,
    useUpdateOrderStatusMutation,
    useGetAllOrderQuery,
    useGetOrderByIDQuery,
    useGetOrderByEmailQuery}=orderAPI
export default orderAPI;