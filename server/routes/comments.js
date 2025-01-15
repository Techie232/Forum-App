const express = require('express');
const router = express.Router();

const { auth } = require("../middlewares/auth")
const { createComment, deleteComment } = require("../controllers/comment");

router.post("/create", createComment);
router.delete("/delete", deleteComment);

module.exports = router;