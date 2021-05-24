(1) 請問下列程式執行後的結果為何？為什麼？

console.log("start");

(function () {
  console.log("IIFE");
  setTimeout(function () {
    console.log("Timeout");
  }, 1000);
})();

console.log("end");

Ans:
start
IIFE
end
Timeout

Why:
先start
再執行IIFE(過一秒後執行Timeout)
等待的1秒鐘，end 會先console出來


------------------------------分隔線--------------------------------------
(2) 請問下列程式執行的結果為何？為什麼？
console.log("start");

(function () {
  console.log("IIFE");
  setTimeout(function () {
    console.log("Timeout");
  }, 0);
})();

console.log("end");

Ans:
start
IIFE
end
Timeout<br>
Why:
start先進 Stack 執行完後離開，立即執行function->console出IIFE，<br>
接著把console.log("Timeout") 丟到Callback Queue，在執行console.log("end"),<br>
接著even loop 發現 Stack 沒東西了，<br>
把Callback Queue 裡面的console.log("Timeout") 丟回執行.<br>

----------------------------------分隔線-----------------------------------------
(3) 請問下列程式執行的結果為何？為什麼？


const bar = () => console.log("bar");

const baz = () => console.log("baz");

const foo = () => {
  console.log("foo");
  bar();
  baz();
};

foo();

Ans:
foo <br>
bar <br>
baz <br>

Why:
呼叫foo()後
按照順序執行foo、bar()、baz()

----------------------------------分隔線-----------------------------------------
(4) 請問下列程式執行的結果為何？為什麼？

const bar = () => console.log("bar");

const baz = () => console.log("baz");

const foo = () => {
  console.log("foo");
  setTimeout(bar, 0);
  baz();
};

foo();

Ans: <br>
foo <br>
baz <br>
bar <br>

Why: <br>
呼叫foo() <br>
執行setTimeout(bar, 0); 丟到webAPI後,過0秒丟到 task queue <br>
然後執行baz(),console出"baz"<br>
event loop檢查stack 和 task queue <br>
stack 沒東西,從task queue推到stack執行<br>
再console出"bar"
