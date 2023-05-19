const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { JWTKEY } = require("../config/serverConfig");
const { UserRepository } = require("../repository");

const validateCreate = (req, res, next) => {
    const { name, description, imageUrl, price, quantity } = req.body;
    let emptyFields = [];

    if (!name) {
        emptyFields.push("name");
    }

    if (!description) {
        emptyFields.push("description");
    }

    if (!imageUrl) {
        emptyFields.push("imageUrl");
    }

    if (!price) {
        emptyFields.push("price");
    }

    if (!quantity) {
        emptyFields.push("quantity");
    }

    if (emptyFields.length > 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            message: "Some data is missing in the request to create the item.",
            emptyFields,
            explanation: "Missing mandatory properties to create item"
        })
    }

    next();
}

const validateUpdate = (req, res, next) => {
    const { name, description, imageUrl, price, quantity } = req.body;
    let fields = [];

    if (name) {
        fields.push("name");
    }

    if (description) {
        fields.push("description");
    }

    if (imageUrl) {
        fields.push("imageUrl");
    }

    if (price) {
        fields.push("price");
    }

    if (quantity) {
        fields.push("quantity");
    }

    if (fields.length == 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            message: "Nothing to change in the item data.",
            explanation: "Data is missing in the request to update the item."
        })
    }

    next();
}

module.exports = {
    validateCreate,
    validateUpdate
}