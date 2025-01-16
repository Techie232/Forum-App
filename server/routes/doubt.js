const express = require('express');
const router = express.Router();

const { createDoubt, listDoubts, getDoubtDetails } = require("../controllers/doubt");
const { auth } = require("../middlewares/auth")

router.post("/create", auth, createDoubt);
router.post("/getSpecificDoubt", auth, getDoubtDetails);
router.get("/listDoubts", listDoubts);

module.exports = router;