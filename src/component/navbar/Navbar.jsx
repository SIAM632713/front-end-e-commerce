import React, { useState } from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import { Search, ShoppingBag, User } from 'lucide-react';
import {useDispatch, useSelector} from 'react-redux';
import avater from "../../assets/avatar.png";
import {useLogoutUserMutation} from "../../redux/feature/auth/authAPI.js";
import {logOutUser} from "../../redux/feature/auth/authSlice.jsx";
import Cartmodal from "../shop/Cartmodal.jsx";
import {getToken, removeToken} from "../../sessionHelper/sessionHelper.js";

const Navbar = () => {
    const Products=useSelector((state) => state.cart.products)

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const [Isdropdown, setIsdropdown] = useState(false);
    const token=getToken();

    const handletoggle = () => {
        setIsdropdown(!Isdropdown);
    };

    const [isCartOpen, setIsCartOpen] = useState(false);
    const handleCartOpen = () => {
        setIsCartOpen(true)
    }
    const handleCartClose = () => {
        setIsCartOpen(false)
    }


    const UserdropdownMenu = [
        { label: "Dashboard", path: "/dashboard/user" },
        { label: "Order", path: "/dashboard/order" },
        { label: "Payment", path: "/dashboard/payment" },
        { label: "Profile", path: "/dashboard/profile" },
        { label: "Review", path: "/dashboard/review" },
    ];

    const AdmindropdownMenu = [
        { label: "Dashboard", path: "/dashboard/admin" },
        { label: "Add Product", path: "/dashboard/add-product" },
        { label: "Manage Products", path: "/dashboard/manage-product" },
        { label: "Users", path: "/dashboard/user-manage" },
        { label: "Manage Orders", path: "/dashboard/manage-order" },
    ];

    const DropdownMenu = user?.role === "admin" ? [...AdmindropdownMenu] : [...UserdropdownMenu];


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
                                <img
                                    onClick={handletoggle}
                                    src={user?.profileImage || avater}
                                    className="size-6 rounded-full cursor-pointer"
                                />
                                {Isdropdown && (
                                    <div
                                        className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                                        <ul className="py-2">
                                            {DropdownMenu.map((item, index) => (
                                                <li key={index}>
                                                    <Link
                                                        to={item.path}
                                                        className="block px-4 py-2 text-gray-700 hover:text-red-500 text-sm font-medium dropdown-items"
                                                    >
                                                        {item.label}
                                                    </Link>
                                                </li>
                                            ))}
                                            <li>
                                                <Link onClick={handleLogout}
                                                      className="block px-4 py-2 text-gray-700 hover:text-red-500 text-sm font-medium dropdown-items">Logout</Link>
                                            </li>
                                        </ul>
                                    </div>

                                )}
                            </>
                        ) : (
                            <Link to="/login">
                                <User className="cursor-pointer w-5 h-5"/>
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
                        <Link to="/home" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <Link to="/shope" onClick={() => setIsMenuOpen(false)}>Shop</Link>
                        <Link to="/page" onClick={() => setIsMenuOpen(false)}>Page</Link>
                        <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <Search className="cursor-pointer"/>
                        <div className="relative cursor-pointer w-fit">
                            <ShoppingBag onClick={handleCartOpen} className="w-5 h-5 text-black"/>
                            {
                                Products.length > 0 && (
                                    <span
                                        className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-1 rounded-full">
                        {Products.length}
                    </span>
                                )
                            }
                        </div>
                        {
                            token ? (
                                <>
                                    <img
                                        onClick={handletoggle}
                                        src={user?.profileImage || avater}
                                        className="size-6 rounded-full cursor-pointer"
                                    />
                                    {Isdropdown && (
                                        <div
                                            className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                                            <ul className="py-2">
                                                {DropdownMenu.map((item, index) => (
                                                    <li key={index}>
                                                        <Link
                                                            to={item.path}
                                                            className="block px-4 py-2 text-gray-700 hover:text-red-500 text-sm font-medium dropdown-items"
                                                        >
                                                            {item.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                                <li>
                                                    <Link onClick={handleLogout}
                                                          className="block px-4 py-2 text-gray-700 hover:text-red-500 text-sm font-medium dropdown-items">Logout</Link>
                                                </li>
                                            </ul>
                                        </div>

                                    )}
                                </>
                            ) : (
                                <Link to="/login">
                                    <User className="cursor-pointer w-5 h-5"/>
                                </Link>
                            )
                        }
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
