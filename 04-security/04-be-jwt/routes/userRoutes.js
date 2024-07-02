import express from "express";
import {
  userLogin,
  userSignup,
  loggedIn,
  cookieUser,
} from "../controller/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//http://localhost:5000/user/signup
router.post("/signup", userSignup);

//http://localhost:5000/user/login
router.post("/login", userLogin);

//loggedIn
//http://localhost:5000/user/profile
router.get("/profile", auth, loggedIn);

router.get('/cookie', cookieUser);


export default router;