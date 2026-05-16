import Razorpay from "razorpay";

import Requirement from "../models/Requirement.js";

const razorpay = new Razorpay({
  key_id: "rzp_test_Sot0jydlT1LRV7",
  key_secret: "DnEYf7W4z9nv2MTgVc3axQGX",
});

/* ================= CREATE ORDER ================= */

export const createOrder = async (req, res) => {
  try {

    const options = {
      amount: Number(req.body.amount) * 100,
      currency: "INR",
      receipt: "receipt_order",
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Order Failed",
    });
  }
};

/* ================= VERIFY PAYMENT ================= */

export const verifyPayment = async (req, res) => {

  try {

    const {
      projectId,
    } = req.body;

    console.log("PROJECT ID :", projectId);

    const updatedProject =
      await Requirement.findByIdAndUpdate(

        projectId,

        {
          paymentStatus: "PAID",
        },

        {
          new: true,
        }
      );

    console.log(updatedProject);

    res.json({
      success: true,
      message: "Payment Successful",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Payment Failed",
    });
  }
};