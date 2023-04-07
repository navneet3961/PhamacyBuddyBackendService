const { StatusCodes } = require("http-status-codes");

const validateCreate = (req, res, next) => {
    const { addressLine, city, state, pincode } = req.body;
    let emptyFields = [];

    if (!addressLine) {
        emptyFields.push("addressLine");
    }

    if (!city) {
        emptyFields.push("city");
    }

    if (!state) {
        emptyFields.push("state");
    }

    if (!pincode) {
        emptyFields.push("pincode");
    }

    if (emptyFields.length > 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            message: "Some data is missing in the request to create the address.",
            emptyFields,
            explanation: "Missing mandatory properties to create address"
        })
    }

    next();
}

module.exports = {
    validateCreate,
}