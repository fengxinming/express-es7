'use strict';

const express = require('express');
const ea = require('../../index');

const app = module.exports = express();

let temp = 0;

// 中间一, 普通中间件
app.use((req, res, next) => {
  req.user = {
    message: 'middleware 1<br/>'
  };
  next();
});

// 中间二，包装普通中间件
app.use(ea((req, res, next) => {
  req.user.message += 'middleware 2<br/>';
  temp++;
  return next();
}));

// 中间三，异步方法
app.use(ea(async function (req, res, next) {
  await new Promise((resolve, reject) => {
    req.user.message += 'middleware 3<br/>';
    resolve();
  });
  await next();
}));

// 列举三种种抛错给全局拦截函数
app.use(ea(async function (req, res, next) {
  switch (temp % 3) {
    case 0: // 第一种

      // 如果异步调用中使用了reject，传入的异常将会被后面的中间件捕获
      await new Promise((resolve, reject) => {
        reject(new Error('middleware 4 the first error'));
      });
      await next();

      break;

    case 1: // 第二种

      throw new Error('middleware 4 the second error');

    default: // 第三种

      // 调用next方法时传入异常也能被后面的中间件捕获
      await next(new Error('middleware 4 the third error'));
  }
}));


// 中间五，全局拦截处理
app.use((err, req, res, next) => {
  const error = req.user.message + err.message;
  console.error(temp, temp % 3, err.message);
  res.send(`${error}<br/>Hello form root route.`);
});

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
