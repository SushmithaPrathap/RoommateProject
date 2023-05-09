// import passport from "passport";
// import * as jwt from "jsonwebtoken";

const passport = require('passport')
const jwt = require("jsonwebtoken")
const dev = process.env.NODE_ENV !== "production"

exports.COOKIE_OPTIONS = {
    httpOnly: true,
    // Since localhost is not having https protocol,
    // secure cookies do not work correctly (in postman)
    secure: !dev,
    signed: true,
    maxAge: 2 * 60 * 60 * 1000,
    sameSite: "none",
  }
  
  exports.getToken = user => {
    return jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: 60 * 15,
    })
  }
  
  exports.getRefreshToken = user => {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: 60 * 60 * 24 * 30,
    })
    return refreshToken
  }
  
  exports.verifyUser = passport.authenticate("jwt", { session: false })