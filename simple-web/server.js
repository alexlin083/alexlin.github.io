// http 是 NodeJS 內建的 web server，所以不用安裝
// https://nodejs.org/docs/latest-v14.x/api/http.html
const http = require("http");
const fs = require("fs/promises");

// createServer(Listener)
// Listener(request, response) 負責處理進來的連線
// request 是請求物件
// response 是回覆物件
const server = http.createServer(async (req, res) => {
  console.log("有連線進來了");
  //   console.log(req.url);

  res.statusCode = 200; // 2xx, 3xx, 4xx, 5xx
  //將亂碼轉換成中文
  res.setHeader("Content-Type", "text/plain;charset=UTF-8");
  //   res.write("Hi 找我嗎?");
  //   res.end();

  switch (req.url) {
    case "/":
      res.end(
        "Hi 這是首頁 我是如來佛祖玉皇大帝觀音菩薩指定取西經特派使者 花果山水簾洞美猴王齊天大聖孫悟空"
      );
      break;
    case "/test":
      res.setHeader("Content-Type", "text/html;charset=UTF-8");
      let content = await fs.readFile("test.html");
      res.end(content);
      break;
    case "/about":
      res.end("這是關於我們");
      break;
    default:
      res.writeHead(404);
      res.end("Not Found");
  }
});

// 設定port
server.listen(3000, () => {
  console.log("我跑起來了喔，我要收 3000 port");
});

// PHP --> 搭配 web server （apache or nginx)
// NodeJS 直接開發一個 web server
