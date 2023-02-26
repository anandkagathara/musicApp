const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const Joi = require("joi");

exports.signup = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const hashedPassword = await bcrypt.hash(password, 9);

    const user = {
      username,
      email,
      password: hashedPassword,
    };

    const findUserName = await User.findOne({ username: username });
    if (findUserName) {
      throw new Error("User already exists with this username");
    }
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      throw new Error("User already exists with this email");
    }

    await User.create(user);

    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    const schema = Joi.object({
      emailOrUsername: Joi.string().required(),
      password: Joi.string().min(6).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      throw new Error("Invalid email or username");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error("Invalid password");
    }
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
