const nodeMailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

require("dotenv").config();

//設定發送email的帳號
//從gmail服務
// const transporter = nodeMailer.createTransport({
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: "lwlw54088@gmail.com",
//     clientId: process.env.CLINENTID,
//     clientSecret: process.env.CLINENTSECRET,
//     refreshToken: process.env.REFRESHTOKEN,
//     accessToken: process.env.ACCESSTOKEN,
//   },
// });

const transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: "lwlw54088@gmail.com",
    clientId: process.env.CLINENTID,
    clientSecret: process.env.CLINENTSECRET,
    refreshToken: process.env.REFRESHTOKEN,
    accessToken: process.env.ACCESSTOKEN,
    // expires: 1484314697598,
  },
});

let timeNow = new Date();
const mailOptions = {
  from: "lwlw54088@gmail.com",
  to: "alex3889660@gmail.com", // 註冊帳號人的email
  subject: `HI 感謝您註冊 `,
  text: `發送時間: ${timeNow}`,
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    return console.log(err);
  }
  if (info) console.log(`Done sending!, time: ${timeNow}`, info);
});
