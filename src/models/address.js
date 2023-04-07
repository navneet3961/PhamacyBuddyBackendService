const mongoose = require('mongoose');
const { removeExtraSpaces } = require("../utils/helper-function");

const addressSchema = new mongoose.Schema({
    addressLine: {
        type: String,
        set: removeExtraSpaces,
        required: [true, "Address Line is required"],
        uppercase: true,
        trim: true,
        minLength: [3, "Address cannot be less than 3 characters"],
    },
    city: {
        type: String,
        set: removeExtraSpaces,
        required: [true, "City is required"],
        uppercase: true,
        trim: true,
        minLength: [3, "City cannot be less than 3 characters"],
    },
    state: {
        type: String,
        set: removeExtraSpaces,
        required: [true, "State is required"],
        uppercase: true,
        trim: true,
        minLength: [3, "State cannot be less than 3 characters"],
    },
    pincode: {
        type: String,
        validate: {
            validator: (value) => {
                return !isNaN(value);
            },
            message: "Pincode must be a 6 digit number.",
        },
        required: [true, "Pincode is required"],
        minLength: [6, "Pincode cannot be less than 6 characters"],
        maxLength: [6, "Pincode cannot be more than 6 characters"],
    }
}, { timestamps: true });

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;