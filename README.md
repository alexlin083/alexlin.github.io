# Nodejs 練習
## 讀書筆記
連結:https://www.youtube.com/watch?v=8aGhZQkoFbQ&ab_channel=JSConf

-------------------------影片中的01:00~04:30 重點-------------------------

一、JavaScript是一種單執行緒的程式語言、單執行緒的Runtime、單執行緒的呼叫堆疊(the call stack)
    單執行緒(single-thread):一次只能做一件事(程式一次只能跑一段程式碼)


二、V8 引擎就是Chrome中的Runtime

三、setTimeout、DOM、HTTP請求...有點像是用JavaScript,想到非同步時會用的第一樣東西，並不是在V8引擎裡!!!

四、Web API是瀏覽器提供的額外東西
    Ex: DOM 、 AJAX 、 Event Loop 、 callback queue(回調佇列)


-------------------------影片中的04:30~12:50 重點-------------------------
一、Call Stack 是一種資料結構(堆疊 First In Last Out)

二、如果我們希望人們能看到流暢的UI，我們就不能阻塞Stack
    目前所學到最簡單解法就是Async Callback(非同步回調)

三、瀏覽器中幾乎沒有Blocking(阻塞式) 函式
    在Node裡也一樣，都是Async(非同步)

四、我們使用的其實是C++ API，而不是Web API，而執行緒是讓C++ API從你眼前隱藏起來

五、再次強調JavaScript是一種單執行緒的程式語言、、單執行緒的Runtime
    單執行緒:一次只能做一件事(程式一次只能跑一段程式碼)


-------------------------影片中的12:50~17:15 重點-------------------------
Ex:
```bash
console.log("Hi");
setTimeout(function cb(){
    console.log("there");
},5000);

console.log("JSConfEU");
```
1.main() 方法先進入stack,
2.console.log("Hi"); ->進入stack,
3.Console出 Hi,
4.console.log("Hi"); ->從stack移除,
5.setTimeout(function cb()); ->進入stack,
6.瀏覽器為你啟動一個5秒的計時器，此時表示setTimeout已經呼叫,cb()跑到Web API,
7.setTimeout(function cb()); ->從stack移除,
8.console.log("JSConfEU"); ->進入stack,
9.Console出 JSConfEU,
10.console.log("JSConfEU"); ->從stack移除,
11.移除之後，Web API 中有一個5秒的計時器，不會將東西丟回stack(因為丟回stack的話，該段程式碼會隨機出現在你的程式碼中)
    所以這裡就是 "任務佇列" 或 "回調佇列" 發揮作用,
12.跑完5秒後,Web API會將cb()回調送到 "任務佇列("task queue")
13.事件循環(event loop)就會查看 "stack" 並查看 "task queue"裡面「按照順序排列」的有幾個待處理,
14.如果 "stack" 是空的,將 "task queue" 的第一個推回 "stack",
15.執行cb(),
16.Console出 there.
此段程式流程結束

補充: setTimeout秒數設為0時，跟上述同樣動作，差別在於cb()跑到Web API後,馬上又到task queue

