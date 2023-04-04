const mongoose = require('mongoose');
const { removeExtraSpaces } = require("../utils/helper-function");

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        set: removeExtraSpaces,
        required: [true, "Name is required"],
        index: true,
        unique: [true, "Name already exists"],
        uppercase: true,
        trim: true,
        minLength: [3, "Name cannot be less than 3 characters"],
    },
    description: {
        type: String,
        set: removeExtraSpaces,
        required: [true, "Description is required"],
        lowercase: true,
        trim: true,
        maxLength: [250, "Description cannot be more than 250 characters"],
    },
    image: {
        type: String,
        required: [true, "Image is required"],
    },
    price: {
        type: Number,
        min: [0, "Price cannot be negative"],
        required: [true, "Price is required"],
    },
    stock: {
        type: Number,
        min: [0, "Stock cannot be negative"],
        required: [true, "Stock is required"],
    }
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;