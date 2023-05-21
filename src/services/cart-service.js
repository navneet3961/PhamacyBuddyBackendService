const { CartRepository } = require("../repository/index");
const { ServiceError } = require("../utils");

class CartService {
    constructor() {
        this.cartRepository = new CartRepository();
    }

    async create() {
        try {
            const cart = await this.cartRepository.create();
            return cart;
        } catch (error) {
            console.log("In Service Layer Name ", error.name);
            console.log(error);
            throw new ServiceError();
        }
    }

    async delete(cartId) {
        try {
            await this.cartRepository.delete(cartId);
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

    async get(cartId) {
        try {
            const cart = await this.cartRepository.get(cartId);
            return cart;
        } catch (error) {
            console.log("In Service Layer Name ", error.name);
            console.log(error);
            if (error.name == "ClientError") {
                throw error;
            }

            throw new ServiceError();
        }
    }

    async empty(cartId) {
        try {
            const newCart = await this.cartRepository.update(cartId, []);
            return newCart;
        } catch (error) {
            console.log("In Service Layer Name ", error.name);
            console.log(error);

            if (error.name == "ClientError") {
                throw error;
            }

            throw new ServiceError();
        }
    }

    async add(cartId, items) {
        try {
            const cart = await this.get(cartId);
            const newListOfItems = cart.items;

            items.forEach((item) => {
                let found = -1;
                for (let i = 0; i < newListOfItems.length; i++) {
                    if (newListOfItems[i].itemId.toString() == item.itemId) {
                        found = i;
                        break;
                    }
                }

                if (found == -1)
                    newListOfItems.push(item);
                else
                    newListOfItems[found].quantity += 1;
            });


            const newCart = await this.cartRepository.update(cartId, newListOfItems);
            return newCart;
        } catch (error) {
            console.log("In Service Layer Name ", error.name);
            console.log(error);

            if (error.name == "ClientError") {
                throw error;
            }

            throw new ServiceError();
        }
    }


    async remove(cartId, itemId, remove) {
        try {
            const cart = await this.get(cartId);
            const newListOfItems = cart.items;

            for (let i = 0; i < newListOfItems.length; i++) {
                if (newListOfItems[i].itemId.toString() == itemId) {
                    if (remove)
                        newListOfItems.splice(i, 1);
                    else
                        newListOfItems[i].quantity -= 1;
                    break;
                }
            }

            const newCart = await this.cartRepository.update(cartId, newListOfItems);
            return newCart;
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

module.exports = CartService;