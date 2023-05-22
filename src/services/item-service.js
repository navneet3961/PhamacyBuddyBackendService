const { ItemRepository } = require("../repository/index");
const { replaceTrimLower } = require("../utils/helper-function");
const { ServiceError, AppError } = require("../utils/index");

class ItemService {
    constructor() {
        this.itemRepository = new ItemRepository();
    }

    async create(data) {
        try {
            let requiredData = {};
            requiredData.name = data.name;
            requiredData.description = data.description;
            requiredData.price = data.price;
            requiredData.quantity = data.quantity;
            requiredData.imageUrl = data.imageUrl;

            const obj = await this.itemRepository.create(requiredData);
            return obj;
        } catch (error) {
            if (error.name == "ValidationError" || error.name == "AttributeError")
                throw error;

            throw new ServiceError();
        }
    }

    async delete(itemId) {
        try {
            await this.itemRepository.delete(itemId);
            return true;
        } catch (error) {
            if (error.name == "ClientError")
                throw error;

            throw new ServiceError();
        }
    }

    async get(itemId) {
        try {
            const obj = await this.itemRepository.get(itemId);
            return obj;
        } catch (error) {
            if (error.name == "ClientError")
                throw error;

            throw new ServiceError();
        }
    }

    async getAll(data) {
        try {
            if (data.name) {
                const NAME = replaceTrimLower(data.name);
                const objs = await this.itemRepository.getAll();

                if (!data.name) {
                    return objs;
                }

                let result = [];

                objs.forEach((obj) => {
                    if (obj.name.toLowerCase().includes(NAME)) {
                        result.push(obj);
                    }
                })

                if (result.length == 0) {
                    throw new AppError("ClientError", "No items found", "Invalid name");
                }

                return result;
            }

            const obj = await this.itemRepository.getAll();
            return obj;

        } catch (error) {
            if (error.name == "ClientError")
                throw error;

            throw new ServiceError();
        }
    }

    async update(itemId, data) {
        try {
            let requiredData = {};
            if (data.name) { requiredData.name = data.name; }
            if (data.description) { requiredData.description = data.description; }
            if (data.price) { requiredData.price = data.price; }
            if (data.quantity || data.quantity == 0) { requiredData.quantity = data.quantity; }
            if (data.imageUrl) { requiredData.imageUrl = data.imageUrl; }

            const obj = await this.itemRepository.update(itemId, requiredData);
            return obj;
        } catch (error) {
            if (error.name == "ValidationError" || error.name == "AttributeError")
                throw error;

            throw new ServiceError();
        }
    }
}

module.exports = ItemService;