import User from "../model/userModel.js";
import bcryptjs from "bcryptjs";
import { customErrorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    //hashing synchronous(password,saltRound)
    const hashPassword = bcryptjs.hashSync(password, 10);
    //create new user
    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();

    res.status(200).json({ message: "user created successfully" });
  } catch (err) {
    // res.status(500).json({ message: err.message });
    next(err);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(customErrorHandler(404, "User not found"));
    }
    //compare password with db password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(customErrorHandler(401, "Invalid credentials"));
    }
    //Token creation
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    //removing password from data(validuser._doc)
    const { password: userHashPassword, ...rest } = validUser._doc;
    //sending token as a cookie
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
      })
      .status(200)
      // .json(validUser);
      .json(rest); //send everything except password
  } catch (err) {
    next(err);
  }
};
