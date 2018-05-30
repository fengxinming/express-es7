'use strict';

exports.asyncToFn = (afn) => {
  return afn.length === 4 ?
    function (err, req, res, next) {
      afn(err, req, res, err => err ? Promise.reject(err) : Promise.resolve()).then(next).catch(next);
    } : function (req, res, next) {
      afn(req, res, err => err ? Promise.reject(err) : Promise.resolve()).then(next).catch(next);
    };
};
