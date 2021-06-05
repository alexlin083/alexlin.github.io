const axios = require("axios");
const fs = require("fs/promises");
const moment = require("moment");
const BusinessDay = moment().format("YYYYMMDD");
const mysql = require("mysql");
const Promise = require("bluebird");
//設定資料庫連線
let connection = mysql.createConnection({
  host: "localhost",
  user: "alex",
  password: "xup6xu4jo6",
  database: "stock",
});
//connection->Promise化
connection = Promise.promisifyAll(connection);
// 用await版
(async function () {
  try {
    await connection.connectAsync();
    let data = await fs.readFile("stock.txt", "utf8");
    console.log(`讀到的stockNo:${data}`);
    let stock = await connection.queryAsync(
      `SELECT stock_id FROM stock WHERE stock_id=${data}`
    );
    //stock.length <= 0 ， 如果我們輸入的代碼資料庫找不到，執行axios抓取
    if (stock.length <= 0) {
      let response = await axios.get(
        `https://www.twse.com.tw/zh/api/codeQuery?query=${data}`
      );
      let stockNumber = response.data.suggestions.shift();
      let stockNoName = stockNumber.split("\t");
      //stockNoName[0],stockNoName[1]
      //抓取的資料有[stock_id, stock_name],寫入資料庫
      if (stockNoName.length > 1) {
        connection.queryAsync(
          `INSERT INTO stock (stock_id, stock_name) VALUES ('${stockNoName[0]}','${stockNoName[1]}');`
        );
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    //最後最後，記得關閉資料庫
    connection.end();
  }
})();

// fs.readFile("stock.txt", "utf8")
//   .then((data) => {
//     console.log(`讀到的stockNo:${data}`);

//     //先檢查這個代碼有沒有找過
//     connection.query(
//       `SELECT stock_id FROM stock WHERE stock_id=${data}`,
//       function (err, result) {
//         if (err) {
//           throw err;
//         }
//         //如果MySQL沒有此股票stockNo，執行->axios
//         if (result.length === 0) {
//           //用股票代碼查股票名稱
//           return axios.get(
//             `https://www.twse.com.tw/zh/api/codeQuery?query=${data}`
//           );
//         }
//       }
//     );
//   })
//   .then(function (response) {
//     // console.log(response.data);

//     } else {
//       throw "查不到此股名稱";
//     }
//   })
//   .catch((err) => {
//     console.error(err);
//   })
//   .finally(() => {
//     connection.end();
//   });

//   return axios.get("https://www.twse.com.tw/zh/api/codeQuery?query=2884", {
//       params: {
//         response: "json",
//         date: BusinessDay,
//         stockNo: data,
//       },
//     });

// if (response.data.stat === "OK") {
//     console.log(response.data.date);
//     console.log(response.data.title);
//   }
