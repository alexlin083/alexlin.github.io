const express = require("express");
let app = express();
let port = 3000;

app.use(function (req, res, next) {
  let timeNow = new Date();
  console.log(`有人來敲門 on ${timeNow}`);
  //要呼叫next()，才會繼續往下  ***有例外 :
  next();
});

app.use(express.static("public"));
// app.use("/images", express.static(__dirname + "/Images"));

//路由router
app.get("/", function (req, res) {
  res.send("這是express測試port 3000");
});

app.get("/test", function (req, res) {
  res.send("這是express測試port 3000/路由test");
});

app.get("/about", function (req, res) {
  res.send("這是express測試port 3000/路由about");
});

app.listen(port, () => {
  console.log("這是port3000的測試頁");
});
