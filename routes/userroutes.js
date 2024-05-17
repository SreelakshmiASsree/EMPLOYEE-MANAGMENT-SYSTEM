const express = require("express");
const router = express.Router();
const { registerUser, loginUser, otpVerify ,logout} = require("../controller/userController");

router.route("/otp").post(otpVerify)
router.route("/signUp").post(registerUser);
router.route("/signIn").post(loginUser);
router.route('/logout').get(logout);

module.exports = router;
