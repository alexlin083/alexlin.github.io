const axios = require("axios");

//BWIBBU_URL => 個股分析
//https://www.twse.com.tw/exchangeReport/BWIBBU?response=json&date=20210609&stockNo=3037

//STOCK_DAY  => 個股資訊
//https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20210609&stockNo=3037
const finance = axios.create({
  baseURL: "https://www.twse.com.tw/exchangeReport/",
});

export const apiFinance = () =>
  finance.get("BWIBBU?response=json&date=20210609&stockNo=3037");
