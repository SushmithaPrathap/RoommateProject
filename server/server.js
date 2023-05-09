import "cors"
import express from "express";
import cookieParser from 'cookie-parser';
import './api/utils/connectdb.js'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import mongoose from "mongoose";
import cors from "cors";
import routes from "./api/routes/index.js";
import model from "./api/models/expense.js";
import './api/strategies/JwtStrategy.js'
import './api/strategies/LocalStrategy.js'
import './api/authenticate.cjs'
import passport from "passport";
import session from "express-session";
import { applyPassportStrategy } from "./api/strategies/JwtStrategy.js";
import { applyLocalPassportStrategy } from "./api/strategies/LocalStrategy.js";
import User from "./api/models/user.js";

if (process.env.NODE_ENV !== "production") {
  // Load environment variables from .env file in non prod environments
  dotenv.config()
}

const app = express();

const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : []
app.use(express.json());
app.use(express.urlencoded());
const corsOptions = {
  credentials:true,
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      console.log(origin)
      callback(new Error("Not allowed by CORS"))
    }
  },

  credentials: true,
}

app.use(cors(corsOptions));
app.options('*', cors());
app.use(session({
  secret: process.env.COOKIE_SECRET,
}));
app.use(cookieParser(process.env.COOKIE_SECRET))
applyPassportStrategy(passport)
applyLocalPassportStrategy(passport)
app.use(passport.initialize())
app.use(passport.session());
app.use(function(req, res, next) {
 console.log(req.headers);
 next();
});


routes(app);
const port = 9000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(eval(process.env.REFRESH_TOKEN_EXPIRY))

});
