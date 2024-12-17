const express = require("express");
const router = express.Router();
const { paginate } = require("../middleware/paginationMiddle");
const controllers = require("../controllers/shippingController");
const shippingModel = require("../models/shipping.Model");

router.get("/all", paginate(shippingModel));
router.get("/view/:id", controllers.getShippingById);
router.delete("/delete/:id", controllers.deleteShipping);
router.put("/update/:id", controllers.updateShipping);
router.post("/create", controllers.createShipping);

module.exports = router;
