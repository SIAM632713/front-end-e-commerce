import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "../../redux/feature/auth/authAPI.js";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/feature/auth/authSlice.jsx";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState();

    const [loginUser, { isLoading, error }] = useLoginUserMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        try {
            const response = await loginUser(data).unwrap();
            const {token,user}=response;
            dispatch(setUser({user}));
            navigate('/');
        } catch (err) {
            setMessage("Please provide valid email and password")
        }
    };


    return (
        <>
            <div className="flex items-center justify-center h-screen p-5 bg-gray-50">
                <div className="border border-gray-300 shadow-md p-6 rounded-lg w-full max-w-sm bg-white">
                    <h1 className="text-xl font-semibold text-center text-gray-700 mb-4">Please Login</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <input
                                {...register("email", { required: "Email is required" })}
                                placeholder="Email"
                                type="email"
                                className="bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-300 px-5 py-2 w-full rounded-md"
                            />
                            {errors.email && (
                                <span className="text-sm text-red-500 mt-1">{errors.email.message}</span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <input
                                {...register("password", { required: "Password is required" })}
                                placeholder="Password"
                                type="password"
                                className="bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-300 px-5 py-2 w-full rounded-md"
                            />
                            {errors.password && (
                                <span className="text-sm text-red-500 mt-1">{errors.password.message}</span>
                            )}
                        </div>

                        {message && <p className="text-sm text-red-500">{message}</p>}
                        <button
                            type="submit"
                            className="w-full py-2 text-white bg-red-500 hover:bg-red-600 rounded-md cursor-pointer mt-2">
                            Login
                        </button>
                    </form>

                    <div className="text-sm text-center text-gray-600 mt-4">
                        Don't have an account?
                        <Link to="/register" className="text-red-500 underline ml-1 hover:text-red-600">
                            Register
                        </Link> here
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
