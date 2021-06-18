//引用car
const item = require("./car");

//測試抓到甚麼資料
console.log(item);
console.log(item.getColor());

//更改car裡面的setColor物件內容
item.setColor("Red");

console.log(item.getColor());
