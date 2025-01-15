const mongoose = require('mongoose');
require('dotenv').config();

exports.databaseConnect = () => {
   mongoose.connect(process.env.MONGODB_URL, {})
      .then(() => {
         console.log('DATABASE Connection Established');
      })
      .catch(() => {
         console.log('DATABASE Connection FAILED');
         process.exit(1);
      })
}