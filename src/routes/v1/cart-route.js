const express = require("express");
const { CartController } = require("../../controllers/index");
const router = express.Router();

router.post("/", CartController.create);
router.delete("/:id", CartController.destroy);
router.get("/:id", CartController.get);
router.patch("/empty/:id", CartController.empty);
router.patch("/remove/:id", CartController.remove);
router.patch("/add/:id", CartController.add);

module.exports = router;