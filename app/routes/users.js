const express = require("express");
const router = express.Router();

const usersLogic = require("../controllers/users");
const validate = require("../validator/validate");

// signup
router.post("/signup", validate.validateSignupUser, usersLogic.signup);

// login
router.post("/login", validate.validateLoginUser, usersLogic.login);

module.exports = router;
