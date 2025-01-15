const Doubt = require('../models/Doubt');

exports.createDoubt = async (req, res) => {
   try {

      const { title } = req.body;

      if (!title) {
         return res.status(404).json({
            success: false,
            message: "Title can't be empty",
         })
      }

      const doubt = await Doubt.create({
         title
      })

      return res.status(200).json({
         success: true,
         message: "Doubt created Successfully",
         data: doubt,
      })

   } catch (error) {
      return res.status(500).json({
         success: false,
         message: "Could not create the Doubt",
         error: error.message,
      })
   }
}

exports.getAllDoubts = async (req, res) => {
   try {

      const data = await Doubt.find({});

      return res.status(200).json({
         success: true,
         message: "All doubts fetched Successfully",
         data: data,
      })

   } catch (error) {
      return res.status(500).json({
         success: false,
         message: "Could not fetch doubts",
         error: error.message,
      })
   }
}

exports.getDoubtDetails = async (req, res) => {
   try {

      const { doubtId } = req.body;

      if (!doubtId) {
         return res.status(400).json({
            success: false,
            message: "Doubt Id should be given",
         })
      }

      const response = await Doubt.findOne({
         _id: doubtId
      })
         .populate({
            path: 'comments',
            populate: {
               path: 'userId'
            }
         })

      if (!response) {
         return res.status(404).json({
            success: false,
            message: "No Doubt Found with the specific ID",
         })
      }

      return res.status(200).json({
         success: true,
         message: "Specific Doubt Fetched Successfully",
         data: response,
      })

   } catch (error) {
      return res.status(500).json({
         success: false,
         message: "Could not found Doubt with ID",
         error: error.message,
      })
   }
}
