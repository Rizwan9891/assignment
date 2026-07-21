const express = require("express");
const router = express.Router();

const {
    createOrder,
    getOrders,
    getOrder,
    updateStatus,
    getStats,
} = require("../controllers/order.controller");

router.get("/stats", getStats);
router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrder);
router.patch("/:id/status", updateStatus);

module.exports = router;