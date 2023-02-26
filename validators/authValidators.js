const { body } = require("express-validator");

exports.audioValidationRules = () => {
  return [
    body("email").trim().notEmpty().withMessage("Email is required"),
    body("password").trim().notEmpty().withMessage("Password is required"),
    body("username").trim().notEmpty().withMessage("Username is required"),
  ];
};
