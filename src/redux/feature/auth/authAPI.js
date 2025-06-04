import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "../../../utilis/getBaseURL.js";
import {setToken} from "../../../sessionHelper/sessionHelper.js";
import toast from "react-hot-toast";



const authAPI=createApi({
    reducerPath:'authAPI',
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/api/auth`,
        credentials:'include'
    }),
    tagTypes:['User'],
    endpoints:(builder)=>({
        registerUser:builder.mutation({
            query:(newUser)=>({
                url:'/register',
                method:'POST',
                body:newUser
            })
        }),
        loginUser: builder.mutation({
            query: (credential) => ({
                url: '/login',
                method: 'POST',
                body: credential,
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    setToken(data.token);
                    toast.success("Login successful");
                } catch (err) {
                    toast.error("Login failed");
                }
            }
        }),
        logoutUser:builder.mutation({
            query:()=>({
                url:'/logout',
                method:'POST',
            })
        }),
        GetUser:builder.query({
            query:()=>({
                url:'/alluser',
                method:'GET'
            }),
            refetchOnMount:true,
           invalidateTags: ['User'],
        }),
        GetDeleteUser:builder.mutation({
            query:(id)=>({
                url:`/deleteuser/${id}`,
                method:'DELETE'
            }),
            invalidatesTags: ['User'],
        }),
        GetUpdateUser: builder.mutation({
            query: ({ id, role }) => ({
                url: `/updateuser/${id}`,
                method: 'POST',
               body:{role}
            }),
            invalidateTags: ['User'],
        }),
        GetupdateProfile:builder.mutation({
            query:({id,userdata})=>({
                url:`/updateprofile/${id}`,
                method:'POST',
                body:{userdata},
                credentials:'include'
            }),
            invalidatesTags: ['User'],
        })
    })
})

export const {useLoginUserMutation,useRegisterUserMutation,useLogoutUserMutation,useGetUserQuery,useGetDeleteUserMutation,useGetUpdateUserMutation,useGetupdateProfileMutation}=authAPI;

export default authAPI;