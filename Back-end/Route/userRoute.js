const express = require("express");
const router= express.Router();
const {authMiddleware, requireAdmin}= require("../Middleware/authMiddleware");
const Controller= require("../Controller/userController");

router.get("/", authMiddleware, requireAdmin, Controller.get);
router.patch("/:id", authMiddleware, requireAdmin, Controller.patch);
router.delete("/:id", authMiddleware, requireAdmin, Controller.delete);
module.exports= router;