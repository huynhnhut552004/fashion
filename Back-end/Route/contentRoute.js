const express = require("express");
const router= express.Router();
const Controller= require("../Controller/contentController");
const {authMiddleware, requireAdmin}= require("../Middleware/authMiddleware");

router.patch("/:id", authMiddleware, requireAdmin, Controller.patch);
module.exports= router;
