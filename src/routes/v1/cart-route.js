const express = require("express");
const { CartController } = require("../../controllers/index");
const router = express.Router();

router.post("/", CartController.create);
router.delete("/:id", CartController.destroy);
router.get("/:id", CartController.get);
router.patch("/:id", CartController.update);

module.exports = router;