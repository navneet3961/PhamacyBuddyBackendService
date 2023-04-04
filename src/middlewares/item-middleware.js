const { StatusCodes } = require("http-status-codes");

const validateCreate = (req, res, next) => {
    const { name, description, image, price, stock } = req.body;
    let emptyFields = [];

    if (!name) {
        emptyFields.push("name");
    }

    if (!description) {
        emptyFields.push("description");
    }

    if (!image) {
        emptyFields.push("image");
    }

    if (!price) {
        emptyFields.push("price");
    }

    if (!stock) {
        emptyFields.push("stock");
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
    const { name, description, image, price, stock } = req.body;
    let fields = [];

    if (name) {
        fields.push("name");
    }

    if (description) {
        fields.push("description");
    }

    if (image) {
        fields.push("image");
    }

    if (price) {
        fields.push("price");
    }

    if (stock) {
        fields.push("stock");
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