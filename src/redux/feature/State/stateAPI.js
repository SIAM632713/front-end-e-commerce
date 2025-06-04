import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {getBaseURL} from "../../../utilis/getBaseURL.js";


const stateAPI=createApi({
    reducerPath:['stateAPI'],
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/api/state`,
        credentials:'include'
    }),
    tagTypes:['state'],

    endpoints:(builder)=>({
        Adminstate:builder.query({
            query:()=>{
                return  `/admin-state`
            },
            providesTags:(result,error)=>[{type:'state'}]
        }),
        Userstate:builder.query({
            query:(email)=>{
                return  `/user-state/${email}`
            },
            providesTags:(result,error,email)=>[{type:'state',email}]
        })
    })
})

export const {useAdminstateQuery,useUserstateQuery}=stateAPI
export default stateAPI