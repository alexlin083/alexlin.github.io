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

先start
再執行IIFE(過一秒後執行Timeout)
end 會先跑出來


--------------------------------------------------------------------------
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
Timeout


--------------------------------------------------------------------------
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
foo
bar
baz
呼叫foo()後
按照順序執行foo、bar()、baz()

--------------------------------------------------------------------------
(4) 請問下列程式執行的結果為何？為什麼？

const bar = () => console.log("bar");

const baz = () => console.log("baz");

const foo = () => {
  console.log("foo");
  setTimeout(bar, 0);
  baz();
};

foo();

Ans:
foo
baz
bar

呼叫foo()
foo、baz立即執行
setTimeout(bar, 0);過不到1秒執行
--------------------------------------------------------------------------