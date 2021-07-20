# node 相關套件

## nodemon

因為使用 nodejs 開發時，在終端機輸入 node XXXX.js 完後，雖然在連線中，你再去做該檔案的其它程式碼修改完存檔後，<br>
nodejs 並不會執行你修改完後的程式，必須要 **ctrl+C** 關閉後再重啟，這樣很煩，<br>
所以安裝此套件，會讓你在執行 node XXXX.js 後修改程式碼暗下儲存鍵會自動重啟~~~~~很方便。<br>
還有，也會遇到很長的檔案名稱要輸入時，每次輸入也可能打錯，倒不如設定好以下執行的指令，用簡單的 npm run dev 指令去替代執行。

```ruby
npm i -g nodemon  (通常裝到全域)
```

下載點:https://www.npmjs.com/package/nodemon<br>
下載完後到 package.json 設定檔設定 dev 這個指令<br>

```ruby
"scripts":{
    "XXX":"xxxxxxxxx",
    "XXX":"xxxxxxxxxxxxxx",
    "dev": "node server.js"  ()
}
```

使用方法:<br>
在終端機輸入 npm run dev 指令，就會執行 node server.js<br>
所以可以自行設計自己想要執行的檔案<br>
