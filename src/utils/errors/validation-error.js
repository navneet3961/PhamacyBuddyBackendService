const { StatusCodes } = require("http-status-codes");

class ValidationError extends Error {
    constructor(message = 'Not able to validate the data sent in the request', explanation) {
        super();
        this.name = 'ValidationError';
        this.message = message;
        this.explanation = explanation;
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

module.exports = ValidationError;