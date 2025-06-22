import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {getBaseURL} from "../../../utilis/getBaseURL.js";


const productAPI=createApi({
    reducerPath:'productAPI',
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/api/product`,
        credentials:'include'
    }),
    tagTypes:['Products'],

    endpoints:(builder)=>({
        fetchAllProducts:builder.query({
            query:({category,color,minPrice,maxPrice,page=1,limit=10})=>{
                const queryParams=new URLSearchParams({
                    category:category || '',
                    color:color || '',
                    minPrice:minPrice || 0,
                    maxPrice:maxPrice || 999999,
                    page:page.toString(),
                    limit:limit.toString(),
                })
                return `/getAll-Product?${queryParams}`
            },
            providesTags:['Products'],
        }),
        AllProducts:builder.query({
           query:()=>{
               return `/All-product`
           },
            providesTags:['Products'],
        }),
        fetchProductCategories:builder.query({
            query:(category)=>{
                return `/product-category/${category}`
            },
            providesTags:(result,error,id)=>[{type:'Products',id}]
        }),
        fetchProductbyID:builder.query({
            query:(id)=>`/getsingle-product/${id}`,
            providesTags:(result,error,id)=>[{type:'Products',id}]
        }),
        AddProduct:builder.mutation({
            query:(newProduct)=>({
                url:`/creat-product`,
                method:'POST',
                body:newProduct,
                credentials:'include'
            }),
            invalidatesTags:['Products'],
        }),
        updateProduct:builder.mutation({
            query:({id,newdata})=>({
              url:`/update-product/${id}`,
                method:'PUT',
                body:newdata,
                credentials:'include'
            }),
            invalidatesTags:['Products'],
        }),
        deleteProduct:builder.mutation({
            query:(id)=>({
                url:`/delete-product/${id}`,
                method:'DELETE',
                credentials:'include'
            }),
            invalidatesTags:(result,error,id)=>[{type:'Products',id}]
        })
    })
})

export const {
    useFetchAllProductsQuery,
    useFetchProductCategoriesQuery,
    useFetchProductbyIDQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useAllProductsQuery,
} = productAPI;

export default productAPI