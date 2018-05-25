'use strict';

const toString = Object.prototype.toString;

exports.isAsyncFunction = (afn) => {
  return toString.call(afn) === '[object AsyncFunction]';
};

exports.asyncToFn = (afn) => {
  return afn.length === 4 ?
    function (err, req, res, next) {
      afn(err, req, res, err => err ? Promise.reject(err) : Promise.resolve()).then(next).catch(next);
    } : function (req, res, next) {
      afn(req, res, err => err ? Promise.reject(err) : Promise.resolve()).then(next).catch(next);
    };
};

exports.compose = (middleware) => {
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
        return Promise.resolve(fn(req, res, (err) => {
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
  };
};
