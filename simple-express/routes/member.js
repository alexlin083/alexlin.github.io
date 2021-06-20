const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("會員中心");
});

module.exports = router;
