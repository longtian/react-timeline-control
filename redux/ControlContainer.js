'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Control2 = require('../lib/Control.js');

var _Control3 = _interopRequireDefault(_Control2);

var _reactRedux = require('react-redux');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by yan on 16-1-19.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ControlContainer = function (_Control) {
  _inherits(ControlContainer, _Control);

  function ControlContainer() {
    _classCallCheck(this, ControlContainer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ControlContainer).apply(this, arguments));
  }

  _createClass(ControlContainer, [{
    key: 'setState',
    value: function setState(state) {
      var _get2;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      (_get2 = _get(Object.getPrototypeOf(ControlContainer.prototype), 'setState', this)).call.apply(_get2, [this, state].concat(args));

      // 不可以在这个方法里直接访问 this.state ,因为此时 state 还未被更新

      var action = {
        type: _constants.ACTION_SET
      };

      if (state.from_ts) {
        action.from_ts = state.from_ts;
      }

      if (state.to_ts) {
        action.to_ts = state.to_ts;
      }

      if (action.from_ts || action.to_ts) {
        this.props.dispatch(action);
      }
    }
  }]);

  return ControlContainer;
}(_Control3.default);

exports.default = (0, _reactRedux.connect)()(ControlContainer);
