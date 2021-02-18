const { Router } = require("express");
const express = require("express");
const router = express.Router();
const {getRegister, postRegister} = require("../Controllers/registerControl")
const {getLogin, postLogin} = require("../Controllers/loginControl")
const {getReset, postReset, resetParams, resetFormSubmit} = require("../Controllers/resetPwControl")
const cookieParser = require("cookie-parser");

const verifyToken  = require("../Middleware/verifyuser")

router.get("/register",getRegister);

router.post("/register", postRegister);

router.get("/login",getLogin);

router.post("/login", postLogin);

router.get("/reset", getReset);

router.post("/reset", postReset);

router.get("/reset/:token", resetParams)

router.post("/resetPasswordForm", resetFormSubmit)

module.exports = router;