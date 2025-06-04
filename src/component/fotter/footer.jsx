import React from 'react';
import { MapPin } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Phone } from 'lucide-react';
import {Link} from "react-router-dom";
import img1 from "../../assets/instagram-1.jpg"
import img2 from "../../assets/instagram-2.jpg"
import img3 from "../../assets/instagram-3.jpg"
import img4 from "../../assets/instagram-4.jpg"
import img5 from "../../assets/instagram-5.jpg"
import img6 from "../../assets/instagram-6.jpg"

const Footer = () => {
    return (
        <>
         <div className="max-w-[1400px] mx-auto mt-15">
             <div className="flex flex-wrap  items-start justify-between p-5">

                 <div className="space-y-3">
                     <h1 className="text-xl font-semibold">CONTACT INFO</h1>
                     <div className="flex items-center gap-3 mt-4">
                         <MapPin className="text-red-500 w-4 h-4"/>
                         <p className="text-sm text-gray-700">123,London Bridge Street,London</p>
                     </div>
                     <div className="flex items-center gap-3">
                         <Mail className="text-red-500 w-4 h-4"/>
                         <p className="text-sm text-gray-700">support@Lebaba.com</p>
                     </div>
                     <div className="flex items-center gap-3">
                         <Phone className="text-red-500 w-4 h-4"/>
                         <p className="text-sm text-gray-700">(+012) 3456 789</p>
                     </div>
                 </div>
                 <div className="space-y-3">
                     <h1 className="text-xl font-semibold">COMPANY</h1>
                     <li className="text-gray-700 mt-4"><Link to="/">Home</Link></li>
                     <li className="text-gray-700"><Link to="/about-us">About Us</Link></li>
                     <li className="text-gray-700"><Link to="/work-with-us">Work With Us</Link></li>
                     <li className="text-gray-700"><Link to="/our-blog">Our Blog</Link></li>
                     <li className="text-gray-700"><Link to="/terms-&-conditions">Terms & Conditions</Link></li>
                 </div>
                 <div className="space-y-3">
                     <h1 className="text-xl font-semibold">USEFUL LINK</h1>
                     <li className="text-gray-700 mt-4"><Link to="/help">Help</Link></li>
                     <li className="text-gray-700"><Link to="/track-order">Track My Order</Link></li>
                     <li className="text-gray-700"><Link to="/men">Men</Link></li>
                     <li className="text-gray-700"><Link to="/women">Women</Link></li>
                     <li className="text-gray-700"><Link to="/dresses">Dresses</Link></li>
                 </div>
                 <div className="space-y-3">
                     <h1 className="text-xl font-semibold">INSTAGRAM</h1>
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                         <img src={img1} alt="image" className="w-15 h-15"/>
                         <img src={img2} alt="image" className="w-15 h-15"/>
                         <img src={img3} alt="image" className="w-15 h-15"/>
                         <img src={img4} alt="image" className="w-15 h-15"/>
                         <img src={img5} alt="image" className="w-15 h-15"/>
                         <img src={img6} alt="image" className="w-15 h-15"/>
                     </div>
                 </div>
             </div>
         </div>
        </>
    );
};

export default Footer;