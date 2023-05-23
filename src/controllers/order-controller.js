const { OrderService } = require("../services/index");

const orderService = new OrderService();

const create = async (req, res) => {
    try {
        const response = await orderService.create(req.body);
        return res.status(201).json({
            status: true,
            data: response,
            message: "Order Created Succesfully"
        });
    } catch (error) {
        console.log(error);
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
        const response = await orderService.delete(req.params.id);
        return res.status(200).json({
            status: true,
            message: "Order Deleted"
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
        const response = await orderService.get(req.params.id);
        return res.status(200).json({
            status: true,
            data: response,
            message: "Order found"
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

const getAll = async (req, res) => {
    try {
        const response = await orderService.getAll(req.query.status);
        return res.status(200).json({
            status: true,
            data: response,
            message: "Order found"
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
        const response = await orderService.update(req.params.id, req.body);
        return res.status(200).json({
            status: true,
            data: response,
            message: "Order Updated"
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
    getAll,
    update,
}