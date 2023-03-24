const express = require("express");
const router = express.Router();

const urlLogic = require("../controllers/url");
const validate = require("../validator/validate");

// create new url
router.post("/create", validate.url, urlLogic.createNewUrl);

// redirect to url
router.post("/redirect", validate.url, urlLogic.redirect);

module.exports = router;
