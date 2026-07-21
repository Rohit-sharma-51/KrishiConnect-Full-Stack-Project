import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const RazorpayPayment = ({ amount, orderId, onSuccess, onFailure, buttonText = 'Pay Now' }) => {
    const [loading, setLoading] = useState(false);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        try {
            setLoading(true);

            // Load Razorpay script
            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) {
                toast.error('Failed to load Razorpay SDK. Please check your internet connection.');
                setLoading(false);
                return;
            }

            // Get token from localStorage
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please login to continue');
                setLoading(false);
                return;
            }

            // Create order on backend
            const API_URL = process.env.REACT_APP_API_URL;
            const { data } = await axios.post(
                `${API_URL}/api/payment/create-order`,
                {
                    amount: amount,
                    currency: 'INR',
                    receipt: orderId || `receipt_${Date.now()}`,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!data.success) {
                toast.error('Failed to create order');
                setLoading(false);
                return;
            }

            // Razorpay options
            const options = {
                key: data.key_id || process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: data.order.amount,
                currency: data.order.currency,
                name: 'KrishiConnect',
                description: 'Agricultural Product Payment',
                order_id: data.order.id,
                handler: async function (response) {
                    try {
                        // Verify payment on backend
                        const verifyResponse = await axios.post(
                            `${API_URL}/api/payment/verify`,
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );

                        if (verifyResponse.data.success) {
                            toast.success('Payment successful!');
                            if (onSuccess) {
                                onSuccess(verifyResponse.data);
                            }
                        } else {
                            toast.error('Payment verification failed');
                            if (onFailure) {
                                onFailure(verifyResponse.data);
                            }
                        }
                    } catch (error) {
                        console.error('Payment verification error:', error);
                        toast.error('Payment verification failed');
                        if (onFailure) {
                            onFailure(error);
                        }
                    } finally {
                        setLoading(false);
                    }
                },
                prefill: {
                    name: localStorage.getItem('userName') || '',
                    email: localStorage.getItem('userEmail') || '',
                    contact: localStorage.getItem('userPhone') || '',
                },
                theme: {
                    color: '#047857', // KrishiConnect green color
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                        toast.info('Payment cancelled');
                        if (onFailure) {
                            onFailure({ message: 'Payment cancelled by user' });
                        }
                    },
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error('Payment error:', error);
            toast.error('Failed to initiate payment');
            setLoading(false);
            if (onFailure) {
                onFailure(error);
            }
        }
    };

    return (
        <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition duration-300 text-lg font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-green-700 hover:to-green-800'
                }`}
        >
            {loading ? (
                <span className="flex items-center justify-center">
                    <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    Processing...
                </span>
            ) : (
                buttonText
            )}
        </button>
    );
};

export default RazorpayPayment;
