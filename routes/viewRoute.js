const express = require("express");
const router = express.Router();
const viewController = require("../controller/viewController");
const {isAuth} = require("../authentication");

router.get("/", isAuth ,viewController.renderindex);
router.get("/index2" , isAuth, viewController.renderemployeedetails);
router.get("/signUp",viewController.rendersignUp);
router.get("/signIn",viewController.rendersignIn);
router.get("/otp",viewController.renderotpVerify)

module.exports = router;

