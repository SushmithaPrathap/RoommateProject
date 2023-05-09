import passport from "passport";
import LocalStrategy from "passport-local"
import User from '../models/user.js'



export const applyLocalPassportStrategy = passport => {
    passport.use(new LocalStrategy(User.authenticate()))
    passport.serializeUser(User.serializeUser())
    passport.deserializeUser(function(User, done) {
        // parsed user object will be set to request object field `user`
        done(null, User);

      });
  };