const { StatusCodes } = require("http-status-codes");

class ValidationError extends Error {
    constructor(explanation) {
        super();
        this.name = 'ValidationError';
        this.message = 'Not able to validate the data sent in the request';
        this.explanation = explanation;
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

module.exports = ValidationError;