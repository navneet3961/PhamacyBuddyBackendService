const express = require("express");
const { UserController } = require("../../controllers/index");
const router = express.Router();
const UserMiddleware = require("../../middlewares/user-middleware");
const ValidationMiddleware = require("../../middlewares/validation_middleware");

router.post("/signup", UserMiddleware.validateCreate, UserController.create);
router.post("/signin", UserMiddleware.validateSignIn, UserController.signIn);
router.post("/isValidToken", UserMiddleware.validateToken, UserController.verifyToken);
router.delete("/:id", ValidationMiddleware.validUser, UserController.destroy);
router.get("/:id", ValidationMiddleware.validUser, UserController.get);
router.get("/", ValidationMiddleware.validAdmin, UserController.getAll);
router.patch("/:id", ValidationMiddleware.validUser, UserMiddleware.validateUpdate, UserController.update);

module.exports = router;