const path = require("path");
exports.renderindex = (req, res) => {
   res.render("index");
}

exports.renderemployeedetails = (req, res) => {
   res.render("index2");
}

exports.rendersignIn = (req, res) => {
   res.render("signIn");
}

exports.rendersignUp = (req, res) => {
   res.render("signUp");
}

exports.renderotpVerify = (req, res) => {
   res.render("otp");
}