# variable

分成 not defined(從未被定義) || undefined(已被定義為變數，但沒有值)

## var

```ruby
var a =1;
function b(){
    console.log(a); //1
}

function a() {
  console.log(a); // undefined
  var a = 0;
  console.log(a); // 0
  b(); //呼叫function b()
}
```

1. 如果 function 內的 var 拿掉，a 則是全域變數，在 function 外 a 的值則會是 0。
2. 藉由 a() 內呼叫 b() ，會發現 a 值是 1，function a()的值不會引響到全域。
3. var 的作用域在程式碼寫完的當下就確定了
4. function 內找不到值的話，會往外一層找。

## let

```ruby
function b() {
  //在變數上方的區域。(暫時死區)
  let b = 0;
  //let 沒辦法在宣告變數前使用
}

```

1. 在變數上方的區域，即所謂的"暫時死區" ，這邊就是 b() 的暫時死區 not defined
2. let 沒辦法在宣告變數前使用
3. function 內找不到值的話，會往外一層找。

## const

```ruby
function c() {
  const c = 0;
    c = 1; //這樣是錯的

  //但如果是用物件方式則可以，如:
  const coustumer = {
    name: "alex",
    money: 100,
  };
  coustumer.name = "john";
  console.log(coustumer.name);// john
}

```

1. const 不能再次賦予值給變數(不能更改值)
2. 如果是用物件方式則可以
3. function 內找不到值的話，會往外一層找。

## 用 for 迴圈來看 var 跟 let

```ruby
for (let i = 0; i < 5; i++){
    console.log(i); //0~9
}
console.log(i); // i is not defined
```

```ruby
for (var i = 0; i < 5; i++){
    console.log(i); //0~9
}
console.log(i); // i=10
```

執行 2 段程式可看出:<br>

1. let 在 for 迴圈內執行完的值，只能在迴圈內使用
2. var 在 for 迴圈內執行完的值則會帶出迴圈外
