const mongoose = require("mongoose");

const doubtSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
   },
   Date: {
      type: Date,
      default: Date.now()
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
})

module.exports = mongoose.model("Doubt", doubtSchema);