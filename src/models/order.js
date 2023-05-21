const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
    }],
    totalCost: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        validate: {
            validator: (value) => {
                return !isNaN(value);
            },
            message: "Phone must be a 10 digit number.",
        },
        required: [true, "Phone is required"],
        minLength: [10, "Phone cannot be less than 10 characters"],
        maxLength: [10, "Phone cannot be more than 10 characters"],
        required: true,
    },
    status: {
        type: String,
        enum: ["CONFIRMED", "CANCELLED", "SHIPPED", "DELIVERED", "RETURN IN PROCESS", "RETURNED"],
        default: "CONFIRMED",
    },
    deliveredDate: {
        type: Number,
        required: true,
        default: 0,
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;