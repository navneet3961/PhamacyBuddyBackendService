const express = require("express");
const { ItemController } = require("../../controllers/index");
const router = express.Router();
const { ValidationMiddleware, ItemMiddleware } = require("../../middlewares/index");

router.post("/", ValidationMiddleware.validAdmin, ItemMiddleware.validateCreate, ItemController.create);
router.delete("/:id", ValidationMiddleware.validAdmin, ItemController.destroy);
router.get("/:id", ValidationMiddleware.validUser, ItemController.get);
router.get("/", ValidationMiddleware.validUser, ItemController.getAll);
router.patch("/:id", ValidationMiddleware.validUser, ItemMiddleware.validateUpdate, ItemController.update);

module.exports = router;