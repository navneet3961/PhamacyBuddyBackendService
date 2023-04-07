const { CartService } = require("../services/index");

const cartService = new CartService();

const create = async (req, res) => {
    try {
        const response = await cartService.create();
        return res.status(201).json({
            status: true,
            data: response,
            message: "Cart Created Succesfully"
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            status: false,
            name: error.name,
            message: error.message,
            explanation: error.explanation,
        });
    }
}

const destroy = async (req, res) => {
    try {
        const response = await cartService.delete(req.params.id);
        return res.status(200).json({
            status: true,
            message: "Cart Deleted"
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            status: false,
            name: error.name,
            message: error.message,
            explanation: error.explanation,
        });
    }
}

const get = async (req, res) => {
    try {
        const response = await cartService.get(req.params.id);
        return res.status(200).json({
            status: true,
            data: response,
            message: "Cart found"
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            status: false,
            name: error.name,
            message: error.message,
            explanation: error.explanation,
        });
    }
}

const update = async (req, res) => {
    try {
        const response = await cartService.update(req.params.id, req.body.items);
        return res.status(200).json({
            status: true,
            data: response,
            message: "Cart Updated"
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            status: false,
            name: error.name,
            message: error.message,
            explanation: error.explanation,
        });
    }
}

module.exports = {
    create,
    destroy,
    get,
    update,
}