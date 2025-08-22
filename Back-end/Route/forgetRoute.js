const express = require("express");
const router= express.Router();
const Controller= require("../Controller/forgetController");

router.post("/", Controller.checkEmail)
router.patch("/:id", Controller.restore);
module.exports=router;