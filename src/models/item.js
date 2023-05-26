const mongoose = require('mongoose');
const { removeExtraSpaces } = require("../utils/helper-function");

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        set: removeExtraSpaces,
        required: [true, "Name is required"],
        index: true,
        unique: [true, "Name already exists"],
        trim: true,
        minLength: [3, "Name cannot be less than 3 characters"],
    },
    description: {
        type: String,
        set: removeExtraSpaces,
        required: [true, "Description is required"],
        lowercase: true,
        trim: true,
    },
    imageUrl: {
        type: String,
        required: [true, "Image is required"],
    },
    price: {
        type: Number,
        min: [0, "Price cannot be negative"],
        required: [true, "Price is required"],
    },
    quantity: {
        type: Number,
        min: [0, "Quantity cannot be negative"],
        required: [true, "Quantity is required"],
    }
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;