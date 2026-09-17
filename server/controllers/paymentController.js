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