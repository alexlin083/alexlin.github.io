# 事件 (event-driven language)

> 1.  建立事件聆聽功能
>
>         一個物件 + 一個事件 + 一個處理函數
>
>         (1). 寫在.html

> ```ruby
> <body onload="doFirst()"></body>
> <button onclick="doNothing()"></button>
> ```

>         (2). 寫在.js (傳統的寫法)

```ruby
window.onload = doFirst;
window.onload = function(){};
按鈕物件.onclick = doNothing;
```

>         (3). 寫在.js (W3C 的推薦方式)

```ruby
window.addEventListener('load',doFirst);
>     load, click | event
>     onload, onclick | event handler
```

> 2.  事件分類
>
>     (1). 輸入裝置(滑鼠)
>     click | mousedown | mouseup
>     dblclick | contextmenu
>     mousemove
>     mouseover | mouseout (支援冒泡事件)
>     mouseenter | mouseleave (沒有支援冒泡事件)
>     (2). 鍵盤
>     keypress | keydown | keyup
>     (3). 瀏覽器
>     load | unload | beforeunload
>     paste | copy | cut
>     scroll | resize (window)
>     (4). 表單
>     submit | reset
>     focus | blur
>     change | select | input
>     theForm.onreset = function(){
>     return confirm('Are you sure you want to reset the form?');
>     }

> 3.  事件物件的屬性和方法
>
>     - 屬性
>       target
>       type
>       clientX | clientY
>       pageX | pageY
>     - 方法
>       preventDefault() //取消預設行為
>       stopPropagation() //阻止冒泡事件
>     - 舉例
>       theButton.onclick = function(e){
>       ***
>       | 只要在此，有使用任何一個事件物件的屬性或方法 |
>       | 就要引用事件物件 |
>       ***
>       };

> 4.  引用事件物件
