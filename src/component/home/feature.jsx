import React from 'react';
import { Truck, CircleDollarSign, SmartphoneNfc } from 'lucide-react';

const Feature = () => {
    return (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">

                {/* Feature 1 */}
                <div className="space-y-2">
                    <Truck className="text-red-500 mx-auto w-10 h-10" />
                    <h1 className="text-lg sm:text-xl font-semibold">Free Delivery</h1>
                    <p className="text-sm text-gray-500 max-w-xs mx-auto">
                        Offers convenience and the ability to shop from anywhere, anytime.
                    </p>
                </div>

                {/* Feature 2 */}
                <div className="space-y-2">
                    <CircleDollarSign className="text-red-500 mx-auto w-10 h-10" />
                    <h1 className="text-lg sm:text-xl font-semibold">100% Money Back Guarantee</h1>
                    <p className="text-sm text-gray-500 max-w-xs mx-auto">
                        E-commerce has a review system where customers can share feedback.
                    </p>
                </div>

                {/* Feature 3 */}
                <div className="space-y-2">
                    <SmartphoneNfc className="text-red-500 mx-auto w-10 h-10" />
                    <h1 className="text-lg sm:text-xl font-semibold">Strong Support</h1>
                    <p className="text-sm text-gray-500 max-w-xs mx-auto">
                        Offer customer support services to assist customers with queries and issues.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Feature;
