const Comment = require("../models/Comment");
const User = require("../models/User");
const Doubt = require("../models/Doubt");

exports.createComment = async (req, res) => {
   try {

      const { title, userId, doubtId } = req.body;

      if (!title || !userId || !doubtId) {
         return res.status(400).json({
            success: false,
            message: "All fields are mandatory",
         })
      }

      const user = await User.findOne({
         _id: userId
      })

      if (!user) {
         return res.status(404).json({
            success: false,
            message: "User not Found with the given ID",
         })
      }

      const comment = await Comment.create({
         description: title,
         userId,
      })

      const doubt = await Doubt.findOneAndUpdate(
         { _id: doubtId },
         {
            $push: { comments: comment._id }
         },
         { new: true }
      ).populate({
         path: 'comments',
         populate: {
            path: 'userId'
         }
      })

      return res.status(200).json({
         success: true,
         message: "Comment created Successfully",
         data: doubt,
      })

   } catch (error) {
      return res.status(500).json({
         success: false,
         message: "Could not create comment",
         error: error.message,
      })
   }
}

exports.deleteComment = async (req, res) => {
   try {

      const { commentId, doubtId } = req.body;

      if (!commentId || !doubtId) {
         return res.status(400).json({
            success: false,
            message: "All fields are mandatory",
         })
      }

      const doubt = await Doubt.findOneAndUpdate(
         { _id: doubtId },
         {
            $pull: { comments: commentId }
         },
         { new: true }
      ).populate({
         path: 'comments',
         populate: {
            path: 'userId'
         }
      })

      await Comment.findByIdAndDelete(commentId);

      return res.status(200).json({
         success: true,
         message: "Comment delete Successfully",
         data: doubt,
      })

   } catch (error) {
      return res.status(500).json({
         success: false,
         message: "Could not delete the comment",
         error: error.message,
      })
   }
}
