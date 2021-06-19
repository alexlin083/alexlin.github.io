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
  let stock = await connection.queryAsync(
    "SELECT * FROM stock WHERE stock_id=?;",
    req.params.stockCode
  );

  if (stock.length === 0) {
    throw new Error("查無代碼");
  }
  stock = stock[0];
  //分頁，一頁幾筆? 現在第幾頁? 總共幾筆?
  let count = await connection.queryAsync(
    "SELECT COUNT(*) as total FROM stock_price WHERE stock_id =?;",
    req.params.stockCode
  );
  //   console.log(count); //總共有幾筆資料  [ RowDataPacket { total: 13 } ] => 這是陣列，第0筆
  const total = count[0].total; // 總頁數
  const perPage = 5; //每一頁5筆
  const lastPage = Math.ceil(total / perPage); //總共幾頁  [ceil()=> 無條件進位]
  //   console.log(lastPage); //總共3頁

  //現在第幾頁?  /:stockCode?p=3 第三頁 ，   || 1 (沒設定就是第1頁)
  const currentPage = req.query.page || 1;
  // 第X頁 (從 X-1)*5 筆的資料開始  =>  (頁數-1) * 5
  const offset = (currentPage - 1) * perPage;

  // res.send(req.params.stockCode); 這邊以下是第一步
  //"SELECT *FROM stock_price WHERE stock_id = ? ORDER BY date;"(資料全顯示出來)
  // LIMIT ? OFFSET? => 等同於 LIMIT 5,1 (1開始選取前面5筆資料, 會略過最前面的1筆資料)
  //會先確認畫面上是否為自己要的筆數資料後，再寫分頁碼
  let queryResult = await connection.queryAsync(
    "SELECT *FROM stock_price WHERE stock_id = ? ORDER BY date LIMIT ? OFFSET ?;",
    [req.params.stockCode, perPage, offset]
  );

  // 變數 pagination 包起相關所有需要的變數，
  res.render("stock/detail", {
    stock,
    stockPrices: queryResult,
    pagination: {
      lastPage,
      currentPage,
      total,
    },
  });
});
