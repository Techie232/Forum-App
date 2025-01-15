const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
   description: {
      type: String,
      required: true,
   },
   Date: {
      type: Date,
      default: Date.now()
   },
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   }
})

module.exports = mongoose.model("Comment", commentSchema);