import razorpay from 'razorpay';
import crypto from 'crypto';

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Function to create an order
const createOrder = async (amount, currency, receipt) => {
  const options = {
    amount: amount * 100, // Convert to paise
    currency,
    receipt
  };

  try {
    const order = await razorpayInstance.orders.create(options);
    return order;
  } catch (error) {
    console.log(error)
    throw new Error("Error creating Razorpay order: " + error.message);
  }
};

// Function to verify payment signature
const verifyPaymentSignature = (paymentDetails) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentDetails;
  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (generatedSignature !== razorpay_signature) {
    throw new Error('Invalid payment signature');
  }
};

export { createOrder, verifyPaymentSignature, razorpayInstance };
