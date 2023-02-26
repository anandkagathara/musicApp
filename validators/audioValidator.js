// validators/audioValidator.js

const { body } = require("express-validator");

exports.audioValidationRules = () => {
  return [
    body("name").trim().notEmpty().withMessage("Name is required"),
    // body("image").trim().notEmpty().withMessage("Image is required"),
    body("description").trim().notEmpty().withMessage("descriptionription is required"),
    // body("song").trim().notEmpty().withMessage("Song is required"),
  ];
};
