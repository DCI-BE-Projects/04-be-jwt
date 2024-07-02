//single function to verify token
import jwt from "jsonwebtoken";

export default (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token) return res.status(401).send("Access Denied");
    const decode = jwt.verify(token, "randomString");
    req.user = decode.user;
    next();
  } catch (error) {
    res.send("Invalid token!");
  }
};