import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import {useRegisterUserMutation} from "../../redux/feature/auth/authAPI.js";

const Register = () => {
    const [messages, setMessages] = useState();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [registerUser,{isloading}]=useRegisterUserMutation()
    const navigate = useNavigate();

    const onSubmit =async (data) =>{
        try{
            const response = await registerUser(data).unwrap()
                alert("Registration successfully")
            // toast.success("Registration successfully")
            navigate('/login')
        }catch(err){
            console.log(err)
            setMessages("Please provide a valid email")
        }
    }

    return (
        <>
            <div className="flex items-center justify-center h-screen p-5 bg-gray-50">
                <div className="border border-gray-300 shadow-md p-6 rounded-lg w-full max-w-sm bg-white">
                    <h1 className="text-xl font-semibold text-center text-gray-700 mb-4">Please Register</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <input
                                {...register("username", {required: "username is required"})}
                                placeholder="username"
                                type="text"
                                className="bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-300 px-5 py-2 w-full rounded-md"
                            />
                            {errors.username && (
                                <span className="text-sm text-red-500 mt-1">{errors.username.message}</span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <input
                                {...register("email", {required: "Email is required"})}
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
                                {...register("password", {required: "Password is required"})}
                                placeholder="Password"
                                type="password"
                                className="bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-300 px-5 py-2 w-full rounded-md"
                            />
                            {errors.password && (
                                <span className="text-sm text-red-500 mt-1">{errors.password.message}</span>
                            )}
                        </div>

                        {messages && <p className="text-sm text-red-500">{messages}</p>}
                        <button
                            type="submit"
                            className="w-full py-2 text-white bg-red-500 hover:bg-red-600 rounded-md cursor-pointer mt-2">
                            Register
                        </button>
                    </form>

                    <div className="text-sm text-center text-gray-600 mt-4">
                       have an account? Please
                        <Link to="/login" className="text-red-500 underline ml-1 hover:text-red-600">
                            Login
                        </Link> here
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;