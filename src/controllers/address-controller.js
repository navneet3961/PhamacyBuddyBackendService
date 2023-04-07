const { AddressService } = require("../services/index");

const addressService = new AddressService();

const create = async (req, res) => {
    try {
        const response = await addressService.create(req.body);
        return res.status(201).json({
            status: true,
            data: response,
            message: "Address Created Succesfully"
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
        const response = await addressService.delete(req.params.id);
        return res.status(200).json({
            status: true,
            message: "Address Deleted"
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
        const response = await addressService.get(req.params.id);
        return res.status(200).json({
            status: true,
            data: response,
            message: "Address found"
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
}