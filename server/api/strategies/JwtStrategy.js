import passport from "passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user.js'
// import { Strategy } from 'passport-local';

// var ExtractJwt = pj.ExtractJwt
 var JwtStrategy = Strategy
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET

// Used by the authenticated requests to deserialize the user,
// i.e., to fetch user details from the JWT.
// passport.use(
//   new JwtStrategy(opts, function (jwt_payload, done) {
//     // Check against the DB only if necessary.
//     // This can be avoided if you don't want to fetch user details in each request.
//     User.findOne({ _id: jwt_payload._id }, function (err, user) {
//       if (err) {
//         return done(err, false)
//       }
//       if (user) {
//         return done(null, user)
//       } else {
//         return done(null, false)
//         // or you could create a new account
//       }
//     })
//   })
// )


export const applyPassportStrategy = passport => {

    const options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    options.secretOrKey = process.env.JWT_SECRET    ;
    passport.use(
      new Strategy(options, (jwt_payload, done) => {
        User.findOne({ _id: jwt_payload._id }, function (err, user) {
          if (err) return done(err, false);
          if (user) {
            return done(null, user)
          }
          return done(null, false);
        });
      })
    );
  };