const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.auth = async (req, res, next) => {
   try {
      const token = req.header("Authorization").replace("Bearer ");


      if (!token) {
         return res.status(404).json({
            success: false,
            message: "Token is not Present"
         })
      }

      try {
         const decode = jwt.decode(token, process.env.JWT_SECRET);
         req.user = decode;

      } catch (error) {
         return res.status(400).json({
            success: false,
            message: "Token is not VALID",
         })
      }

      next();

   } catch (error) {
      return res.status(500).json({
         success: false,
         error: error.message,
         message: "Something went Wrong while validating the TOKEN"
      })
   }
}