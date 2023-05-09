import mongoose from "mongoose";

/**
 * @desc crestes a schema
 */
const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    expenseName: {
      type: String,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
    amount: {
      type: Number,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    houseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "House",
    },
  },
  { versionKey: false }
);

Schema.virtual("id", () => this._id.toHexString()); //creating vitual properties of schema using this function
Schema.set("toJSON", { virtuals: true });

const model = mongoose.model("expense", Schema);

export default model;
