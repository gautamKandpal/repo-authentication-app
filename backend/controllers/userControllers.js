import bcryptjs from "bcryptjs";
import User from "../model/userModel.js";
import { CURSOR_FLAGS } from "mongodb";

export const userController = (req, res) => {
  res.json({
    message: "from controller",
  });
};

export const updateUser = async (req, res) => {
  console.log("req.user.id ==> ", req.user.id);
  console.log("req.params.id ==> ", req.params.id);

  if (req.user.id !== req.params.id) {
    return res.status(401).json({
      message: "Cannot update account ",
    });
  }

  try {
    // Hash password if it's being updated
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Update user information
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    // Destructure to omit the password from the response
    const { password: updatedPassword, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteUser = async (req, res) => {
  if (req.user.id !== req.params.id) {
    return res.status(401).json({
      message: "cannot delete account",
    });
  }

  try {
    const deleteAccount = await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "User has been deleted successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "User not found",
    });
  }
};
