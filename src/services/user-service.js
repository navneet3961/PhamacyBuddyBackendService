const { UserRepository } = require("../repository/index");
const { ServiceError, AppError, ValidationError } = require("../utils/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWTKEY } = require("../config/serverConfig");
const { emailRegex } = require("../utils/constants");
const { replaceTrimLower } = require("../utils/helper-function");

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            let requiredData = {};
            requiredData.name = data.name;
            requiredData.email = data.email;
            requiredData.password = data.password;

            const obj = await this.userRepository.create(requiredData);
            return obj;
        } catch (error) {
            if (error.name == "ValidationError" || error.name == "AttributeError" || error.name == "ClientError")
                throw error;

            throw new ServiceError();
        }
    }

    async delete(userId) {
        try {
            await this.userRepository.delete(userId);
            return true;
        } catch (error) {
            if (error.name == "ClientError")
                throw error;

            throw new ServiceError();
        }
    }

    async get(userId) {
        try {
            const obj = await this.userRepository.get(userId);
            return obj;
        } catch (error) {
            if (error.name == "ClientError")
                throw error;

            throw new ServiceError();
        }
    }

    async getAll(data) {
        try {
            if (data.email) {
                const email = replaceTrimLower(data.email);
                const objs = await this.userRepository.getAll({ "email": email });

                if (objs.length == 0) {
                    throw new AppError("ClientError", "No user is present with the given email", "No data found");
                }

                return objs;
            }

            const obj = await this.userRepository.getAll();
            return obj;

        } catch (error) {
            if (error.name == "ClientError")
                throw error;

            throw new ServiceError();
        }
    }

    async update(userId, data) {
        try {
            // If data has addressId that means new address is added to the database for the user
            if (data.addressId) {
                const user = await this.userRepository.get(userId);

                // Finding all the addresses
                let newListOfAddresses = user.addresses;

                // Adding new addressId to the list
                newListOfAddresses.push(data.addressId);

                const newUser = await this.userRepository.update(userId, { addresses: newListOfAddresses });

                return newUser;
            }

            // Else some other data about the user is need to be updated
            let requiredData = {};
            if (data.name) { requiredData.name = data.name; }
            if (data.email) { requiredData.email = data.email; }
            if (data.password) { requiredData.password = data.password; }
            if (data.isBlocked) { requiredData.stock = data.stock; }

            const obj = await this.userRepository.update(userId, requiredData);
            const token = jwt.sign({ email: obj.email, id: obj.id, isAdmin: obj.isAdmin, cart: obj.cart }, JWTKEY);

            if (data.email) {
                obj.headers = {
                    "x-access-token": token,
                };
            }

            return obj;
        } catch (error) {
            if (error.name == "JsonWebTokenError") {
                throw new AppError(error.name, error.message, "Something went wrong in the token generation");
            }

            if (error.name == "ValidationError" || error.name == "AttributeError" || error.name == "ClientError") {
                throw error;
            }

            throw new ServiceError();
        }
    }

    async signIn(userEmail, userPassword) {
        try {
            // First check if email matches the regex format or not.
            // Then get user by email.
            // If not found then the repository will through an error.
            // If found then check if user is blocked or not. If blocked then throw error.
            // Now check if password provided and password assosciated with email matches or not using bcrypt
            // If matches then we will return a jsonwebtoken
            // Else throw an error that password doesn't matches

            const email = replaceTrimLower(userEmail);
            const isValidEmail = email.match(emailRegex);

            if (!isValidEmail) {
                throw new ValidationError({
                    "email": "Invalid email format"
                })
            }

            const obj = await this.userRepository.getByEmail(email);

            if (obj.isBlocked) {
                throw new AppError("ClientError", "User not found", "Invalid data sent in the request");
            }

            const encryptedPassword = obj.password;
            const valid = bcrypt.compareSync(userPassword, encryptedPassword);

            if (!valid) {
                throw new ValidationError({
                    "password": "Password doesn't matches."
                })
            }

            const token = jwt.sign({ email: obj.email, id: obj.id, isAdmin: obj.isAdmin, cart: obj.cart }, JWTKEY);

            return {
                headers: {
                    "x-access-token": token,
                }
            };
        } catch (error) {
            if (error.name == "JsonWebTokenError") {
                throw new AppError(error.name, error.message, "Something went wrong in the token generation");
            }

            if (error.name == "ClientError" || error.name == "ValidationError")
                throw error;

            throw new ServiceError();
        }
    }

    async verifyToken(userToken) {
        try {
            // First verify the token using JWT
            // If token is invalid or the format is invalid then handle the error
            // If token is valid then extract email
            // If user found assosciated with the email then return true

            const userData = jwt.verify(userToken, JWTKEY);
            const obj = await this.userRepository.getByEmail(userData.email);

            if (obj.isBlocked) {
                throw new AppError("ClientError", "User not found", "Invalid data sent in the request");
            }

            return obj;
        } catch (error) {
            if (error.name == "JsonWebTokenError") {
                throw new AppError("JsonWebTokenError", error.message, "Something went wrong in the token verification");
            }

            if (error.name == "ClientError" || error.name == "ValidationError")
                throw error;

            throw new ServiceError();
        }
    }
}

module.exports = UserService;