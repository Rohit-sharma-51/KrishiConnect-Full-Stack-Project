// // const Razorpay = require('razorpay');
// // const crypto = require('crypto');

// // const razorpay = new Razorpay({
// //     key_id: process.env.RAZORPAY_KEY_ID,
// //     key_secret: process.env.RAZORPAY_KEY_SECRET,
// // });

// const createOrder = async (req, res) => {
//     try {
//         const { amount, currency = 'INR', receipt } = req.body;

//         if (!amount) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Amount is required',
//             });
//         }

//         const options = {
//             amount: amount * 100, // Razorpay expects amount in paise
//             currency,
//             receipt: receipt || `receipt_${Date.now()}`,
//             payment_capture: 1,
//         };

//         const order = await razorpay.orders.create(options);

//         return res.status(200).json({
//             success: true,
//             order,
//             key_id: process.env.RAZORPAY_KEY_ID,
//         });
//     } catch (error) {
//         console.error('Error creating Razorpay order:', error);
//         return res.status(500).json({
//             success: false,
//             message: 'Failed to create order',
//             error: error.message,
//         });
//     }
// };

// const verifyPayment = async (req, res) => {
//     try {
//         const {
//             razorpay_order_id,
//             razorpay_payment_id,
//             razorpay_signature,
//         } = req.body;

//         if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Missing payment verification parameters',
//             });
//         }

//         const sign = razorpay_order_id + '|' + razorpay_payment_id;
//         const expectedSign = crypto
//             .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//             .update(sign.toString())
//             .digest('hex');

//         if (razorpay_signature === expectedSign) {
//             return res.status(200).json({
//                 success: true,
//                 message: 'Payment verified successfully',
//                 paymentId: razorpay_payment_id,
//                 orderId: razorpay_order_id,
//             });
//         } else {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid payment signature',
//             });
//         }
//     } catch (error) {
//         console.error('Error verifying payment:', error);
//         return res.status(500).json({
//             success: false,
//             message: 'Payment verification failed',
//             error: error.message,
//         });
//     }
// };

// const getPaymentDetails = async (req, res) => {
//     try {
//         const { paymentId } = req.params;

//         if (!paymentId) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Payment ID is required',
//             });
//         }

//         const payment = await razorpay.payments.fetch(paymentId);

//         return res.status(200).json({
//             success: true,
//             payment,
//         });
//     } catch (error) {
//         console.error('Error fetching payment details:', error);
//         return res.status(500).json({
//             success: false,
//             message: 'Failed to fetch payment details',
//             error: error.message,
//         });
//     }
// };

// const refundPayment = async (req, res) => {
//     try {
//         const { paymentId, amount } = req.body;

//         if (!paymentId) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Payment ID is required',
//             });
//         }

//         const refundOptions = amount ? { amount: amount * 100 } : {};
//         const refund = await razorpay.payments.refund(paymentId, refundOptions);

//         return res.status(200).json({
//             success: true,
//             refund,
//             message: 'Refund processed successfully',
//         });
//     } catch (error) {
//         console.error('Error processing refund:', error);
//         return res.status(500).json({
//             success: false,
//             message: 'Failed to process refund',
//             error: error.message,
//         });
//     }
// };

// module.exports = {
//     createOrder,
//     verifyPayment,
//     getPaymentDetails,
//     refundPayment,
// };



const createOrder = (req, res) => {
    res.json({
        success: true,
        message: "Dummy order created"
    });
};

const verifyPayment = (req, res) => {
    res.json({
        success: true,
        message: "Dummy payment verified"
    });
};

const getPaymentDetails = (req, res) => {
    res.json({
        success: true,
        message: "Dummy payment details"
    });
};

const refundPayment = (req, res) => {
    res.json({
        success: true,
        message: "Dummy refund processed"
    });
};

module.exports = {
    createOrder,
    verifyPayment,
    getPaymentDetails,
    refundPayment,
};