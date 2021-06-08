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

![picture](/../images/express.png)
