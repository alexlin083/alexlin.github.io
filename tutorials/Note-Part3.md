# 日期:20210605、06

# node express(框架)

參考: <br>
https://developer.mozilla.org/zh-TW/docs/Learn/Server-side/Express_Nodejs/Introduction<br>
http://expressjs.com/en/starter/hello-world.html

安裝

```ruby
npm install express --save
npm install express-generator -g   (產生器) -g(安裝在全域)

express --view=ejs  (產生cookie、debug、ejs、express、http-errors、morgan這6個套件)
npm install  ()
npm start  (開啟應用程式)
```

載入 express

```ruby
let express = require("express");//載入express模組。指定給變數express
let app = express(); //使用express。指定給變數app。
let port = 3000; //設定port位置。指定3000 port給變數port

//監聽 port
app.listen(port, function(){
    console.log("伺服器已經啟動在 http://XXXXXX:3000/")
});

//當使用者連到根目錄 ("/") 時，做出回應
app.get("/" , function(req , res) {
    res.send('Hello World!');
);}
```

## 中介函式、中介軟體、中間介 (middleware)

> 是一個可以接收 request 和 response 物件的函式（function）。
> 每個中介軟體可以針對所收到的物件進行修改處理或是解析處理，處理完畢後再決定是否繼續傳給下個中介軟體或是中斷傳遞行為。
> 「下一個」通常以名為 next 的變數表示。如果現行中介軟體函數不會結束要求/回應循環，
> 它必須呼叫 next()，以便將控制權傳遞給下一個中介軟體函數。否則，要求將會停擺。
> 換句話說，中介軟體是一個使用三個引數（有時候是四個引數）的函式：一個「請求」、一個「回應」，及一個「下一個」。

> 如有 3 個 get，會呼叫 3 次

```ruby
app.use(function (req, res, next) {
  let timeNow = new Date();
  console.log(`有人來敲門 on ${timeNow}`);
  //要呼叫next()，才會繼續往下  ***有例外 :
  next();
});
app.get(XX)
app.get(XXX)
app.get(XXXX)
```

## 建立 express 專案

```ruby
npm install express-generator -g   //裝在全域(-g)
npx express --view=pug myweb       //一次安裝基本express所有套件(記得在專案底下環境執行)  也可以裝在全域
npm i                              //pakage-lock.json(套件管理檔)
```

## cookie

寫入 cookie，並加入過期時間(使用 GMT 時間)

```ruby
document.cookie = "username=alex; expires=Mon, 12 Jun 2021 09:10:55 GMT; path/"
```

GMT 時間(格林威治標準時間)

- new Date().toGMTString()

寫入 cookie，10 秒後消失

```ruby
router.get("/", function (req, res, next) {
  console.log(req.cookies);
  res.cookie("name", "banana", {
    maxAge: 10000,
    httpOnly: true, //瀏覽器的console上無法抓到，即隱藏起來
  });
  res.render("index", { title: "Express" });
});
```

- 數據的傳輸(夾帶哪些資訊給 server)
- res.cookie() 前端傳給後端
- maxAge: 幾秒後消失 cookie
- httpOnly: 不會顯示在 瀏覽器的 console 上，但 Application 還是會有
- 瀏覽器->檢查->Network->Headers->Response Headers 裡有 Set-Cookie: (會有詳細 cookie 資訊)

## session

[session-Github](https://github.com/expressjs/session)
[IT 幫幫忙 session](https://ithelp.ithome.com.tw/articles/10228375)

- 儲存在伺服器的暫存資料，此暫存可放在記憶體或資料庫上。
- session 可在 cookie 上儲存一筆便是你是誰的 session ID。

安裝:

```ruby
npm install express-session
```

```ruby
var session = require("express-session");

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
```

- secret: 會用它自己的編碼方式編寫(資安問題)
- cookie：儲存 sessionID 的 Cookie 的形式。
- genid：產生 sessionID 的方式。
- name：儲存 sessionID 的那個 Cookie 的名稱。
- resave：即使 Session 沒做變動，是否強制重新儲存進 Store。
- rolling：是否每次 Request 都強制更換 sessionID。
- saveUninitialized：是否強制將未初始化的 Session 儲存至 Store。（新產生的 Session）
- secret：用來認證該 Session 的資料。（必填）
- store：儲存 Session 的地方。
- unset：設定是否刪除或保留。（'destroy' 或 'keep'）
