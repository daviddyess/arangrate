"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migrate = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _commander = _interopRequireDefault(require("commander"));

var _package = _interopRequireDefault(require("../package.json"));

var _logade = require("logade");

var _arangrate = require("./arangrate");

var log = (0, _logade.getLogger)('migrate');

var migrate = function migrate(_ref) {
  var path = _ref.path,
      collection = _ref.collection;
  var arangrate = new _arangrate.Arangrate({
    path: path,
    collection: collection || 'migrations'
  });
  return _commander["default"].version(_package["default"].version).arguments('[target]').action( /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(target) {
      var stack, _error$code, code, detail, position, schema, table, column, message;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              log.info("Performing target ".concat(process.env.DEV_DATA ? 'DEVELOPMENT' : 'PRODUCTION', " migration!"));
              _context.next = 4;
              return arangrate.migrate(target ? target : 'max');

            case 4:
              log.info("Migration target for ".concat(process.env.DEV_DATA ? 'DEVELOPMENT' : 'PRODUCTION', " completed!"));
              _context.next = 15;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              stack = _context.t0.stack, _error$code = _context.t0.code, code = _error$code === void 0 ? 'unknown' : _error$code, detail = _context.t0.detail, position = _context.t0.position, schema = _context.t0.schema, table = _context.t0.table, column = _context.t0.column;
              message = "Code ".concat(code, " ");

              if (schema && table) {
                message += "on ".concat(schema, ".").concat(table, " ");

                if (column) {
                  message += ".".concat(column);
                }
              } else {
                message += "at offset ".concat(position, " ");
              }

              if (detail) {
                message += "- ".concat(detail);
              }

              log.error("Message: ".concat(message));
              log.error("Error: ".concat(stack));

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());
};

exports.migrate = migrate;