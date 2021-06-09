//第一種建入資料庫的做法 Promise.all()  每筆資料 insert 的 promise
const axios = require("axios");
const fs = require("fs/promises");
const moment = require("moment");
const BusinessDay = moment().format("YYYYMMDD");
const mysql = require("mysql");
require("dotenv").config();
const Promise = require("bluebird");
//設定資料庫連線
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});
//connection->Promise化
connection = Promise.promisifyAll(connection);
// 用await版
(async function () {
  try {
    await connection.connectAsync();

    let data = await fs.readFile("stock.txt", "utf8");
    let array = await data.split(",");
    // console.log(`讀到的stockNo:${array[0]}、${array[1]}、${array[2]}`);
    for (let i = 0; i <= 2; i++) {
      //   console.log(array[1]);
      let stock = await connection.queryAsync(
        `SELECT stock_id FROM stock WHERE stock_id=${array[i]}`
      );
      //   console.log(stock);
      //stock.length <= 0 ， 如果我們輸入的代碼資料庫找不到，執行axios抓取
      if (stock.length <= 0) {
        let response = await axios.get(
          `https://www.twse.com.tw/zh/api/codeQuery?query=${array[i]}`
        );
        let stockNumber = response.data.suggestions.shift();
        let stockNoName = stockNumber.split("\t");
        //stockNoName[0],stockNoName[1]
        //抓取的資料有[stock_id, stock_name],寫入資料庫
        if (stockNoName.length > 1) {
          connection.queryAsync(
            `INSERT INTO stock (stock_id, stock_name) VALUES ('${stockNoName[0]}','${stockNoName[1]}');`
          );
        } else
          console.log(
            `該筆股票代號: ${stockNoName[0]} 不符合輸入資料庫參數設定`
          );
      } else console.log(`該筆股票代號: ${array[i]} 已建入過資料庫`);

      //到這一步表示stock資料庫已經有了或著已建入新的stock_id 跟 stock_name
      console.log(`查詢的股票: ${array[i]} 成交資料`);
      let analysisTransaction = await axios.get(
        `https://www.twse.com.tw/exchangeReport/STOCK_DAY`,
        {
          params: {
            response: "json",
            date: BusinessDay,
            stockNo: array[i],
          },
        }
      );
      //   console.log(analysisTransaction);

      if (analysisTransaction.data.stat !== "OK") {
        throw "查詢此筆失敗";
      }
      //處理資料
      // console.log(analysisTransaction.data.data);
      //promise.all()作法，每筆資料 insert 的 promise
      let insertPromises = analysisTransaction.data.data.map((item) => {
        item = item.map((value) => {
          return value.replace(/,/g, "");
        });
        //取出資料後，將日期轉換成資料庫的格式
        //文件寫法原本是replace( / 要轉換的符號 /g, )=>(/ //g,) ， 但因為//是註解，電腦無法判斷，故再中間的轉換符號再+\
        //replace轉換替代完後，parseInt()將字串轉成整數10進位 後 + 19110000
        //再由moment() 以 format()格式轉換成日期格式
        item[0] = parseInt(item[0].replace(/\//g, ""), 10) + 19110000; // 20210601
        item[0] = moment(item[0], "YYYYMMDD").format("YYYY-MM-DD"); // 2021-06-01
        //unshift()=>把data股票代號加入到item陣列的最前端
        item.unshift(array[i]);
        // console.log(item);

        //鍵入資料庫 stock_price
        //在多筆資料的情況下，VALUE 後面 可用(?) 來取代
        //單一筆則只能用 ? ，不能有括弧
        //MySQL -> IGNORE 避免"重複插入記錄"的方法=> 有鍵入過的資料會跳過 ， 超好用XD
        return connection.queryAsync(
          "INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES (?)",
          [item]
        );
      });
      //
      let insertResults = await Promise.all(insertPromises);
      console.log(
        `鍵入的股票代號(${array[i]})資料有: ${insertResults.length} 筆`
      );
    }
  } catch (err) {
    console.error(err);
  } finally {
    //最後最後，記得關閉資料庫
    connection.end();
  }
})();
