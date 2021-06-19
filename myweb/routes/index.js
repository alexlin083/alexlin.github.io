var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log(req.cookies);
  req.session.username = "tom";
  req.session.email = "email";
  res.cookie("name", "banana", {
    maxAge: 10000,
    httpOnly: true, //瀏覽器的console上無法抓到，
  });
  res.render("index", { title: "Express" });
});

module.exports = router;
