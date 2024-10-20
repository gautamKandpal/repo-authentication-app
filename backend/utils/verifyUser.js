import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token);
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied not authenticated !" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token is not valid" });
    // Add user to request object
    req.user = user;
    next();
  });
};
