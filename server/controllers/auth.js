const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
   try {
      const { email, password, confirmPassword } = req.body;

      if (!email || !password || !confirmPassword) {
         return res.status(400).json({
            success: false,
            message: "All fields are necessary",
         })
      }

      if (password !== confirmPassword) {
         return res.status(400).json({
            success: false,
            message: "Password and Confirm-Password must be SAME",
         })
      }

      const userFound = await User.findOne({
         email: email,
      });

      if (userFound) {
         return res.status(400).json({
            success: false,
            message: "User is already Registered with Us",
         })
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const userCreation = await User.create({
         email,
         password: hashedPassword,
      })

      return res.status(200).json({
         success: true,
         message: 'User created Successfully',
         data: userCreation,
      })


   } catch (error) {
      return res.status(500).json({
         success: false,
         message: 'Could not create the User',
         error: error.message,
      })
   }
}

exports.login = async (req, res) => {
   try {

      const { email, password } = req.body;

      if (!email || !password) {
         return res.status(400).json({
            success: false,
            message: "All fields are necessary",
         })
      }

      const user = await User.findOne({ email });

      if (!user) {
         return res.status(404).json({
            success: false,
            message: "User Not Found",
         })
      }

      if (await bcrypt.compare(password, user.password)) {

         const payload = {
            email,
            id: user._id,
         }

         const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2h",
         });

         user.password = undefined;

         return res.status(200).json({
            success: true,
            message: 'Logged in Successfully',
            token,
            user,
         })
      }
      else {
         return res.status(401).json({
            success: false,
            message: 'Email or Password is incorrect!',
         })
      }

   } catch (error) {
      return res.status(500).json({
         success: false,
         message: 'Login Failure, Please try again',
         error: error.message
      })
   }
}