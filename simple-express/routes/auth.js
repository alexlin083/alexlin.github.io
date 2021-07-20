const express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const { body, validationResult } = require("express-validator"); //引用 express-validator
const bcrypt = require("bcrypt"); //引用加密套件
const nodeMailer = require("nodemailer");
require("dotenv").config();
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
//("image/jpeg" & "image/jpg" & "image/png")
const uploader = multer({
  storage: myStorage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
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
  if (req.session.member) {
    req.session.message = {
      title: "重複登入",
      text: "您已登入過",
    };
    return res.redirect(303, "/");
  }
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
    console.log(req.body);

    //後端工程師要再次對前端送來的資料作驗證
    const validateResult = validationResult(req); //這邊可以拿到 req結果

    //未完成...........................................................................................
    if (!validateResult.isEmpty()) {
      //資料不是空的話，表示有誤
      //   return next(new Error("註冊的表單資料有誤"));
      console.log(validateResult);
      let error = validateResult.array();
      req.session.message = {
        title: "資料錯誤",
        text: error[0].msg,
      };
      return res.redirect(303, "/auth/register");
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

    //檢查有沒有上傳圖片
    let filepath = req.file ? "/uploads/" + req.file.filename : null;

    //設定發送email的帳號
    //從gmail服務
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "lwlw54088@gmail.com",
        pass: process.env.GMAIL_SECRET,
      },
    });

    //設定發送的信件內容，收件者，寄件者，以及信件標題
    let timeNow = new Date();
    const mailOptions = {
      from: "lwlw54088@gmail.com",
      to: req.body.email, // 註冊帳號人的email
      subject: `${req.body.name} 感謝您註冊 `,
      text: `發送時間: ${timeNow}`,
    };

    //沒有在資料庫就鍵入
    let result = await connection.queryAsync(
      "INSERT INTO members (email,password,name, photo) VALUES (?)",
      [
        [
          req.body.email,
          await bcrypt.hash(req.body.password, 10),
          req.body.name,
          filepath,
        ],
      ]
    );
    console.log(`email: ${req.body.email} , name : ${req.body.name}`);
    //鍵入成功發送email
    // transporter.sendMail(mailOptions, function () {});

    res.send("註冊成功!!");
  }
);

router.get("/login", (req, res) => {
  res.render("auth/login");
});

const loginRules = [
  body("email").isEmail().withMessage("請輸入 Email 正確格式"),
  body("password").isLength({ min: 6 }),
];

router.post("/login", loginRules, async (req, res) => {
  console.log(req.body);

  const validateResult = validationResult(req);
  if (!validateResult.isEmpty()) {
    // return next(new Error("輸入的帳號或密碼錯誤!!"));
    req.session.message = {
      title: "登入失敗",
      text: "請填寫正確帳號、密碼",
    };
    return res.redirect(303, "/auth/login");
  }

  let member = await connection.queryAsync(
    "SELECT * FROM members WHERE email = ?",
    req.body.email
  );

  if (member.length === 0) {
    // return next(new Error("查無此帳號"));
    req.session.message = {
      title: "登入失敗",
      text: "請填寫正確帳號、密碼",
    };
    return res.redirect(303, "/auth/register");
  }
  member = member[0];

  //比對密碼，因為bcrypt 每次加密的結果都不一樣，故不能用hash
  let result = await bcrypt.compare(req.body.password, member.password);
  if (result) {
    req.session.member = {
      email: member.email,
      name: member.name,
      photo: member.photo,
    };

    //處理登入成功訊息
    req.session.message = {
      title: "登入成功",
      text: "歡迎~我們將帶您參與網路的新世界",
    };
    // res.send("登入成功");
    res.redirect(303, "/");
  } else {
    req.session.member = null;

    //處理登入失敗訊息
    // req.session.message = {
    //   title: "登入失敗",
    //   text: "請輸入正確帳號密碼",
    // };
    req.session.message = {
      title: "登入失敗",
      text: "請填寫正確帳號、密碼",
    };
    //登入失敗，跳轉回登入頁面
    res.redirect(303, "/auth/login");
  }
});

router.get("/logout", (req, res) => {
  req.session.member = null;
  //處理登出時訊息
  req.session.message = {
    title: "登出成功",
    text: "歡迎再次光臨本店",
  };
  res.redirect(303, "/");
});

module.exports = router;
