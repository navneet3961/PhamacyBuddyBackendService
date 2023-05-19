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

    async update(cartId, data) {
        try {
            const cart = await this.get(cartId);

            let newListOfItems = cart.items;

            // If data is a array. It means adding new items to the cart.
            // Else it is a string them removing that item from the cart
            if (Array.isArray(data)) {
                data.forEach((item) => {
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
            }
            else {
                const item = data;

                for (let i = 0; i < newListOfItems.length; i++) {
                    if (newListOfItems[i].itemId.toString() == item) {
                        newListOfItems.splice(i, 1);
                        break;
                    }
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