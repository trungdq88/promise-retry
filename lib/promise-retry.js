export default (function (getPromise) {
  var retryCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;

  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$intervalStep = _ref.intervalStep,
      intervalStep = _ref$intervalStep === undefined ? 1000 : _ref$intervalStep,
      _ref$incrementalTime = _ref.incrementalTime,
      incrementalTime = _ref$incrementalTime === undefined ? true : _ref$incrementalTime,
      logger = _ref.logger;

  var log = logger ? logger : function () {};
  var tries = 1;
  var step = intervalStep;
  return new Promise(function (resolve, reject) {
    var run = function run() {
      if (tries > 1) {
        log('Promise Retry: attempt number ' + tries);
      }
      getPromise().then(function (r) {
        log('Promise Retry: Success');
        resolve(r);
      }).catch(function (r) {
        log(tries + ' rejection with ', r);
        if (tries < retryCount) {
          tries++;
          setTimeout(run, step);
          log('Promise Retry: Retry after ' + step / 1000 + ' seconds...');
          if (incrementalTime) {
            step *= 2;
          }
        } else {
          log('Promise Retry: Give up');
          reject(r);
        }
      });
    };

    run();
  });
});