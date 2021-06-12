var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log(req.cookies);
  res.cookie("name", "banana", {
    maxAge: 10000,
    // httpOnly: true,
  });
  res.render("index", { title: "Express" });
});

module.exports = router;
