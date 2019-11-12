'use strict';

const { isAsyncFunction } = require('celia');

module.exports = function (middleware) {
  return isAsyncFunction(middleware) // 处理异步函数
    ? middleware.length === 4 // 捕捉异常的异步函数
      ? function (err, req, res, next) {
        middleware(err, req, res, next)
          .catch(function (e) {
            next(e);
          });
      }
      : function (req, res, next) {
        middleware(req, res, next)
          .catch(function (err) {
            next(err);
          });
      }
    : middleware;
};
