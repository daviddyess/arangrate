"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("./utils");

var _migrate = _interopRequireDefault(require("./migrate"));

var _default = {
  createCollection: _utils.createCollection,
  createEdgeCollection: _utils.createEdgeCollection,
  dropCollection: _utils.dropCollection,
  migrate: _migrate["default"]
};
exports["default"] = _default;