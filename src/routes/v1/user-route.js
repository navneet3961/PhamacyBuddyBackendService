const express = require("express");
const { UserController } = require("../../controllers/index");
const router = express.Router();
const UserMiddleware = require("../../middlewares/user-middleware");

router.post("/signup", UserMiddleware.validateCreate, UserController.create);
router.post("/signin", UserMiddleware.validateSignIn, UserController.signIn);
router.post("/", UserController.verifyToken);
router.delete("/:id", UserController.destroy);
router.get("/:id", UserController.get);
router.get("/", UserController.getAll);
router.patch("/:id", UserMiddleware.validateUpdate, UserController.update);

module.exports = router;