const express = require("express");
const router= express.Router();
const {authMiddleware, requireAdmin}= require("../Middleware/authMiddleware");
const Controller= require("../Controller/orderController");

router.get("/", authMiddleware, requireAdmin, Controller.getOrderByUserId);
router.delete("/:id", authMiddleware, requireAdmin, Controller.delete);
router.post("/", authMiddleware, Controller.addOrder);
module.exports= router;