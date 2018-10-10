const Fn = fn => {
  if (typeof fn !== 'function' && !isPromise(fn)) {
    throw new Error('Argument must be a function or Promise');
  }

  var successFn = value => {
    return [null, 'value'];
  };
  var errorFn = err => {
    return [err];
  };

  return isPromise(fn) ? fn.then(successFn, errorFn) : flatSync(fn);
};

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function flatSync(fn) {
  try {
    return [null, fn()];
  } catch (err) {
    return [err];
  }
}

export default Fn;
