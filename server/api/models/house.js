import mongoose from "mongoose";



const HouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  users: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  }]
});

HouseSchema.virtual("id", () => this._id.toHexString()); //creating vitual properties of schema using this function
HouseSchema.set("toJSON", { virtuals: true });

const House = mongoose.model('House', HouseSchema);

export default House;
