//app.js
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 路由設置
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// 其他路由或錯誤處理邏輯
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

module.exports = app;
