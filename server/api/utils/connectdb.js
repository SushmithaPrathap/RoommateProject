
import * as mongoose from "mongoose"

const connect = mongoose.connect("mongodb://localhost:27017/uuke", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  connect
  .then(db => {
    console.log("connected to db")
  })
  .catch(err => {
    console.log(err)
  })