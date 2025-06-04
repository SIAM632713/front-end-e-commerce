import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {getBaseURL} from "../../../utilis/getBaseURL.js";


const reviewAPI=createApi({
    reducerPath:'reviewAPI',
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/api/review`,
        credentials:'include'
    }),
    tagTypes:['Reviews'],
    endpoints:(builder)=>({
        postReview:builder.mutation({
            query:(reviewData)=>({
                url:`/reviewpost`,
                method:"POST",
                body:reviewData
            }),
            invalidatesTags:['Reviews'],
        }),
        getReviewCount:builder.mutation({
            query:()=>({
                url:`/countReviews`,
                method:"POST",
            })
        }),
        getReviewByUserId:builder.query({
            query:(userID)=>({
                url:`/getreviews/${userID}`,
                method:"GET",
            })
        }),
        providesTags: (result) => result ? [{type: "Reviews", id: result[0]?.email}] : []
    })
})

export const {
    usePostReviewMutation,
    useGetReviewCountMutation,
    useGetReviewByUserIdQuery
} = reviewAPI;
export default reviewAPI