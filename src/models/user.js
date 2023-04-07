const mongoose = require('mongoose');
const { removeExtraSpaces } = require("../utils/helper-function");
const { emailRegex, passwordRegex } = require("../utils/constants");
const bcrypt = require("bcrypt");
const { SALT } = require("../config/serverConfig");
const { AppError } = require('../utils');

const getEncryptedPassword = (password) => {
    const salt = bcrypt.genSaltSync(Number(SALT));
    const encryptedPassword = bcrypt.hashSync(password, salt);
    return encryptedPassword;
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        set: removeExtraSpaces,
        required: [true, "Name is required"],
        uppercase: true,
        trim: true,
        minLength: [3, "Name cannot be less than 3 characters"],
    },
    email: {
        type: String,
        set: removeExtraSpaces,
        required: [true, "Email is required"],
        index: true,
        unique: [true, "Email already exists"],
        match: [emailRegex, "Invalid email format"],
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ],
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    addresses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address'
        }
    ],
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

userSchema.pre("save", function (next) {
    if (!this.password.match(passwordRegex)) {
        throw new AppError("ClientError", "Invalid password format", "Please provide valid password.\nA valid password must have:\n\tAtleast one uppercase letter\n\tAtleast one lowercase letter\n\tAtleast one special character\n\tAtleast one numeric character\n\tAnd it must be from 8-12 characters long");
    }

    this.password = getEncryptedPassword(this.password);
    next();
});

userSchema.pre("findOneAndUpdate", function () {
    if (this._update.password) {
        if (!this._update.password.match(passwordRegex)) {
            throw new AppError("ClientError", "Invalid password format", "Please provide valid password.\nA valid password must have:\n\tAtleast one uppercase letter\n\tAtleast one lowercase letter\n\tAtleast one special character\n\tAtleast one numeric character\n\tAnd it must be from 8-12 characters long");
        }

        this._update.password = getEncryptedPassword(this._update.password);
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;