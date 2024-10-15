import User from "../model/userModel.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
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
