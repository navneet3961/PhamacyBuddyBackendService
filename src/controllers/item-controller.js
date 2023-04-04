const { ItemService } = require("../services/index");

const itemService = new ItemService();

const create = async (req, res) => {
    try {
        const response = await itemService.create(req.body);
        return res.status(201).json({
            status: true,
            data: response,
            message: "Item Created Succesfully"
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
        const response = await itemService.delete(req.params.id);
        return res.status(200).json({
            status: true,
            message: "Item Deleted"
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
        const response = await itemService.get(req.params.id);
        return res.status(200).json({
            status: true,
            data: response,
            message: "Item found"
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
        const response = await itemService.getAll(req.query);
        return res.status(200).json({
            status: true,
            data: response,
            message: "Items found"
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
        const response = await itemService.update(req.params.id, req.body);
        return res.status(201).json({
            status: true,
            data: response,
            message: "Item Updated"
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