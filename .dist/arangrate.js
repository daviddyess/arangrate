"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Arangrate = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _fs = _interopRequireDefault(require("fs"));

var _utils = require("./utils");

var _templateObject, _templateObject2, _templateObject3, _templateObject4;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var Arangrate = /*#__PURE__*/function () {
  function Arangrate(options) {
    (0, _classCallCheck2["default"])(this, Arangrate);
    (0, _defineProperty2["default"])(this, "migrations", false);
    this.options = options;
    this.up = [];
    this.down = [];
    this.max = 0;
  }

  (0, _createClass2["default"])(Arangrate, [{
    key: "migrate",
    value: function () {
      var _migrate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(target) {
        var path, collection, info, files, _iterator, _step, file, storedMigrations, result, last, func, setup, date, _iterator2, _step2, mig, _func, _setup, _iterator3, _step3, _mig, _iterator4, _step4, previous, m, _iterator5, _step5, _mig2, _iterator6, _step6, _previous, _m;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                path = this.options.path;
                _context.next = 3;
                return (0, _utils.createCollection)({
                  name: this.options.collection
                });

              case 3:
                _context.next = 5;
                return _utils.db.collection(this.options.collection);

              case 5:
                collection = _context.sent;
                // eslint-disable-next-line no-sync
                files = _fs["default"].readdirSync(path);
                _iterator = _createForOfIteratorHelper(files);

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    file = _step.value;
                    info = file.split('.'); // Forward migration targets

                    if (info[1] === 'do') {
                      this.up.push({
                        step: info[0],
                        file: file,
                        migration: "".concat(info[0], ".").concat(info[2])
                      });
                      ++this.max;
                      this.migrations = true;
                    } // Revertable migration targets


                    if (info[1] === 'undo') {
                      this.down.push({
                        step: info[0],
                        file: file,
                        migration: "".concat(info[0], ".").concat(info[2])
                      });
                    }
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }

                _context.next = 11;
                return _utils.db.query((0, _utils.aql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n      FOR m IN ", "\n        SORT m.code ASC\n        RETURN { code: m.code, file: m.file, migration: m.migration }\n    "])), collection));

              case 11:
                storedMigrations = _context.sent;
                _context.next = 14;
                return storedMigrations.all();

              case 14:
                result = _context.sent;
                (0, _utils.log)("Total migrations: ".concat(this.max)); // Perform migrations

                if (!(target === 'max' || target > this.max)) {
                  _context.next = 50;
                  break;
                }

                if (!(result.length > 0 && result.length === this.max)) {
                  _context.next = 20;
                  break;
                }

                (0, _utils.log)('No migration needed!');
                return _context.abrupt("return");

              case 20:
                last = {
                  code: result[result.length - 1] !== undefined ? result[result.length - 1].code : 0
                };
                date = (0, _utils.timeStamp)();
                _iterator2 = _createForOfIteratorHelper(this.up);
                _context.prev = 23;

                _iterator2.s();

              case 25:
                if ((_step2 = _iterator2.n()).done) {
                  _context.next = 39;
                  break;
                }

                mig = _step2.value;

                if (!(Number(mig.step) > Number(last.code))) {
                  _context.next = 37;
                  break;
                }

                _context.next = 30;
                return Promise.resolve("".concat(path, "/").concat(mig.file)).then(function (s) {
                  return _interopRequireWildcard(require(s));
                });

              case 30:
                func = _context.sent;
                setup = func["default"];
                _context.next = 34;
                return setup();

              case 34:
                _context.next = 36;
                return _utils.db.query((0, _utils.aql)(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n            INSERT {\n              code: ", ",\n              migration: ", ",\n              file: ", ",\n              date: ", "\n            } IN ", "\n          "])), mig.step, mig.migration, mig.file, date, collection));

              case 36:
                (0, _utils.log)("Migration ".concat(mig.step, " - ").concat(mig.migration, " complete!"));

              case 37:
                _context.next = 25;
                break;

              case 39:
                _context.next = 44;
                break;

              case 41:
                _context.prev = 41;
                _context.t0 = _context["catch"](23);

                _iterator2.e(_context.t0);

              case 44:
                _context.prev = 44;

                _iterator2.f();

                return _context.finish(44);

              case 47:
                if (target > this.max) {
                  (0, _utils.log)("Migration ".concat(target, " not available. Max migration (").concat(this.max, ") reached!"));
                }

                _context.next = 139;
                break;

              case 50:
                this.down.reverse();

                if (!(Number(target) < this.max)) {
                  _context.next = 139;
                  break;
                }

                if (!(Number(target) === 0)) {
                  _context.next = 97;
                  break;
                }

                _iterator3 = _createForOfIteratorHelper(this.down);
                _context.prev = 54;

                _iterator3.s();

              case 56:
                if ((_step3 = _iterator3.n()).done) {
                  _context.next = 87;
                  break;
                }

                _mig = _step3.value;
                _iterator4 = _createForOfIteratorHelper(result);
                _context.prev = 59;

                _iterator4.s();

              case 61:
                if ((_step4 = _iterator4.n()).done) {
                  _context.next = 77;
                  break;
                }

                previous = _step4.value;

                if (!(_mig.step === previous.code)) {
                  _context.next = 75;
                  break;
                }

                _context.next = 66;
                return Promise.resolve("".concat(path, "/").concat(_mig.file)).then(function (s) {
                  return _interopRequireWildcard(require(s));
                });

              case 66:
                _func = _context.sent;
                _setup = _func["default"];
                _context.next = 70;
                return _setup();

              case 70:
                m = _context.sent;

                if (!(m === true)) {
                  _context.next = 74;
                  break;
                }

                _context.next = 74;
                return _utils.db.query((0, _utils.aql)(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2["default"])(["\n                FOR m in ", "\n                  FILTER m.code == ", "\n                  REMOVE m IN ", "\n              "])), collection, previous.code, collection));

              case 74:
                (0, _utils.log)("Reverted ".concat(_mig.step, " - ").concat(_mig.migration, " complete!"));

              case 75:
                _context.next = 61;
                break;

              case 77:
                _context.next = 82;
                break;

              case 79:
                _context.prev = 79;
                _context.t1 = _context["catch"](59);

                _iterator4.e(_context.t1);

              case 82:
                _context.prev = 82;

                _iterator4.f();

                return _context.finish(82);

              case 85:
                _context.next = 56;
                break;

              case 87:
                _context.next = 92;
                break;

              case 89:
                _context.prev = 89;
                _context.t2 = _context["catch"](54);

                _iterator3.e(_context.t2);

              case 92:
                _context.prev = 92;

                _iterator3.f();

                return _context.finish(92);

              case 95:
                _context.next = 139;
                break;

              case 97:
                _iterator5 = _createForOfIteratorHelper(this.down);
                _context.prev = 98;

                _iterator5.s();

              case 100:
                if ((_step5 = _iterator5.n()).done) {
                  _context.next = 131;
                  break;
                }

                _mig2 = _step5.value;
                _iterator6 = _createForOfIteratorHelper(result);
                _context.prev = 103;

                _iterator6.s();

              case 105:
                if ((_step6 = _iterator6.n()).done) {
                  _context.next = 121;
                  break;
                }

                _previous = _step6.value;

                if (!(_mig2.step === _previous.code && _mig2.step > Number(target))) {
                  _context.next = 119;
                  break;
                }

                _context.next = 110;
                return Promise.resolve("".concat(path, "/").concat(_mig2.file)).then(function (s) {
                  return _interopRequireWildcard(require(s));
                });

              case 110:
                _func = _context.sent;
                _setup = _func["default"];
                _context.next = 114;
                return _setup();

              case 114:
                _m = _context.sent;

                if (!(_m === true)) {
                  _context.next = 118;
                  break;
                }

                _context.next = 118;
                return _utils.db.query((0, _utils.aql)(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2["default"])(["\n                FOR m in ", "\n                  FILTER m.code == ", "\n                  REMOVE m IN ", "\n              "])), collection, _previous.code, collection));

              case 118:
                (0, _utils.log)("Reverted ".concat(_mig2.step, " - ").concat(_mig2.migration, " complete!"));

              case 119:
                _context.next = 105;
                break;

              case 121:
                _context.next = 126;
                break;

              case 123:
                _context.prev = 123;
                _context.t3 = _context["catch"](103);

                _iterator6.e(_context.t3);

              case 126:
                _context.prev = 126;

                _iterator6.f();

                return _context.finish(126);

              case 129:
                _context.next = 100;
                break;

              case 131:
                _context.next = 136;
                break;

              case 133:
                _context.prev = 133;
                _context.t4 = _context["catch"](98);

                _iterator5.e(_context.t4);

              case 136:
                _context.prev = 136;

                _iterator5.f();

                return _context.finish(136);

              case 139:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[23, 41, 44, 47], [54, 89, 92, 95], [59, 79, 82, 85], [98, 133, 136, 139], [103, 123, 126, 129]]);
      }));

      function migrate(_x) {
        return _migrate.apply(this, arguments);
      }

      return migrate;
    }()
  }]);
  return Arangrate;
}();

exports.Arangrate = Arangrate;