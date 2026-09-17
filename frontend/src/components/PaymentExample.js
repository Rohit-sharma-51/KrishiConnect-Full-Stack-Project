import React, { useState } from 'react';
import RazorpayPayment from './RazorpayPayment';
import toast from 'react-hot-toast';

const PaymentExample = ({ productDetails, quantity }) => {
    const [orderPlaced, setOrderPlaced] = useState(false);

    const totalAmount = productDetails?.price * quantity || 0;

    const handlePaymentSuccess = async (paymentResponse) => {
        try {
            console.log('Payment successful:', paymentResponse);


            setOrderPlaced(true);
            toast.success('Order placed successfully!');

        } catch (error) {
            console.error('Error updating order:', error);
            toast.error('Payment successful but order update failed. Please contact support.');
        }
    };

    const handlePaymentFailure = (error) => {
        console.error('Payment failed:', error);
        toast.error('Payment failed. Please try again.');
    };

    if (orderPlaced) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="text-green-600 text-5xl mb-4">✓</div>
                <h2 className="text-2xl font-bold text-green-800 mb-2">Order Placed Successfully!</h2>
                <p className="text-gray-600">Your payment has been processed and order is confirmed.</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Your Purchase</h2>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Order Summary</h3>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Product:</span>
                        <span className="font-medium">{productDetails?.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Quantity:</span>
                        <span className="font-medium">{quantity} {productDetails?.unit}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Price per unit:</span>
                        <span className="font-medium">₹{productDetails?.price}</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total Amount:</span>
                            <span className="text-green-600">₹{totalAmount}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                        <p className="text-sm text-blue-800 font-medium">Secure Payment</p>
                        <p className="text-xs text-blue-600 mt-1">
                            Your payment is secured by Razorpay. We accept UPI, Cards, Net Banking, and Wallets.
                        </p>
                    </div>
                </div>
            </div>

            {/* Payment Button */}
            <RazorpayPayment
                amount={totalAmount}
                orderId={`order_${Date.now()}`}
                buttonText={`Pay ₹${totalAmount}`}
                onSuccess={handlePaymentSuccess}
                onFailure={handlePaymentFailure}
            />

            {/* Terms */}
            <p className="text-xs text-gray-500 text-center mt-4">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy.
            </p>
        </div>
    );
};

export default PaymentExample;
