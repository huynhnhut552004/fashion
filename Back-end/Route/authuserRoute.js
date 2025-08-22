const express = require("express");
const router= express.Router();
const Signup= require("../Controller/signupController");
const Controller= require("../Controller/authuserController");

router.post("/login", Controller.loginUser);
router.post("/signup", Signup.accout);
module.exports= router;