const express = require("express");
const router= express.Router();
const Controller= require("../Controller/categoryController");
const {authMiddleware, requireAdmin}= require("../Middleware/authMiddleware");

router.get("/", Controller.get);
router.get("/:categoryId", Controller.getproduct); 
router.post("/",authMiddleware, requireAdmin, Controller.post);
router.patch("/:id",authMiddleware, requireAdmin, Controller.patch);
router.delete("/:id",authMiddleware, requireAdmin, Controller.delete);
module.exports= router;