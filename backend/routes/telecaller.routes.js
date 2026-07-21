const express = require("express");

const router = express.Router();

const {
    createTelecaller,
    getTelecallers,
    getTelecaller,
    updateTelecaller,
} = require("../controllers/telecaller.controller");

router.post("/", createTelecaller);
router.get("/", getTelecallers);
router.get("/:id", getTelecaller);
router.put("/:id", updateTelecaller);

module.exports = router;