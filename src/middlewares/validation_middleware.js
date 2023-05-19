const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { JWTKEY } = require("../config/serverConfig");
const { UserRepository } = require("../repository");

const validAdmin = async (req, res, next) => {
    try {
        // First verify the token using JWT
        // If token is invalid or the format is invalid then handle the error
        // If token is valid then extract email
        // If user does not found assosciated with the email or the user is not Admin

        let userToken = req.headers["x-access-token"];

        if (!userToken) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: false,
                message: "Missing token",
                explanation: "No token found in the request to validate the token",
            });
        }

        const userRepository = new UserRepository();
        const userData = jwt.verify(userToken, JWTKEY);
        const obj = await userRepository.getByEmail(userData.email);

        if (obj.isBlocked || obj.isAdmin == false) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: false,
                message: "User not found",
                explanation: "Invalid data sent in the request",
            });
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            message: "Invalid Token",
            explanation: "Invalid data sent in the request",
        });
    }
}

const validUser = async (req, res, next) => {
    try {
        // First verify the token using JWT
        // If token is invalid or the format is invalid then handle the error
        // If token is valid then extract email
        // If user does not found assosciated with the email or the user is not Admin

        let userToken = req.headers["x-access-token"];

        if (!userToken) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: false,
                message: "Missing token",
                explanation: "No token found in the request to validate the token",
            });
        }

        const userRepository = new UserRepository();
        const userData = jwt.verify(userToken, JWTKEY);
        const obj = await userRepository.getByEmail(userData.email);

        if (obj.isBlocked) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: false,
                message: "User not found",
                explanation: "Invalid data sent in the request",
            });
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            message: "Invalid Token",
            explanation: "Invalid data sent in the request",
        });
    }
}

module.exports = {
    validAdmin,
    validUser,
}