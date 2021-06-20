const express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const { body, validationResult } = require("express-validator"); //引用 express-validator
const bcrypt = require("bcrypt"); //引用加密套件

const path = require("path");
const multer = require("multer"); //引用上傳套件
//設定上傳檔案的地方及儲存方式
const myStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // __dirname 絕對路徑 https://dylan237.github.io/nodejs-dirname-and-filename.html
    //../public/uploads
    cb(null, path.join(__dirname, "../", "public", "uploads"));
  },
  //+filename
  filename: function (req, file, cb) {
    //從file.originalname 抓副檔名
    const ext = file.originalname.split(".").pop();
    //自己組合鍵入資料庫的檔案名稱
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});
//用multer做上傳的工具
const uploader = multer({
  storage: myStorage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== "image/jpeg") {
      return cb(new Error("不符合的file type"), false);
    }
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      // 如果副檔名不是.jpg .jpeg .png 則執行此段
      cb(new Error("不符合的副檔名"));
    }
    //上述2個if條件都符合，則執行此段
    cb(null, true);
  },
  //設定圖檔的px 像素 limits
  limits: { fileSize: 1024 * 1024 },
});

router.get("/register", (req, res) => {
  res.render("auth/register");
});

//註冊表單資料的驗證規則
const registerRules = [
  body("email").isEmail().withMessage("請輸入 Email 正確格式"),
  body("password").isLength({ min: 6 }),
  body("confirmPsaaword").custom((value, { req }) => {
    return value === req.body.password;
  }),
];

//uploader.single("avatar") => 這邊程式是只有處理檔名 (還有陣列...) =>參考網址 https://www.npmjs.com/package/multer
router.post(
  "/register",
  uploader.single("photo"),
  registerRules,
  async (req, res, next) => {
    //do somthing

    //後端工程師要再次對前端送來的資料作驗證
    const validateResult = validationResult(req); //這邊可以拿到 req結果

    if (validateResult.isEmpty()) {
      //資料不是空的話，表示有誤
      return next(new Error("註冊的表單資料有誤"));
    }

    //檢查這個資料有沒有在資料庫
    let checkResult = await connection.queryAsync(
      "SELECT * FROM members WHERE email = ?",
      req.body.email
    );
    if (checkResult.isLength > 0) {
      return next(new Error("該 email 以註冊過"));
    }

    //取得上傳檔案
    // console.log(req.filename);

    //沒有在資料庫就鍵入
    let result = await connection.queryAsync(
      "INSERT INTO members (email,password,name, photo) VALUES (?)",
      [
        [
          req.body.email,
          await bcrypt.hash(req.body.password, 10),
          req.body.name,
          `/uploads/${req.file.filename}`,
        ],
      ]
    );

    res.send("註冊成功!!");
  }
);

router.get("/login", (req, res) => {
  res.render("auth/login");
});

module.exports = router;
