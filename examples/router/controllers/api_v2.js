'use strict';

const express = require('../../../index');

const apiv2 = express.Router();

apiv2.get('/', async (req, res) => {
  req.user = {
    message: `Start${req.url}<br/>`
  };
  await new Promise((resolve) => {
    setTimeout(() => {
      req.user.message += 'APIv2 make an async request<br/>';
      resolve();
    }, 2000);
  });
  req.user.message += 'APIv2 an async request has been finished<br/>';
  req.user.message += 'Hello from APIv2 root route.';
  res.send(req.user.message);
});

let temp = 0;
apiv2.get('/users', (req, res, next) => {
  req.user = {
    message: `Start APIv2 callback1 ${req.url}<br/>`
  };
  temp = Math.round(Math.random() * 3);
  next();
}, async (req, res, next) => {
  req.user.message += temp + ' APIv2 callback2<br/>';
  switch (temp % 4) {
    case 0: // 第一种

      // 如果异步调用中使用了reject，传入的异常将会被后面的中间件捕获
      await new Promise((resolve, reject) => {
        reject(new Error('throw the first error'));
      });

      break;

    case 1: // 第二种

      throw new Error('throw the second error');

    case 2: // 第三种

      // 调用next方法时传入异常也能被后面的中间件捕获
      await next(new Error('throw the third error'));
  }
  await next();
}, async (req, res, next) => {
  req.user.message += 'List of APIv2 users.';
  res.send(req.user.message);
});

module.exports = apiv2;
