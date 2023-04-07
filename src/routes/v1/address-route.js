const express = require("express");
const { AddressController } = require("../../controllers/index");
const AddressMiddleware = require("../../middlewares/address-middleware");
const router = express.Router();

router.post("/", AddressMiddleware.validateCreate, AddressController.create);
router.delete("/:id", AddressController.destroy);
router.get("/:id", AddressController.get);

module.exports = router;