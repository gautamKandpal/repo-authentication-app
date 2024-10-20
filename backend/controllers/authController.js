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
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    //excluding password from data =>(validuser._doc)
    const { password: userHashPassword, ...rest } = validUser._doc;
    //sending a cookie JWT token
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

export const googleSignIn = async (req, res, next) => {
  try {
    const { name, email, photo } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      // case: if email exists in DB
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      //Exclude password in reponse
      const { password: userHashPassword, ...rest } = user._doc;
      //send a cookie with JWT token
      res.cookie("access-token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
      });

      console.log(user);
      // res.status(200).json({ token, ...rest });
      res.status(200).json(rest);
    } else {
      //case :if email doesn't exists
      // generating a temporary password for the user
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      // Creating a unique username to avoid collisions
      const userName =
        name.split(" ").join("").toLowerCase() +
        Math.floor(Math.random() * 1000).toString();

      const newUser = new User({
        username: userName,
        email,
        password: hashedPassword,
        profilePicture: photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "5d",
      });
      //Exclude password in reponse
      const { password: hashedGooglePassword, ...rest } = newUser._doc;

      res.cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
      });

      console.log(newUser);

      // res.status(201).json({ token, ...rest });
      res.status(201).json(rest);
    }
  } catch (err) {
    console.log("Error during Google Sign-in", err);
  }
};

export const signOut = (req, res) => {
  res.clearCookie("access_token").status(200).json({
    message: "Signout Successfully",
  });
};
