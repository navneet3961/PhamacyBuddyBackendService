const Cart = require("../models/cart");

class CartRepository {
    async create() {
        try {
            const cart = await Cart.create({});
            console.log(cart);
            return cart;
        } catch (error) {
            console.log("Name ", error.name);
            console.log(error);
            throw error;
        }
    }

    async delete(cartId) {
        try {
            const cart = await Cart.findByIdAndRemove(cartId);

            if (!cart) {
                throw new AppError("ClientError", "Cart not found", "Invalid cart id");
            }

            return true;
        } catch (error) {
            console.log("Name ", error.name);
            console.log(error);
            throw error;
        }
    }

    async get(cartId) {
        try {
            const cart = await Cart.findById(cartId).populate(
                'listOfItems'
            );

            if (!cart) {
                throw new AppError("ClientError", "Cart not found", "Invalid data sent in the request");
            }

            return cart;
        } catch (error) {
            console.log("Name ", error.name);
            console.log(error);
            throw error;
        }
    }

    async update(cartId, listOfItems) {
        try {
            const cart = await Cart.findByIdAndUpdate(cartId, { items: listOfItems }, { runValidators: true, new: true });
            return cart;
        } catch (error) {
            console.log("Name ", error.name);
            console.log(error);
            throw error;
        }
    }
}

module.exports = CartRepository;