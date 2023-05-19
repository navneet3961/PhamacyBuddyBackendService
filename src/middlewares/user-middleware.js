const { StatusCodes } = require("http-status-codes");

const validateCreate = (req, res, next) => {
    const { name, email, password } = req.body;
    let emptyFields = [];

    if (!name) {
        emptyFields.push("name");
    }

    if (!email) {
        emptyFields.push("email");
    }

    if (!password) {
        emptyFields.push("password");
    }

    if (emptyFields.length > 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            message: "Some data is missing in the request to create the user.",
            emptyFields,
            explanation: "Missing mandatory properties to create user"
        })
    }

    next();
}

const validateUpdate = (req, res, next) => {
    const { name, email, password, isBlocked, addressId } = req.body;
    let fields = [];

    if (name) {
        fields.push("name");
    }

    if (email) {
        fields.push("email");
    }

    if (password) {
        fields.push("password");
    }

    if (isBlocked) {
        fields.push("block");
    }

    if (addressId) {
        fields.push("addressId");
    }

    if (fields.length == 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            message: "Nothing to change in the user data.",
            explanation: "Data is missing in the request to update the user."
        })
    }

    next();
}

const validateSignIn = (req, res, next) => {
    const { name, email, password } = req.body;
    let emptyFields = [];

    if (!email) {
        emptyFields.push("email");
    }

    if (!password) {
        emptyFields.push("password");
    }

    if (emptyFields.length > 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            message: "Some data is missing in the request to create the user.",
            emptyFields,
            explanation: "Missing mandatory properties to create user"
        })
    }

    next();
}

const validateToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            message: "Missing token",
            explanation: "No token found in the request to validate the token",
        });
    }

    next();
}

module.exports = {
    validateCreate,
    validateUpdate,
    validateSignIn,
    validateToken,
}