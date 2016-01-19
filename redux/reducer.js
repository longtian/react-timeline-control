'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants');

var reducer = function reducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {
    from_ts: Date.now() - 3600000,
    to_ts: Date.now()
  } : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case _constants.ACTION_SET:
      if (action.from_ts && action.to_ts) {
        return Object.assign({}, state, {
          from_ts: action.from_ts,
          to_ts: action.to_ts
        });
      } else if (action.from_ts) {
        return Object.assign({}, state, {
          from_ts: action.from_ts
        });
      } else if (action.to_ts) {
        return Object.assign({}, state, {
          to_ts: action.to_ts
        });
      } else {
        return state;
      }
    default:
      return state;
  }
}; /**
    * Created by yan on 16-1-19.
    */

exports.default = reducer;
