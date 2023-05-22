const { OrderRepository, ItemRepository } = require("../repository/index");
const { Item } = require("../models/index");
const { ServiceError, AppError } = require("../utils");
const connect = require("mongoose").connection;

class OrderService {
    constructor() {
        this.orderRepository = new OrderRepository();
        this.itemRepository = new ItemRepository();
    }

    async create(data) {
        const session = await connect.startSession();

        try {
            const details = data.details;
            const items = data.items;
            const quantities = data.quantities;
            const totalCost = data.totalCost;
            const address = data.address;
            const phone = data.phone;
            let order = "";

            session.startTransaction();


            for (let i = 0; i < items.length; i++) {
                let item = await this.itemRepository.get(items[i]);

                if (item.quantity < quantities[i]) {
                    for (let j = 0; j < i; j++) {
                        item = await this.itemRepository.get(items[j]);
                        await Item.findByIdAndUpdate(items[j], { "quantity": item.quantity + quantities[i] }, { runValidators: true, new: true });
                    }

                    throw new AppError("TransactionError", "Some items are out of stock", "Order cancelled because some items got out of stock");
                }
                else {
                    await Item.findByIdAndUpdate(items[i], { "quantity": item.quantity - quantities[i] }, { runValidators: true, new: true });
                }
            }

            order = await this.orderRepository.create(details, items, totalCost, address, phone);
            await session.commitTransaction();
            session.endSession();

            return order;
        } catch (error) {
            console.log("In Service Layer Name ", error.name);
            console.log(error);

            if (error.name == "TransactionError") {
                await session.abortTransaction();
                throw error;
            }

            if (error.name == "ValidationError") {
                throw error;
            }

            throw new ServiceError();
        }
        finally {
            session.endSession();
        }
    }

    async delete(orderId) {
        try {
            await this.orderRepository.delete(orderId);
            return true;
        } catch (error) {
            console.log("In Service Layer Name ", error.name);
            console.log(error);
            if (error.name == "ClientError") {
                throw error;
            }

            throw new ServiceError();
        }
    }

    async get(orderId) {
        try {
            const order = await this.orderRepository.get(orderId);
            return order;
        } catch (error) {
            console.log("In Service Layer Name ", error.name);
            console.log(error);
            if (error.name == "ClientError") {
                throw error;
            }

            throw new ServiceError();
        }
    }

    async update(orderId, data) {
        try {
            const order = await this.orderRepository.update(orderId, data.status);
            return order;
        } catch (error) {
            console.log("In Service Layer Name ", error.name);
            console.log(error);

            if (error.name == "ClientError") {
                throw error;
            }

            throw new ServiceError();
        }
    }
}

module.exports = OrderService;