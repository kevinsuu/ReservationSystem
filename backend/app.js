//app.js
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 路由設置
const indexRouter = require('./routes/index');
app.use('/api', indexRouter);
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
// 其他路由或錯誤處理邏輯
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

module.exports = app;
