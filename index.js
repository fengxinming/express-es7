'use strict';

const flatten = require('array-flatten');
const createError = require('http-errors');

function convertError(err) {
  const opts = !err.status ? { status: 500 } : {};
  return createError(err, opts);
}

function compose(middleware) {
  return function (req, res) {
    let index = -1;
    return dispatch(0);

    function dispatch(i) {
      if (i <= index) {
        return Promise.reject(new Error('next() called multiple times'));
      }
      index = i;
      let fn = middleware[i];
      if (i === middleware.length) {
        fn = undefined;
      }
      if (!fn) {
        return Promise.resolve();
      }
      try {
        return Promise.resolve(fn(req, res, function (err) {
          if (err) {
            return Promise.reject(err);
          } else {
            return dispatch(i + 1);
          }
        }));
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }
}

function createApplication() {
  const middleware = flatten(Array.from(arguments));
  const fnMiddleware = compose(middleware);
  return function (req, res, next) {
    return fnMiddleware(req, res).then(next).catch((err) => {
      next(convertError(err));
    });
  };
}

module.exports = createApplication;
