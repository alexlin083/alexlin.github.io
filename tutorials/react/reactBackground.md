# React 裡的 CSS Background 屬性會吃到全域

用 react 寫專題時，在會員註冊頁的 CSS 檔裡的 **background: url(圖片路徑);** 嵌入圖片，<br>
然後發現在別頁的 background 沒設定任何參數，卻吃到會員註冊頁的圖片當背景<br>

A.js->import A.css<br>
B.js->import B.css<br>
B.js 卻會吃到 A.css 裡面的 background: url( )<br>
B.css 裡面沒有使用 background，有跟 A 同樣的 className<br>

```ruby
------------------------
檔案路徑:
src
|-assets
|    |-A.css
|    |-B.css
|
|-components
|    |-A.js
|    |-B.js
|
--------------------------
```

使用的解決方式就是 inline style ，把 background 寫在要呈現的那個 className 裡面

```ruby
<aside className="memberAside" style={{ backgroundImage: `url(${background})` }}>

```
