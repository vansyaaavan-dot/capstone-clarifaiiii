const express = require("express");
const router = express.Router();

const { predictHoax } = require("../controllers/predictController");

router.post("/", predictHoax);

module.exports = router;