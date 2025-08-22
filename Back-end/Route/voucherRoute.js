const express = require("express");
const router= express.Router();
const {authMiddleware, requireAdmin}= require("../Middleware/authMiddleware");
const Controller= require("../Controller/voucherController");

router.get("/", Controller.get);
router.get("/:name", Controller.getvoucherbyname);
router.post("/", authMiddleware, requireAdmin, Controller.post);
router.patch("/:id", authMiddleware, requireAdmin, Controller.patch);
router.delete("/:id", authMiddleware, requireAdmin, Controller.delete);
module.exports= router; 