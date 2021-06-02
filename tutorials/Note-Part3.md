# 日期:20210605、06

# node express(框架)

參考:https://developer.mozilla.org/zh-TW/docs/Learn/Server-side/Express_Nodejs/Introduction

安裝

```ruby
npm install express --save
npm install express-generator -g   (產生器)

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
