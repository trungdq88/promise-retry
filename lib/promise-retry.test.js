import _regeneratorRuntime from 'babel-runtime/regenerator';

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import retry from './promise-retry.js';

describe('promise-retry', function () {
  it('should work', _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var rejectValue, retryCount, getPromise;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            rejectValue = Math.random();
            retryCount = Math.floor(Math.random() * 10 + 1);
            getPromise = jest.fn().mockImplementation(function () {
              return Promise.reject(rejectValue);
            });
            _context.next = 5;
            return retry(getPromise, retryCount, {
              intervalStep: 1,
              logger: null
            }).catch(function (_) {
              return _;
            });

          case 5:
            expect(getPromise).toHaveBeenCalledTimes(retryCount);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));
});