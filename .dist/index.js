"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "aql", {
  enumerable: true,
  get: function get() {
    return _utils.aql;
  }
});
Object.defineProperty(exports, "db", {
  enumerable: true,
  get: function get() {
    return _utils.db;
  }
});
Object.defineProperty(exports, "createCollection", {
  enumerable: true,
  get: function get() {
    return _utils.createCollection;
  }
});
Object.defineProperty(exports, "createEdgeCollection", {
  enumerable: true,
  get: function get() {
    return _utils.createEdgeCollection;
  }
});
Object.defineProperty(exports, "dropCollection", {
  enumerable: true,
  get: function get() {
    return _utils.dropCollection;
  }
});
Object.defineProperty(exports, "arangrate", {
  enumerable: true,
  get: function get() {
    return _migrate.migrate;
  }
});

require("dotenv/config");

var _utils = require("./utils");

var _migrate = require("./migrate");