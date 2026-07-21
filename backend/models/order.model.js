const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true, trim: true, },
    phone: { type: Number, required: true, },
    product: { type: String, required: true, },
    quantity: { type: Number, default: 1 },
    amount: { type: Number, required: true, },
    status: {
        type: String,
        enum: ["NEW", "CONFIRMED", "DISPATCHED", "DELIVERED", "CANCELED", "RTO"],
        default: "NEW"
    },
    telecaller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Telecaller",
        required: true,
    },
    city: { type: String },
    statusHistory: [{
        status: { type: String },
        changedAt: { type: Date, default: Date.now }
    }]
},
    { timestamps: true, versionKey: false });

orderSchema.index({ status: 1 });
orderSchema.index({ city: 1 });
orderSchema.index({ telecaller: 1 });
orderSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Order", orderSchema);
