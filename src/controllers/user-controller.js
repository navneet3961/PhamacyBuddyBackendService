const { UserService } = require("../services/index");

const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create(req.body);
        return res.status(201).json({
            status: true,
            data: response,
            message: "User Created Succesfully"
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
        const response = await userService.delete(req.params.id);
        return res.status(200).json({
            status: true,
            message: "User Deleted"
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
        const response = await userService.get(req.params.id);
        return res.status(200).json({
            status: true,
            data: response,
            message: "User found"
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
        const response = await userService.getAll(req.query);
        return res.status(200).json({
            status: true,
            data: response,
            message: "Users found"
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
        const response = await userService.update(req.params.id, req.body);
        return res.status(201).json({
            status: true,
            data: response,
            message: "User Updated"
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

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            status: true,
            data: response,
            message: "User SignedIn Succesfully"
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

const verifyToken = async (req, res) => {
    try {
        const response = await userService.verifyToken(req.headers["x-access-token"]);
        return res.status(200).json({
            status: true,
            data: response,
            message: "User Token is Valid"
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
    signIn,
    verifyToken,
}