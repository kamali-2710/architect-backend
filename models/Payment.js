import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    projectId: String,

    clientName: String,

    amount: Number,

    paymentId: String,

    orderId: String,

    status: {
        type: String,
        default: "PENDING"
    }
}, {
    timestamps: true
});

export default mongoose.model(
    "Payment",
    paymentSchema
);