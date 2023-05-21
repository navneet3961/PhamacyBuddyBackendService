const { OrderRepository } = require("../repository/index");
const { ServiceError } = require("../utils");

class OrderService {
    constructor() {
        this.orderRepository = new OrderRepository();
    }

    async create(data) {
        try {
            const order = await this.orderRepository.create(data.items, data.totalCost, data.address, data.phone);
            return order;
        } catch (error) {
            console.log("In Service Layer Name ", error.name);
            console.log(error);

            if (error.name == "ValidationError") {
                throw error;
            }

            throw new ServiceError();
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