const express = require("express");
const { OrderController } = require("../../controllers/index");
const router = express.Router();

router.post("/", OrderController.create);
router.delete("/:id", OrderController.destroy);
router.get("/:id", OrderController.get);
router.patch("/:id", OrderController.update);

module.exports = router;