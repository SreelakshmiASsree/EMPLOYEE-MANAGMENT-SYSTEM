const session = require("express-session");
const getSessionId = session({
    secret: "12345",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 7 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict'
    },

})

const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        return next();
    }
    else {
        return res.redirect('/signIn');
    }
}

module.exports = { isAuth, getSessionId };