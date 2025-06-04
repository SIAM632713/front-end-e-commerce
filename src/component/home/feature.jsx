import React from 'react';
import { Truck } from 'lucide-react';
import { CircleDollarSign } from 'lucide-react';
import { SmartphoneNfc } from 'lucide-react';

const Feature = () => {
    return (
        <div className="max-w-[1400px] mx-auto mt-20">
            <div className="flex item-center justify-between">
                <div className="item-center text-center space-y-2">
                    <Truck className="text-red-500 mx-auto"/>
                    <h1 className="text-xl font-semibold">Free Delivery</h1>
                    <p className="text-sm text-gray-500 max-w-sm mx-auto">Offers convenience and the ability to shop
                        from anywhere, anytime.</p>
                </div>
                <div className="item-center text-center space-y-2">
                    <CircleDollarSign className="text-red-500 mx-auto"/>
                    <h1 className="text-xl font-semibold">100% Money Back Guaranty</h1>
                    <p className="text-sm text-gray-500 max-w-sm mx-auto">E-commerce have a review system where
                        customers can share feedback.</p>
                </div>
                <div className="item-center text-center space-y-2">
                    <SmartphoneNfc className="text-red-500 mx-auto"/>
                    <h1 className="text-xl font-semibold">Strong Support</h1>
                    <p className="text-sm text-gray-500 max-w-sm mx-auto">Offer customer support services to assist customers with queries and issues.</p>
                </div>
            </div>
        </div>
    );
};

export default Feature;