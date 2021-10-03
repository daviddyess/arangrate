"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = log;
exports.timeStamp = exports.dropCollection = exports.createEdgeCollection = exports.createCollection = exports.aql = exports.db = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _arangojs = require("arangojs");

var _logade = require("logade");

/**
 * Logade
 * @param string text
 */
function log(text) {
  (0, _logade.getLogger)('arangrate').info(text);
}

var DB = {
  url: process.env.ARANGO_URL,
  databaseName: process.env.ARANGO_DB,
  auth: {
    username: process.env.ARANGO_USER,
    password: process.env.ARANGO_PW
  },
  devData: process.env.DEV_DATA || false
};
var db = new _arangojs.Database(DB);
exports.db = db;
var aql = _arangojs.aql;
/**
 * createCollection
 * @param {*} param
 * @returns
 */

exports.aql = aql;

var createCollection = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var name, _ref$options, options, _ref$silent, silent, collection;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            name = _ref.name, _ref$options = _ref.options, options = _ref$options === void 0 ? {} : _ref$options, _ref$silent = _ref.silent, silent = _ref$silent === void 0 ? true : _ref$silent;
            _context.next = 3;
            return db.collection(name);

          case 3:
            collection = _context.sent;
            _context.prev = 4;
            _context.next = 7;
            return collection.create(options);

          case 7:
            if (!silent) {
              log.info("Collection ".concat(name, " created!"));
            }

            _context.next = 10;
            return collection.get();

          case 10:
            return _context.abrupt("return", _context.sent);

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](4);

            if (!silent) {
              log.info("Collection ".concat(name, " already exists!"));
            }

            _context.next = 18;
            return collection.get();

          case 18:
            return _context.abrupt("return", _context.sent);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 13]]);
  }));

  return function createCollection(_x) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * createEdgeCollection
 * @param {*} param
 * @returns
 */


exports.createCollection = createCollection;

var createEdgeCollection = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref3) {
    var name, _ref3$silent, silent;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            name = _ref3.name, _ref3$silent = _ref3.silent, silent = _ref3$silent === void 0 ? true : _ref3$silent;
            _context2.next = 3;
            return createCollection({
              name: name,
              options: {
                type: _arangojs.CollectionType.EDGE_COLLECTION
              },
              silent: silent
            });

          case 3:
            return _context2.abrupt("return", _context2.sent);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function createEdgeCollection(_x2) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * dropCollection
 * @param {*} param0
 * @returns
 */


exports.createEdgeCollection = createEdgeCollection;

var dropCollection = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref5) {
    var name, _ref5$silent, silent, collection;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            name = _ref5.name, _ref5$silent = _ref5.silent, silent = _ref5$silent === void 0 ? true : _ref5$silent;
            _context3.next = 3;
            return db.collection(name);

          case 3:
            collection = _context3.sent;
            _context3.prev = 4;
            _context3.next = 7;
            return collection.drop();

          case 7:
            if (!silent) {
              log.info("Collection ".concat(name, " dropped!"));
            }

            return _context3.abrupt("return", true);

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](4);

            if (!silent) {
              log.info("Collection ".concat(name, " doesn't exist!"));
            }

            return _context3.abrupt("return", false);

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[4, 11]]);
  }));

  return function dropCollection(_x3) {
    return _ref6.apply(this, arguments);
  };
}();
/**
 * Current Time Stamp
 * @returns Date String
 */


exports.dropCollection = dropCollection;

var timeStamp = function timeStamp() {
  var date = new Date(Date.now());
  return date.toISOString();
};

exports.timeStamp = timeStamp;