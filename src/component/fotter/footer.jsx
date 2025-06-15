import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import { Link } from "react-router-dom";
import img1 from "../../assets/instagram-1.jpg";
import img2 from "../../assets/instagram-2.jpg";
import img3 from "../../assets/instagram-3.jpg";
import img4 from "../../assets/instagram-4.jpg";
import img5 from "../../assets/instagram-5.jpg";
import img6 from "../../assets/instagram-6.jpg";

const Footer = () => {
    return (
        <div className="max-w-[1400px] mx-auto mt-15 px-4 sm:px-6 py-10">
            <div className="flex flex-wrap items-start justify-between gap-y-8 gap-x-6">

                {/* Contact Info */}
                <div className="flex-1 min-w-[220px] space-y-3">
                    <h1 className="text-xl font-semibold">CONTACT INFO</h1>
                    <div className="flex items-center gap-3 mt-4">
                        <MapPin className="text-red-500 w-5 h-5" />
                        <p className="text-sm text-gray-700">123, London Bridge Street, London</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Mail className="text-red-500 w-5 h-5" />
                        <p className="text-sm text-gray-700">support@Lebaba.com</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="text-red-500 w-5 h-5" />
                        <p className="text-sm text-gray-700">(+012) 3456 789</p>
                    </div>
                </div>

                {/* Company */}
                <div className="flex-1 min-w-[150px] space-y-3">
                    <h1 className="text-xl font-semibold">COMPANY</h1>
                    <ul className="mt-4 space-y-2">
                        <li className="text-gray-700"><Link to="/">Home</Link></li>
                        <li className="text-gray-700"><Link to="/about-us">About Us</Link></li>
                        <li className="text-gray-700"><Link to="/work-with-us">Work With Us</Link></li>
                        <li className="text-gray-700"><Link to="/our-blog">Our Blog</Link></li>
                        <li className="text-gray-700"><Link to="/terms-&-conditions">Terms & Conditions</Link></li>
                    </ul>
                </div>

                {/* Useful Links */}
                <div className="flex-1 min-w-[150px] space-y-3">
                    <h1 className="text-xl font-semibold">USEFUL LINK</h1>
                    <ul className="mt-4 space-y-2">
                        <li className="text-gray-700"><Link to="/help">Help</Link></li>
                        <li className="text-gray-700"><Link to="/track-order">Track My Order</Link></li>
                        <li className="text-gray-700"><Link to="/men">Men</Link></li>
                        <li className="text-gray-700"><Link to="/women">Women</Link></li>
                        <li className="text-gray-700"><Link to="/dresses">Dresses</Link></li>
                    </ul>
                </div>

                {/* Instagram Images */}
                <div className="flex-1 min-w-[220px] space-y-3">
                    <h1 className="text-xl font-semibold">INSTAGRAM</h1>
                    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-3 mt-4">
                        {[img1, img2, img3, img4, img5, img6].map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt={`instagram-${i + 1}`}
                                className="w-full h-20 object-cover rounded-md"
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Footer;
