'use strict';

const express = require('../../index');

const app = module.exports = express();

let temp = 0;

// 中间件一, 普通中间件
app.use((req, res, next) => {
  req.user = {
    message: 'middleware 1<br/>'
  };
  next();
});

// 中间件二，包装普通中间件
app.use((req, res, next) => {
  req.user.message += 'middleware 2<br/>';
  temp = Math.round(Math.random() * 2);
  return next();
});

// 中间件三，异步方法
app.use(async (req, res, next) => {
  await new Promise((resolve, reject) => {
    req.user.message += 'middleware 3<br/>';
    resolve();
  });
  await next();
});

// 中间件四，列举三种种抛错给全局拦截函数
app.use(async (req, res, next) => {
  switch (temp % 3) {
    case 0: // 第一种

      // 如果异步调用中使用了reject，传入的异常将会被后面的中间件捕获
      await new Promise((resolve, reject) => {
        reject(new Error('middleware 4 throw the first error'));
      });

      break;

    case 1: // 第二种

      throw new Error('middleware 4 throw the second error');

    default: // 第三种

      // 调用next方法时传入异常也能被后面的中间件捕获
      await next(new Error('middleware 4 throw the third error'));
  }
});

// 中间件五，全局拦截处理
app.use((err, req, res, next) => {
  const error = req.user.message + err.message;
  console.error(temp, temp % 3, err.message);
  res.send(`${error}<br/>catch a error.`);
});

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
