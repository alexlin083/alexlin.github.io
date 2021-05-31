//promise.race()
let p1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "one");
  reject("reject1");
});
let p2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 2000, "two");
});
let p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, "three");
});
let p4 = new Promise((resolve, reject) => {
  // setTimeout(reject, 4000, "four");
  reject("reject4");
});
let p5 = new Promise((resolve, reject) => {
  setTimeout(resolve, 5000, "five");
});

Promise.race([p1, p2, p3, p4, p5]).then(
  (values) => {
    console.log(values);
  },
  (reason) => {
    console.log(reason);
  }
);
//如果 let p4 內的函式換成reject("reject4");
//則會因為沒有設定時間而第一個執行
//若有2個同時間的reject，會執行最上面的 如 p1
