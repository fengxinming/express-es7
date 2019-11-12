'use strict';

const express = require('../index');
const { sleep } = require('celia');
const app = express();
const api1 = require('./routes/api_v1');
const api2 = require('./routes/api_v2');

app.use((req, res, next) => {
  console.log('进入中间件一');
  req.user = {
    message: '进入中间件一<br/>'
  };
  next();
  console.log('中间件一完成');
});

app.use(async (req, res, next) => {
  console.log('进入中间件二');
  await sleep(1000);
  req.user.message += '进入中间件二<br/>';
  next();
  console.log('中间件二完成');
});

app.use(async (req, res, next) => {
  console.log('进入中间件三');
  req.user.message += '进入中间件三<br/>';
  throw new Error('中间件三抛出错误');
});

app.use((err, req, res, next) => {
  console.log('进入中间件四');
  req.user.message += `进入中间件四${err}<br/>`;
  next();
  console.log('中间件四完成');
});

app.use((req, res, next) => {
  console.log('进入中间件五');
  req.user.message += `进入中间件五<br/>`;
  next();
  console.log('中间件五完成');
});

app.use(async (req, res, next) => {
  console.log('进入中间件六');
  req.user.message += `进入中间件六<br/>`;
  next(new Error('中间件六抛出错误'));
  console.log('中间件六完成');
});

app.use(async (err, req, res, next) => {
  console.log('进入中间件七');
  req.user.message += `进入中间件七${err}<br/>`;
  next();
  console.log('中间件七完成');
});

app.use('/api/v1', api1);

app.use('/api/v2', api2);

app.get('/', (req, res) => {
  res.send(req.user.message + 'Hello form root route.');
});

// 中间件五，全局拦截处理
app.use((err, req, res, next) => {
  const error = req.user.message + err.message;
  res.send(`${error}<br/>catch a error`);
});

app.listen(7000, () => {
  console.log('The server is running at port 7000');
});
