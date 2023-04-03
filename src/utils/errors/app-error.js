const { StatusCodes } = require("http-status-codes");

class AppError extends Error {
    constructor(
        name,
        message,
        explanation,
        statusCode = StatusCodes.BAD_REQUEST
    ) {
        super();
        this.name = name;
        this.message = message;
        this.explanation = explanation;
        this.statusCode = statusCode;
    }
}

module.exports = AppError;