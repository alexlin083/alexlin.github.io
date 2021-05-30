const axios = require("axios");
const fs = require("fs");
const moment = require("moment");
const BusinessDay = moment().format("YYYYMMDD");

//promise-await
function readFilePromise() {
  return new Promise((resolve, reject) => {
    fs.readFile("stock.txt", "utf8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

async function readAwaitData() {
  try {
    let stockNoCode = await readFilePromise();
    let response = await axios.get(
      "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
      {
        params: {
          response: "json",
          date: BusinessDay,
          stockNo: stockNoCode,
        },
      }
    );
    if (response.data.stat === "OK") {
      console.log(response.data.date);
      console.log(response.data.title);
    } else console.log(err);
  } catch (err) {
    console.log(err);
  }
}

readAwaitData();
