import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice.js";

export default function OAuth() {
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      // console.log(result);
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/google`,
        {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(res);
      const data = res.data;
      console.log(data);
      dispatch(signInSuccess(data));
    } catch (err) {
      console.log("could not login with google", err);
    }
  };

  return (
    <button
      type="button"
      className="bg-red-700 text-white  rounded-lg p-3 uppercase hover:opacity-95"
      onClick={handleGoogleClick}
    >
      continue with google
    </button>
  );
}
