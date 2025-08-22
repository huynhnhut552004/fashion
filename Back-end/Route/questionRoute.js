const express = require("express");
const router= express.Router();
const {authMiddleware, requireAdmin}= require("../Middleware/authMiddleware");
const Controller= require("../Controller/questionController");

router.post("/", Controller.post);
router.get("/", authMiddleware, requireAdmin, Controller.get);
router.delete("/:id", authMiddleware, requireAdmin, Controller.delete);
module.exports=router;