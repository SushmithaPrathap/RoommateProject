import mongoose from "mongoose";

/**
 * @desc crestes a schema
 */
const Schema = new mongoose.Schema(
  {
    itemName: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    unit: {
      type: String,
    },
    category: {
      type: String,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

Schema.virtual("id", () => this._id.toHexString()); //creating virtual properties of schema using this function
Schema.set("toJSON", { virtuals: true });

const model = mongoose.model("Shoppinglist", Schema);

export default model;
