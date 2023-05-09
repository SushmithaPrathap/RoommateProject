import mongoose from "mongoose";

/**
 * @desc crestes a schema
 */
const Schema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

Schema.virtual("id", () => this._id.toHexString()); //creating vitual properties of schema using this function
Schema.set("toJSON", { virtuals: true });

const model = mongoose.model("announcement", Schema);

export default model;
