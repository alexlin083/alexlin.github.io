// routes/stock.js
const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

module.exports = router;

router.get("/", async (req, res) => {
  let queryResults = await connection.queryAsync("SELECT * FROM stock;");
  res.render("stock/list", {
    stocks: queryResults,
  });
});

//TODO:
//模組化
//股票標題
//分頁
//檢查這個股票代碼是否有在資料庫

router.get("/:stockCode", async (req, res) => {
  // res.send(req.params.stockCode);
  let queryResult = await connection.queryAsync(
    "SELECT *FROM stock_price WHERE stock_id = ? ORDER BY date;",
    req.params.stockCode
  );
  res.render("stock/detail", {
    stockPrices: queryResult,
  });
});
