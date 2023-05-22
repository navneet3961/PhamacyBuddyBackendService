const Item = require("../models/item");
const { AppError, ValidationError } = require("../utils/index");

class ItemRepository {
    #findErrorAttributes(error) {
        let errors = "";
        if (error.errors.name) {
            errors += error.errors.name.message + " ";
        }

        if (error.errors.price) {
            if (error.errors.price.name == "CastError") {
                errors += "Price must be a number ";
            }
            else {
                errors += error.errors.price.message + " ";
            }
        }

        if (error.errors.description) {
            errors += error.errors.description.messag + " ";
        }

        if (error.errors.quantity) {
            if (error.errors.quantity.name == "CastError") {
                errors += "quantity must be a number ";
            }
            else {
                errors += error.errors.quantity.message + " ";
            }
        }

        if (error.errors.imageUrl) {
            errors += error.errors.imageUrl.message + " ";
        }

        return errors;
    }

    async create(data) {
        try {
            const obj = await Item.create(data);
            return obj;
        } catch (error) {
            if (error.name == "ValidationError") {
                const errorAttributes = this.#findErrorAttributes(error);
                throw new ValidationError(errorAttributes);
            }

            if (error.name == "MongoServerError" && error.code == 11000) {
                throw new AppError("AttributeError", "Name already exists", "No two items can have the same name");
            }

            throw error;
        }
    }

    async delete(itemId) {
        try {
            const item = await Item.findByIdAndRemove(itemId);

            if (!item) {
                throw new AppError("ClientError", "Item not found", "Invalid item id");
            }

            return item;
        } catch (error) {
            if (error.name == "AttributeError") {
                throw error;
            }

            throw error;
        }
    }

    async get(itemId) {
        try {
            const obj = await Item.findById(itemId);

            if (!obj) {
                throw new AppError("ClientError", "Item not found", "Invalid data sent in the request");
            }

            return obj;
        } catch (error) {
            throw error;
        }
    }

    async getAll(data) {
        try {
            const obj = await Item.find(data);
            return obj;
        } catch (error) {
            throw error;
        }
    }

    async update(itemId, data) {
        try {
            console.log(data);
            const obj = await Item.findByIdAndUpdate(itemId, data, { runValidators: true, new: true });
            if (!obj) {
                throw new AppError("ClientError", "Item not found", "Invalid data sent in the request");
            }
            return obj;
        } catch (error) {
            if (error.name == "CastError") {
                if (error.path == "price") {
                    throw new ValidationError({ "price": "Price must be a number" });
                }

                if (error.path == "quantity") {
                    throw new ValidationError({ "quantity": "quantity must be a number" });
                }
            }

            if (error.name == "ValidationError") {
                const errorAttributes = this.#findErrorAttributes(error);
                throw new ValidationError(errorAttributes);
            }

            if (error.name == "MongoServerError" && error.code == 11000) {
                throw new AppError("AttributeError", "Name already exists", "No two items can have the same name");
            }

            throw error;
        }
    }
}

module.exports = ItemRepository;