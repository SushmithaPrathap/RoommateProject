import mongoose from "mongoose";

/**
 * @desc crestes a schema
 */
const Schema = new mongoose.Schema(
  {
    choreName: {
      type: String,
    },
    assignedTo: {
      type: String,
    },
    day: {
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

const model = mongoose.model("chorechart", Schema);

export default model;
