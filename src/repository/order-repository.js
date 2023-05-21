const Order = require("../models/order");
const { ValidationError, AppError } = require("../utils");

class OrderRepository {
    #findErrorAttributes(error) {
        let errors = "";

        if (error.errors.items) {
            errors += error.errors.items.message + " ";
        }

        if (error.errors.totalCost) {
            errors += error.errors.totalCost.message + " ";
        }

        if (error.errors.address) {
            errors += error.errors.address.message + " ";
        }

        if (error.errors.phone) {
            errors += error.errors.phone.message + " ";
        }

        if (error.errors.status) {
            errors += error.errors.status.message + " ";
        }

        if (error.errors.deliveryDate) {
            errors += error.errors.deliveryDate.message + " ";
        }

        return errors;
    }

    async create(items, totalCost, address, phone) {
        try {
            const order = await Order.create({ items, totalCost, address, phone });

            return this.get(order.id);
        } catch (error) {
            console.log("Name ", error.name);
            console.log(error);

            if (error.name == "ValidationError") {
                const errorAttributes = this.#findErrorAttributes(error);
                console.log(errorAttributes);
                throw new ValidationError(errorAttributes);
            }

            throw error;
        }
    }

    async delete(orderId) {
        try {
            const order = await Order.findByIdAndRemove(orderId);

            if (!order) {
                throw new AppError("ClientError", "Order not found", "Invalid order id");
            }

            return true;
        } catch (error) {
            console.log("Name ", error.name);
            console.log(error);
            throw error;
        }
    }

    async get(orderId) {
        try {
            const order = await Order.findById(orderId).populate({ path: "items" });

            if (!order) {
                throw new AppError("ClientError", "Order not found", "Invalid data sent in the request");
            }

            return order;
        } catch (error) {
            console.log("Name ", error.name);
            console.log(error);
            throw error;
        }
    }

    async update(orderId, STATUS) {
        try {
            let order;
            if (STATUS == "DELIVERED")
                order = await Order.findByIdAndUpdate(orderId, { status: STATUS, deliveryDate: new Date.getTime() }, { runValidators: true, new: true });
            else
                order = await Order.findByIdAndUpdate(orderId, { status: STATUS }, { runValidators: true, new: true });

            return order;
        } catch (error) {
            console.log("Name ", error.name);
            console.log(error);
            throw error;
        }
    }
}

module.exports = OrderRepository;