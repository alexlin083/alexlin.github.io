//var 、 let 、 const 的差異
var app = 3;

function a() {
  var app = 0;
}
console.log(app);

let baa = 9;
function b() {
  //在變數上方的區域，即所謂的"暫時死區" ，這邊就是 b() 的暫時死區
  // let baa = 0;
  //let 沒辦法在宣告變數前使用
  console.log(baa);
}

//const
const cpp = 5;
function c() {
  //const 不能再次賦予值給變數
  //   const cpp = 0;
  //   c = 1; //這樣是錯的
  console.log(cpp);
  //但如果是用物件方式則可以，如:
  const coustumer = {
    name: "alex",
    money: 100,
  };
  //
  coustumer.name = "john";

  console.log(coustumer.name);
}

for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i); //55555
  }, 0);
}
