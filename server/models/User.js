const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   email: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   doubts: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Doubt"
      },
   ]
})

module.exports = mongoose.model("User", userSchema);