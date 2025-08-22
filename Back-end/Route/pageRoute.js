const express = require("express");
const router= express.Router();
const {authMiddleware, requireAdmin}= require("../Middleware/authMiddleware");
const Controller= require("../Controller/pageController");

router.get("/:id", Controller.getById);
router.patch("/:id", authMiddleware, requireAdmin, Controller.patch);
module.exports= router;