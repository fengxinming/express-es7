'use strict';

const express = require('../../index');

const app = module.exports = express();

// 中间件一, 普通中间件
app.use((req, res, next) => {
  req.user = {
    message: 'middleware 1<br/>'
  };
  next();
});

// 中间件二，异步方法
app.use(async (req, res, next) => {
  await new Promise((resolve, reject) => {
    req.user.message += 'middleware 2<br/>';
    resolve();
  });
  next();
  console.log('中间件二');
});

// 中间件三，异步方法
app.use(async (req, res, next) => {
  // await new Promise((resolve, reject) => {
  //   reject(new Error('middleware 3 throw a error'));
  // });
  // throw new Error('middleware 3 throw a error');
  console.log('中间件三 1');
  next();
  console.log('中间件三 2');
});

// 中间件四，异常处理
app.use(async (req, res, next) => {
  // await new Promise((resolve, reject) => {
  //   reject(new Error('middleware 3 throw a error'));
  // });
  // throw new Error('middleware 3 throw a error');
  next(new Error('middleware 4 throw a error'));
  console.log('中间件四，异常处理');
});

// 中间件五，全局拦截处理
app.use((err, req, res, next) => {
  const error = req.user.message + err.message;
  res.send(`${error}<br/>catch a error`);
});

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
