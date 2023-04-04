const Item = require("../models/item");
const { AppError, ValidationError } = require("../utils/index");

class ItemRepository {
    #findErrorAttributes(error) {
        let errors = {};
        if (error.errors.name) {
            errors.name = error.errors.name.message;
        }

        if (error.errors.price) {
            if (error.errors.price.name == "CastError") {
                errors.price = "Price must be a number";
            }
            else {
                errors.price = error.errors.price.message;
            }
        }

        if (error.errors.description) {
            errors.description = error.errors.description.message;
        }

        if (error.errors.stock) {
            if (error.errors.stock.name == "CastError") {
                errors.stock = "Stock must be a number";
            }
            else {
                errors.stock = error.errors.stock.message;
            }
        }

        if (error.errors.image) {
            errors.image = error.errors.image.message;
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

                if (error.path == "stock") {
                    throw new ValidationError({ "stock": "Stock must be a number" });
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