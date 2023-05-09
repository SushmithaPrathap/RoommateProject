import mongoose from "mongoose";
import { Schema } from "mongoose";

import passportLocalMongoose from 'passport-local-mongoose';

const Session = new Schema({
    refreshToken: {
      type: String,
      default: "",
    },
  })
  
  const UserSchema = new Schema({
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    authStrategy: {
      type: String,
      default: "local",
    },
    points: {
      type: Number,
      default: 50,
    },
    refreshToken: {
      type: [Session],
    },
  })
  
  //Remove refreshToken from the response
  UserSchema.set("toJSON", {
    transform: function (doc, ret, options) {
      delete ret.refreshToken
      return ret
    },
  })
  
  UserSchema.plugin(passportLocalMongoose)
  

  const User = mongoose.model("User", UserSchema);

export default User;

