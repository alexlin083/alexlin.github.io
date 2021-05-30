// $ npm install axios
// https://www.twse.com.tw/exchangeReport/STOCK_DAY?
// response=json
// &date=20210524
// &stockNo=2615
//test
//teach from : https://www.youtube.com/watch?v=MkwQ7duA-t0
//           : https://ykloveyxk.github.io/2017/02/25/axios%E5%85%A8%E6%94%BB%E7%95%A5/
//使用axios發出一個ajax請求，然後透過ajax的請求拿到我們要的資料(json檔)

//若是要傳送多個參數 ，建議放在物件(params)裡
//如:axios.get('/user',{
//          params:{
//              name : alex
//  }
//})
//res=> response(回應):客戶端傳送資訊給伺服器端
//req=> request(請求):伺服器端傳送資料給客戶端

const axios = require("axios");

// TODO: 從 stock.txt 讀股票代碼進來
// filesystem
// npm i fs ??? -> 不用
const fs = require("fs");

fs.readFile("stock.txt", "utf8", (err, data) => {
  if (err) {
    return console.error("讀檔錯誤", err);
  }
  console.log(`讀到的 stock code: ${data}`);

  axios
    .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
      params: {
        response: "json",
        date: "20210523",
        stockNo: data,
      },
    })
    .then(function (response) {
      if (response.data.stat === "OK") {
        console.log(response.data.date);
        console.log(response.data.title);
      }
    });
});

//...............................................................................................

//GET
// axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20210524&stockNo=2615')
// .then(res =>{
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })

//GET(params)
// axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY',{
//     params:{
//         response:"json",
//         date:"20210524",
//         stockNo:"2615"
//     }
// })
// .then(res =>{
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })

//POST
// axios.post('https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20210524&stockNo=2615', {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
// })
// .then(res => {
//     console.log(response);
// })
// .catch(err => {
//     console.log(error);
// });
