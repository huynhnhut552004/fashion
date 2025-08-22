const express = require("express");
const router= express.Router();
const Controller= require("../Controller/authadminController");

router.post("/", Controller.loginAdmin);
module.exports= router;