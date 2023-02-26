const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const { audioValidationRules } = require("../validators/audioValidator");



router.post('/signup', authController.signup);
router.post("/login", authController.login);



module.exports = router;
