import { Ordering, Webhook } from 'svix'
import userModel from '../models/userModel.js';
import razorpay from 'razorpay';
import transactionModel from '../models/transactionModel.js';
import { createOrder, verifyPaymentSignature, razorpayInstance } from '../config/razorpayService.js';

//API Controller Function to Manage Clerk User with database
//http://localhost:4000/api/user/webhooks

const clerkWebhooks = async (req, res) => {
    try {
        //Create a Svix instance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        const { data, type } = req.body;
        console.log(data, type);

        switch (type) {
            case "user.created": {
                const newUser = new userModel({
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                })
                await newUser.save()
                res.json({})

                break;
            }

            case "user.updated": {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                }

                await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
                res.json({})
                break;
            }

            case "user.deleted": {
                await userModel.findOneAndDelete({ clerkId: data.id });
                res.json({})
                break;
            }

            default:
                break;
        }
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}


const userCredits = async (req, res) => {
    try {
        const { clerkId } = req.body;

        const userData = await userModel.findOne({ clerkId });

        res.json({ success: true, credits: userData.creditBalance });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}



//API to make payment for credits
const paymentRazorpay = async (req, res) => {
    try {
        const { clerkId, planId } = req.body;
        const userData = await userModel.findOne({ clerkId });

        if (!userData || !planId) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

        let credits, plan, amount, date;

        switch (planId) {
            case 'Basic':
                plan = 'Basic';
                credits = 10;
                amount = 10;
                break;
            case 'Advanced':
                plan = 'Advanced';
                credits = 50;
                amount = 50;
                break;
            case 'Business':
                plan = 'Business';
                credits = 500;
                amount = 250;
                break;
            default:
                return res.status(400).json({ success: false, message: "Invalid Plan" });
        }

        date = Date.now();

        // Create transaction
        const transactionData = {
            clerkId,
            plan,
            amount,
            credits,
            date
        };

        const newTransaction = await transactionModel.create(transactionData);

        // Create Razorpay order
        const order = await createOrder(amount, process.env.CURRENCY, newTransaction._id);
        res.json({ success: true, order });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const verifyRazorpay = async (req, res) => {
    try {
        const paymentDetails = req.body;
        // Verify the payment signature
        verifyPaymentSignature(paymentDetails);

        const { razorpay_order_id, razorpay_payment_id } = paymentDetails;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if (orderInfo.status !== "paid") {
            return res.json({ success: false, message: "Payment failed" });
        }

        const transactionData = await transactionModel.findById(orderInfo.receipt);
        if (transactionData.payment) {
            return res.json({ success: false, message: "Payment already processed" });
        }

        // Update user credits and mark payment as complete
        const userData = await userModel.findOne({ clerkId: transactionData.clerkId });
        const creditBalance = userData.creditBalance + transactionData.credits;

        await userModel.findByIdAndUpdate(userData._id, { creditBalance });
        await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true });

        res.json({ success: true, message: "Credits Added" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export { clerkWebhooks, userCredits, paymentRazorpay, verifyRazorpay };