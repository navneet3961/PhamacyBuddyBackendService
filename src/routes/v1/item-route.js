const express = require("express");
const { ItemController } = require("../../controllers/index");
const router = express.Router();
const ItemMiddleware = require("../../middlewares/item-middleware");

router.post("/", ItemMiddleware.validateCreate, ItemController.create);
router.delete("/:id", ItemController.destroy);
router.get("/:id", ItemController.get);
router.get("/", ItemController.getAll);
router.patch("/:id", ItemMiddleware.validateUpdate, ItemController.update);

module.exports = router;