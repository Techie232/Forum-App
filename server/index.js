const express = require('express');
const app = express();
const cors = require('cors');
const { databaseConnect } = require("./config/databaseConn");
const authRoutes = require("./routes/auth");
const doubtRoutes = require("./routes/doubt");
const commentRoutes = require("./routes/comments");
const fileupload = require('express-fileupload');
require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use(fileupload());

databaseConnect();

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/doubt', doubtRoutes);
app.use('/api/v1/comment', commentRoutes);

app.get('/', (req, res) => {
   return res.json({
      success: true,
      message: "SERVER IS UP",
   })
})

app.listen(PORT, () => {
   console.log('Server is up and Running on ' + PORT);
})