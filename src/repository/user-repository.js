const User = require("../models/user");
const { AppError, ValidationError } = require("../utils/index");

class UserRepository {
    #findErrorAttributes(error) {
        let errors = {};
        if (error.errors.name) {
            errors.name = error.errors.name.message;
        }

        if (error.errors.email) {
            errors.email = error.errors.email.message;
        }

        if (error.errors.password) {
            errors.password = error.errors.password.message;
        }

        return errors;
    }

    async create(data) {
        try {
            const obj = await User.create(data);
            return obj;
        } catch (error) {
            console.log("Name ", error.name);
            console.log(error);
            if (error.name == "ValidationError") {
                console.log("Name ", error.name);
                const errorAttributes = this.#findErrorAttributes(error);
                throw new ValidationError(errorAttributes);
            }

            if (error.name == "MongoServerError" && error.code == 11000) {
                throw new AppError("AttributeError", "Email already exists", "No two users can have the same email");
            }

            throw error;
        }
    }

    async delete(userId) {
        try {
            const user = await User.findByIdAndRemove(userId);

            if (!user) {
                throw new AppError("ClientError", "User not found", "Invalid user id");
            }

            return user;
        } catch (error) {
            console.log("Name ", error.name);
            console.log(error);
            if (error.name == "ClientError") {
                throw error;
            }

            throw error;
        }
    }

    async get(userId) {
        try {
            const obj = await User.findById(userId);

            if (!obj) {
                throw new AppError("ClientError", "User not found", "Invalid data sent in the request");
            }

            return obj;
        } catch (error) {
            console.log("Name ", error.name);
            console.log(error);
            throw error;
        }
    }

    async getByEmail(userEmail) {
        try {
            const obj = await User.findOne({ email: userEmail });

            if (!obj) {
                throw new AppError("ClientError", "User not found", "Invalid data sent in the request");
            }

            return obj;
        } catch (error) {
            console.log("Name ", error.name);
            console.log(error);
            throw error;
        }
    }

    async getAll(data) {
        try {
            const obj = await User.find(data);
            return obj;
        } catch (error) {
            console.log("Name ", error.name);
            console.log(error);
            throw error;
        }
    }

    async update(userId, data) {
        try {

            const obj = await User.findByIdAndUpdate(userId, data, { runValidators: true, new: true });
            if (!obj) {
                throw new AppError("ClientError", "User not found", "Invalid data sent in the request");
            }
            console.log(obj);
            return obj;
        } catch (error) {
            console.log("Name ", error.name);
            console.log(error);
            if (error.name == "ValidationError") {
                const errorAttributes = this.#findErrorAttributes(error);
                throw new ValidationError(errorAttributes);
            }

            if (error.name == "MongoServerError" && error.code == 11000) {
                throw new AppError("AttributeError", "Email already exists", "No two users can have the same email");
            }

            throw error;
        }
    }
}

module.exports = UserRepository;