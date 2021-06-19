//資料連線
const connection = require("./utils/db");
// http://expressjs.com/en/starter/hello-world.html
const express = require("express");
let app = express();
let port = 3000;

// middleware 中介函式、中介軟體
// 是一個可以接收request和response物件的函式（function）。
// 每個中介軟體可以針對所收到的物件進行修改處理或是解析處理，處理完畢後再決定是否繼續傳給下個中介軟體或是中斷傳遞行為。
// 「下一個」通常以名為 next 的變數表示。如果現行中介軟體函數不會結束要求/回應循環，
// 它必須呼叫 next()，以便將控制權傳遞給下一個中介軟體函數。否則，要求將會停擺。
// 換句話說，中介軟體是一個使用三個引數（有時候是四個引數）的函式：一個「請求」、一個「回應」，及一個「下一個」。
app.use(function (req, res, next) {
  let timeNow = new Date();
  console.log(`有人來敲門 on ${timeNow}`);
  //要呼叫next()，才會繼續往下  ***有例外 :
  next();
});
//在express裡
//req -> router
//req -> middlewares..........-> router

// static
// 可以指定一個或多個目錄或是"靜態資源目錄"
// 自動幫你為 public 裡面的檔案建立路由
app.use(express.static("public"));
// 第一個 : views 變數 ， 第二個 : views 檔案夾名稱
app.set("views", "views");
// 告訴 express 我們用的 view engine 是 pug
app.set("view engine", "pug");

let stockRouter = require("./routes/stock");
app.use("/stock", stockRouter);
let apiRouter = require("./routes/api");
app.use("/api", apiRouter);

//路由router
app.get("/", function (req, res) {
  // res.send("這是express測試port 3000");
  res.render("index");
});

app.get("/test", function (req, res) {
  res.send("這是express測試port 3000/路由test");
});
//如果有2個同路由，會執行第1個，所以express是由上而下執行
// app.get("/test", function (req, res) {
//     res.send("AAAAAAAAAAAAAAAAAAAA");
//   });

app.get("/about", function (req, res) {
  res.render("about");
});

app.use(function (req, res, next) {
  res.status(404);
  res.render("404");
});

app.use(function (err, req, res, next) {
  console.log(err.message);
  res.status(500);
  res.send("500 - Internal Server XXXXXXXX 請找管理員");
});

app.listen(port, async () => {
  await connection.connectAsync();
  console.log("這是port3000的測試頁");
});
