import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthModel from "../models/AuthModel.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import crypto from "crypto"

const noUserError = "User doesn't exist.";
const invalidCredentialsError = "Invalid credentials.";
const generalError = "Something went wrong.";
const userExistsError = "User already exist.";
const passwordMatchError = "Passwords don't match.";
const noUserIdFoundError = "No user with that id";

dotenv.config();
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendConfirmationEmail = (name, email, confirmationCode) => {
  console.log("Check");
  transport
    .sendMail({
      from: process.env.EMAIL_SENDER,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:3000/confirm/${confirmationCode}> Click here</a>
          </div>`,
    })
    .catch((err) => console.log(err));
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  dotenv.config();

  try {
    const existingUser = await AuthModel.findOne({ email });

    if (!existingUser) return res.status(404).json({ message: noUserError });

    if (existingUser.status != "Active") {
      return res.status(401).send({
        message: "Pending Account. Please Verify Your Email!",
      });
    }

    //Check if passwords match by using bcrypts compare method
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: invalidCredentialsError });

    //If user exists and pw is correct, the json web token to send it to the frontend
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET,
      { expiresIn: "5s" }
    );

    const refreshToken = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.REFRESH_TOKEN_SECRET
    );

    return res.status(200).json({ result: existingUser, token, refreshToken });
  } catch (error) {
    return res.status(500).json({ message: generalError });
  }
};

export const register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    const existingEmail = await AuthModel.findOne({ email });
    const existingUsername = await AuthModel.findOne({ username });

    //check if user already exists in the database
    if (existingEmail || existingUsername)
      return res.status(409).json({ message: userExistsError });

    if (password !== confirmPassword)
      return res.status(412).json({ message: passwordMatchError });

    //hash the password with difficulty 12
    const hashedPassword = await bcrypt.hash(password, 12);

    const token = jwt.sign(
      { email: email, username: username },
      process.env.SECRET,
      {
        expiresIn: "1h",
      }
    );

    const verifyUserCode = crypto.randomBytes(40).toString("hex");

    const result = await AuthModel.create({
      email,
      password: hashedPassword,
      username: username,
      confirmationCode: verifyUserCode,
    });

    sendConfirmationEmail(
      result.username,
      result.email,
      result.confirmationCode
    );

    return res.status(200).json({ result: result, token });
  } catch (error) {
    return res.status(500).json({ message: generalError });
  }
};

export const editProfile = async (req, res) => {
  const { id: _id } = req.params;
  const username = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(noUserIdFoundError);

  const updatedUser = await AuthModel.findByIdAndUpdate(_id, username, {
    new: true,
  });
  return res.json(updatedUser);
};

export const fetchUser = async (req, res) => {
  try {
    const username = await AuthModel.findOne({ username });
    return res.status(200).json(username);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const verifyUser = (req, res) => {
  AuthModel.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      user.status = "Active";
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
      });
    })
    .catch((e) => console.log("error", e));
};
