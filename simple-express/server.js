//資料連線
const connection = require("./utils/db");
require("dotenv").config();
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

//解讀POST 過來的middleware
app.use(express.urlencoded({ extended: false }));
//加入此使用 ，前端送json檔時，express 才能解析json檔
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//處理session
// 想要可以處理 session
// 產生一個 session id，可以透過這個 session id 來找到存在伺服器端的 session
// (不論這個 session 是存在記憶體、硬碟、資料庫、redis..)
// 問題是怎麼知道這一個 request 的 session 是誰？？？？
// ==> session id 存在 cookie
//     express-session 預設的 cookie name: connect.sid
//     如此一來，每次來的 request 都會帶著這個 session id
//     這樣就會知道這個 request 的 session 是誰
const expressSession = require("express-session");
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

// static
// 可以指定一個或多個目錄或是"靜態資源目錄"
// 自動幫你為 public 裡面的檔案建立路由
app.use(express.static("public"));
// 第一個 : views 變數 ， 第二個 : views 檔案夾名稱
app.set("views", "views");
// 告訴 express 我們用的 view engine 是 pug
app.set("view engine", "pug");

//把res.session 設定給 res  locals
app.use(function (req, res, next) {
  //把 request 的 session 資料設定給 res 的 locals
  //views 就可以拿到資料
  res.locals.member = req.session.member;
  next();
});
// locals 是 response 物件提供的一個屬性
// 讓我們可以傳遞資料到 views

//在登入後，寫一個彈跳視窗
app.use(function (req, res, next) {
  if (req.session.message) {
    res.locals.message = req.session.message;
    //登入後 刪除此登入訊息，不刪除的話，在登入的狀態每跳一頁面都會迸出訊息XD
    delete req.session.message;
  }
  next();
});

let stockRouter = require("./routes/stock");
app.use("/stock", stockRouter);
let apiRouter = require("./routes/api");
app.use("/api", apiRouter);
let authRouter = require("./routes/auth");
app.use("/auth", authRouter);
let memberRouter = require("./routes/member");
app.use("/member", memberRouter);

//路由router
app.get("/", function (req, res) {
  // res.send("這是express測試port 3000");
  console.log("這裡是首頁");

  res.cookie("lang", "zh-TW");

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
  console.log("啊啊啊，有人 404 了!!!");
  next();
});

// 所有的路由的下面
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
