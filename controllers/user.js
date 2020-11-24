import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import UserModal from "../models/User.js";

export const signin = async (req, res) => {
  if (req.body.email.trim() === "") {
    return res.status(400).json({ email: "Should not be empty" });
  } else {
    const regEx = /^([0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$/;
    if (!req.body.email.trim().match(regEx)) {
      return res.status(400).json({ email: "Enter a valid email" });
    }
  }
  if (req.body.password.trim() === "") {
    return res.status(400).json({ password: "Should not be empty" });
  }
  try {
    const oldUser = await UserModal.findOne({ email: req.body.email });
    if (!oldUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    const isPassCorrect = await bcrypt.compare(
      req.body.password,
      oldUser.password
    );
    if (!isPassCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: oldUser.email, id: oldUser.id },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(err);
  }
};

export const signup = async (req, res) => {
  if (req.body.email.trim() === "") {
    return res.status(400).json({ email: "Should not be empty" });
  } else {
    const regEx = /^([0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$/;
    if (!req.body.email.trim().match(regEx)) {
      return res.status(400).json({ email: "Enter a valid email" });
    }
  }
  if (req.body.password.trim() === "") {
    return res.status(400).json({ password: "Should not be empty" });
  } else if (req.body.password.trim().length < 6) {
    return res.status(400).json({ password: "Should be atleast 6 characters" });
  }
  if (req.body.confirmPassword.trim() === "") {
    return res.status(400).json({ confirmPassword: "Should not be empty" });
  } else if (req.body.password.trim() !== req.body.confirmPassword.trim()) {
    return res.status(400).json({ confirmPassword: "Password mismatch" });
  }
  try {
    const oldUser = await UserModal.findOne({ email: req.body.email });
    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const result = await UserModal.create({
      email: req.body.email,
      password: hashedPassword,
      profile: req.body.profile,
    });
    const token = jwt.sign(
      { email: result.email, id: result.id },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
