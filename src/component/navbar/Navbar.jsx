import React, { useState } from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import { Search, ShoppingBag, User } from 'lucide-react';
import {useDispatch, useSelector} from 'react-redux';
import {useLogoutUserMutation} from "../../redux/feature/auth/authAPI.js";
import {logOutUser} from "../../redux/feature/auth/authSlice.jsx";
import Cartmodal from "../shop/Cartmodal.jsx";
import {getToken, removeToken} from "../../sessionHelper/sessionHelper.js";

const Navbar = () => {
    const Products=useSelector((state) => state.cart.products)

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const token=getToken();


    const [isCartOpen, setIsCartOpen] = useState(false);
    const handleCartOpen = () => {
        setIsCartOpen(true)
    }
    const handleCartClose = () => {
        setIsCartOpen(false)
    }


    const [logoutUser]=useLogoutUserMutation()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout =async () => {
        try{
            await logoutUser().unwrap();
            dispatch(logOutUser());
            removeToken();
            navigate('/login')
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div>
            <div className="max-w-[1400px] mx-auto p-5 flex items-center justify-between">
                <div className="hidden lg:flex items-center gap-8 font-semibold">
                    <NavLink className={({ isActive }) => isActive ? "text-[#ed3849]" : ""} to="/">Home</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "text-[#ed3849]" : ""} to="/shope">Shop</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "text-[#ed3849]" : ""} to="/page">Page</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "text-[#ed3849]" : ""} to="/contact">Contact</NavLink>
                </div>

                {/* Logo */}
                <div className="text-3xl font-bold">
                    <h1>Aurellia</h1>
                </div>

                {/* Icons */}
                <div className="hidden lg:flex items-center gap-7 relative">
                    <Search className="cursor-pointer w-5 h-5"/>
                    <div className="relative cursor-pointer w-fit">
                        <ShoppingBag onClick={handleCartOpen} className="w-5 h-5 text-black"/>
                        {
                            Products.length > 0 && (
                                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-1 rounded-full">
                        {Products.length}
                    </span>
                            )
                        }
                    </div>
                    {
                        token ? (
                            <>
                                <Link to={user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user"}>
                                    <button className="font-semibold transition cursor-pointer">Dashboard</button>
                                </Link>
                                <button onClick={handleLogout} className="font-semibold transition cursor-pointer">Logout</button>
                            </>
                        ) : (
                            <Link to="/login">
                                <button className="font-semibold transition cursor-pointer">Login</button>
                            </Link>
                        )
                    }
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 rounded hover:bg-gray-100 transition"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="lg:hidden px-4 pb-4">
                    <div className="flex flex-col gap-3 font-medium">
                        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <Link to="/shope" onClick={() => setIsMenuOpen(false)}>Shop</Link>
                        <Link to="/page" onClick={() => setIsMenuOpen(false)}>Page</Link>
                        <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                    </div>
                    <div className="flex flex-col gap-4 mt-4">
                        {/* Utility Icons */}
                        <div className="flex items-center gap-4">
                            <Search className="cursor-pointer"/>
                            <div className="relative cursor-pointer w-fit">
                                <ShoppingBag onClick={handleCartOpen} className="w-5 h-5 text-black"/>
                                {Products.length > 0 && (
                                    <span
                                        className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-1 rounded-full">
                    {Products.length}
                </span>
                                )}
                            </div>
                        </div>

                        {/* Auth Controls */}
                        <div className="flex flex-col gap-2 mt-4">
                            {token ? (
                                <>
                                    <Link
                                        to={user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user"}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="font-semibold hover:text-red-500 transition"
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="font-semibold hover:text-red-500 transition text-left"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link to="/login" onClick={() => setIsMenuOpen(false)}
                                      className="flex items-center gap-2">
                                    <User className="w-5 h-5"/>
                                    <span className="font-semibold hover:text-red-500 transition">Login</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {
                isCartOpen && <Cartmodal products={Products} isCartOpen={isCartOpen} handleCartClose={handleCartClose}/>
            }
        </div>
    );
};

export default Navbar;
