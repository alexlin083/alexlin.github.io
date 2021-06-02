# 5/29、30 筆記

### XMLHttpRequest

```ruby
asyncBtn.addEventListener("click", function(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET" , Url , true);
    //發出請求後回來要做的事
    xhr.onload = function(){
    message.innerText = `非同步請求 Load ${this.responseText}`;
        };
    //要send出
    xhr.send();
    })
```

1. 對某個網站發出請求

- HTTP method:GET、POST...
- async: true / false
- 對 某個網站 發出一個 GET 方法的請求， true=>非同步 ， false=>同步

2. 打開網站拿到回覆後，需要做甚麼事
3. 記得要送出"send()"

| Method | async | send() |
| :----- | :---: | -----: |
| GET    | true  |   都要 |
| POST   | false |   都要 |

### .gitignore 忽略清單

1. 打上檔名，就不會出現在 git 上面<br>
2. 要放進 git 裡，讓專案裡的其他人同步<br>
   gitignore generator 供人參考那些資料不須放<br>
   <https://www.toptal.com/developers/gitignore>

### npm

主版本.次版本.patch 版<br>
“axios”: " ^ 0 . 21 . 1 "

主版本:較大的更新，甚至可比不相容前面的版本<br>
次版本:更新要相容前一個版本<br>
patch 版:修 bug...等

^: 只會執行 "不更改最左邊的非零數字" 的更新<br>
^1.2.3 < 2.0.0 => 最左邊數字 1 不動，跟新第 2、3 的數字<br>
^0.2.3 < 0.3.0 => 最左、中間 數字不動，跟新右邊數字

`~ : 只跟新 patch`<br>
看不懂的話，我有 5/29 下午的錄影教學 20:00`~`37:00 可以看 ，但請您自己通靈

ex: cowsay 套件

```bash
npm view cowsay versions (加上s檢視所有版本)
npm view cowsay version 檢視最新版
npm i cowsay@1.1.3 安裝特定版本
```

1. 加上 .gitignore -> node_modules
2. npm i cowsay@1.1.3<br>
   移除 node_modules<br>
   npm i -> 觀察 package-lock 1.1.3<br>
   npm update -> 觀察 package-lock 1.5.0<br>
   npm i cowsay@1.3.0 -> 觀察 package-lock 1.3.0<br>
3. package.json, package-lock.json push git

### npx

    1. 輕鬆地執行本機的命令 （不管是全域的，或是專案底下的）
    2. 不用安裝命令，就能利用 npx 來執行 （偷偷幫你下載安裝，執行完後刪除）

```bash
npm install -g @vue/cli
vue create my-project
```

```bash
npx @vue/cli create my-project
```

```bash
# Print the effective node_modules folder to standard out.
npm root
npm root -g
```

### callback

我的 callback hell 範例<br>
https://github.com/alexlin083/nodejs-mfee16/blob/master/basic/callback1.js

解決方案:promise

### Promise

1.  是一個表示非同步運算的"最終" 完成或失敗 的物件
2.  最基礎的寫法
3.  設一個斷點，避免程式繼續跑下去
4.  catch() 錯誤時執行這行函式
5.  最初目的想改善 callback hell

    單一個 then() =>promise<br>
    https://github.com/alexlin083/nodejs-mfee16/blob/master/basic/promise.js<br>
    多個 then() => promise<br>
    https://github.com/alexlin083/nodejs-mfee16/blob/master/basic/promise2.js

```bash
new Promise(function(resolve, reject) {
    // 會判斷成功或失敗，決定要回哪一個
    // 成功
    resolve("回傳結果");
    // 失敗
    reject("回傳失敗")
})
```

#### Example

```ruby
Promise.all(iterable);
```

參考我的 promise.all()程式 <br>
https://github.com/alexlin083/nodejs-mfee16/blob/master/basic/promise4.js

在 promise.all()使用中，全部 promise 都 "resolve"，才會 resolve<br>
**但只要其中有任何一個 promise 是 "reject" ，則不管其他是，才會 resolve，結果就是 reject**

```ruby
Promise.race(iterable);
```

參考我的 promise.race()程式 <br>
https://github.com/alexlin083/nodejs-mfee16/blob/master/basic/promise4-race.js

在 promise.race()使用中，只管「最快被執行」的 "resolve" 或 "reject"，其他不管<br>

1. 最快的 promise 是 resolve，則 "resolve"。
2. 最快的 promise 是 reject，則 "reject"。

promise 延伸閱讀案:<br>
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

### await

https://github.com/alexlin083/nodejs-mfee16/blob/master/basic/await.js

1. await 運算子可被用來等待 `Promise`，只能在 `async function`內使用。
2. 增加可讀性
3. 大量非同步
4. 沒有 then / catch， 自己需加 try/catch 來設定，免得瀏覽器因寫錯而壞掉

### nodejs 時間表示套件(moment)

https://momentjs.com/

### API tutorials 教學

https://github.com/andy6804tw/RESTful_API_start_kit <br>
https://andy6804tw.github.io/2017/12/27/middleware-tutorial/

---

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
