import User from "../models/user.model.js";
import Transaction from "../models/transaction.model.js";
import razorpay from "razorpay";

const razorpayIntance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

export const paymentRazorpay = async (req, res) => {
  try {
    const { planId } = req.body;
    const { id } = req.user;

    const user = await User.findById(id);

    if ( !user || !planId ) {
      return res.status(400).json({ success: false, message: "Missing credentials." });
    }

    let plan, credits, amount;
    // set up transaction base on plan
    if ( planId === "Basic" ) {
      plan = "Basic"; credits = 100; amount = 10;
    } else if ( planId === "Advanced" ) {
      plan = "Advanced"; credits = 500; amount = 50;
    } else if ( planId === "Business" ) {
      plan = "Business"; credits = 5000; amount = 250;
    } else {
      return res.status(400).json({ success: false, message: "Plan not fond." });
    }

    // store transaction detailes into the db
    const transaction = await Transaction.create({ userId: id, plan, amount, credits });

    // razorpay options details
    const option = {
      amount: transaction.amount * 100,
      currency: process.env.CURRENCY,
      receipt: transaction._id,
    };

    // razorpay intrigation
    await razorpayIntance.orders.create(option, (error, order) => {
      if ( error ) {
        console.log("Razorpay error", error);
        return res.status(500).json({ success: false, message: error.message });
      }
      res.status(200).json({ success: true, order });
    });
  } catch (error) {
    console.log("paymentRazorpay error", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;

    const paymentData = await razorpayIntance.orders.fetch(razorpay_order_id);

    if (paymentData.status !== "paid") {
      return res.status(400).json({ success: false, message: "Payment failed!" });
    }

    const transaction = await Transaction.findById(paymentData.receipt);
    if (!transaction) {
      return res.status(400).json({ success: false, message: "Transaction not found!" });
    }

    if (transaction.payment) {
      return res.status(400).json({ success: false, message: "Payment is already verified!" });
    }

    const user = await User.findById(transaction.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    // Update credit and mark payment as done
    transaction.payment = true;
    await transaction.save();

    user.creditBalance += transaction.credits;
    await user.save();

    return res.status(200).json({ success: true, message: "Credit added successfully" });
  } catch (error) {
    console.log("verifyRasorpay error", error);
    return res.status(500).json({ success: false, message: error.message });
  } 
}
