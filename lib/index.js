'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (fn) {
  if (typeof fn !== 'function' && !isPromise(fn)) {
    throw new Error('Argument must be a function or Promise');
  }

  var successFn = function successFn(value) {
    return [null, value];
  };
  var errorFn = function errorFn(err) {
    return [err];
  };

  return isPromise(fn) ? fn.then(successFn, errorFn) : flatSync(fn);
};

function isPromise(obj) {
  return !!obj && ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function flatSync(fn) {
  try {
    return [null, fn()];
  } catch (err) {
    return [err];
  }
}
