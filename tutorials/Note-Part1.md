# 5/23 讀書筆記

連結:https://www.youtube.com/watch?v=8aGhZQkoFbQ&ab_channel=JSConf

-------------------------影片中的 01:00~04:30 重點-------------------------

一、JavaScript 是一種單執行緒的程式語言、單執行緒的 Runtime、單執行緒的呼叫堆疊(the call stack)
單執行緒(single-thread):一次只能做一件事(程式一次只能跑一段程式碼)

二、V8 引擎就是 Chrome 中的 Runtime

三、setTimeout、DOM、HTTP 請求...有點像是用 JavaScript,想到非同步時會用的第一樣東西，並不是在 V8 引擎裡!!!

四、Web API 是瀏覽器提供的額外東西
Ex: DOM 、 AJAX 、 Event Loop 、 callback queue(回調佇列)

-------------------------影片中的 04:30~12:50 重點-------------------------

一、Call Stack 是一種資料結構(堆疊 First In Last Out)

二、如果我們希望人們能看到流暢的 UI，我們就不能阻塞 Stack
目前所學到最簡單解法就是 Async Callback(非同步回調)

三、瀏覽器中幾乎沒有 Blocking(阻塞式) 函式
在 Node 裡也一樣，都是 Async(非同步)

四、我們使用的其實是 C++ API，而不是 Web API，而執行緒是讓 C++ API 從你眼前隱藏起來

五、再次強調 JavaScript 是一種單執行緒的程式語言、、單執行緒的 Runtime
單執行緒:一次只能做一件事(程式一次只能跑一段程式碼)

-------------------------影片中的 12:50~17:15 重點-------------------------

### Ex:

```bash
console.log("Hi");
setTimeout(function cb(){
    console.log("there");
},5000);

console.log("JSConfEU");
```

1.main() 方法先進入 stack,<br>
2.console.log("Hi"); ->進入 stack,<br>
3.Console 出 Hi,<br>
4.console.log("Hi"); ->從 stack 移除,<br>
5.setTimeout(function cb()); ->進入 stack,<br> 6.瀏覽器為你啟動一個 5 秒的計時器，此時表示 setTimeout 已經呼叫,cb()跑到 Web API,<br>
7.setTimeout(function cb()); ->從 stack 移除,<br>
8.console.log("JSConfEU"); ->進入 stack,<br>
9.Console 出 JSConfEU,<br>
10.console.log("JSConfEU"); ->從 stack 移除,<br> 11.移除之後，Web API 中有一個 5 秒的計時器，不會將東西丟回 stack(因為丟回 stack 的話，該段程式碼會隨機出現在你的程式碼中)<br>
所以這裡就是 "任務佇列" 或 "回調佇列" 發揮作用,<br> 12.跑完 5 秒後,Web API 會將 cb()回調送到 "任務佇列("task queue")<br> 13.事件循環(event loop)就會查看 "stack" 並查看 "task queue"裡面「按照順序排列」的有幾個待處理,<br> 14.如果 "stack" 是空的,將 "task queue" 的第一個推回 "stack",<br> 15.執行 cb(),<br>
16.Console 出 there.<br>
此段程式流程結束<br>

補充: setTimeout 秒數設為 0 時，跟上述同樣動作，差別在於 cb()跑到 Web API 後,馬上又到 task queue

---
