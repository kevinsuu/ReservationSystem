const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// 設定 body-parser 以處理 POST 請求
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 設定路由
const routes = require("./routes");
app.use("/", routes);

// 監聽端口
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
