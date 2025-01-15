const express = require('express');
const router = express.Router();

const { createDoubt, getAllDoubts, getDoubtDetails } = require("../controllers/doubt");
const { auth } = require("../middlewares/auth")

router.post("/create", auth, createDoubt);
router.post("/getSpecificDoubt", auth, getDoubtDetails);
router.get("/getAll", getAllDoubts);

module.exports = router;