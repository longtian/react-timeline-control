'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by yan on 16-1-19.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var now = Date.now;

/**
 * 时间选择器
 */

var Control = function (_Component) {
  _inherits(Control, _Component);

  function Control(props) {
    var _Object$getPrototypeO;

    _classCallCheck(this, Control);

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Control)).call.apply(_Object$getPrototypeO, [this, props].concat(args)));

    _this.state = {
      playing: true,
      interval: props.interval,
      duration: props.default_duration,
      to_ts: now(),
      from_ts: now() - props.default_duration,
      message: null
    };
    return _this;
  }

  _createClass(Control, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._timer = setInterval(this.tick.bind(this), this.state.interval);
    }
  }, {
    key: 'tick',
    value: function tick() {
      var duration = this.state.duration;
      var to_ts = now();
      var from_ts = now() - duration;
      this.setState({
        to_ts: now(),
        from_ts: now() - duration
      });
    }
  }, {
    key: 'handlePlayClick',
    value: function handlePlayClick() {
      this.setState({
        playing: true,
        duration: this.state.duration == -1 ? this.props.default_duration : this.state.duration
      });
      this._timer = setInterval(this.tick.bind(this), this.props.interval);
    }
  }, {
    key: 'handlePauseClick',
    value: function handlePauseClick() {
      this.setState({
        playing: false
      });
      clearInterval(this._timer);
    }
  }, {
    key: 'handleDurationChange',
    value: function handleDurationChange(e) {
      clearInterval(this._timer);

      var duration = parseInt(e.target.value);
      if (duration < 0) {
        this.setState({
          duration: duration,
          playing: false,
          message: null
        });
      } else {
        var to_ts = now();
        var from_ts = now() - duration;
        this.setState({
          duration: duration,
          playing: true,
          to_ts: now(),
          from_ts: now() - duration,
          message: null
        });
        this._timer = setInterval(this.tick.bind(this), this.props.interval);
      }
    }
  }, {
    key: 'handleTimeChange',
    value: function handleTimeChange(field, e) {
      var newTs = (0, _moment2.default)(e.target.value).unix() * 1000;
      if (isNaN(newTs)) {
        return this.setState({
          message: '请输入正确的时间'
        });
      }
      if (field == 'from_ts') {
        this.validateFromTs(newTs);
      } else if (field == 'to_ts') {
        this.validateToTs(newTs);
      }
    }
  }, {
    key: 'validateFromTs',
    value: function validateFromTs(newTs) {
      if (newTs >= this.state.to_ts) {
        return this.setState({
          message: '开始时间不能比结束时间早'
        });
      }
      this.setState({
        from_ts: newTs,
        message: null
      });
    }
  }, {
    key: 'validateToTs',
    value: function validateToTs(newTs) {
      if (newTs <= this.state.from_ts) {
        return this.setState({
          message: '结束时间不能比开始时间早'
        });
      }
      this.setState({
        to_ts: newTs,
        message: null
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'form',
          { className: 'form-inline' },
          _react2.default.createElement(
            'select',
            { className: 'form-control', onChange: this.handleDurationChange.bind(this), value: this.state.duration },
            _react2.default.createElement(
              'option',
              { value: '3600000' },
              '最近1小时'
            ),
            _react2.default.createElement(
              'option',
              { value: '10800000' },
              '最近3小时'
            ),
            _react2.default.createElement(
              'option',
              { value: '21600000' },
              '最近6小时'
            ),
            _react2.default.createElement(
              'option',
              { value: '43200000' },
              '最近12小时'
            ),
            _react2.default.createElement(
              'option',
              { value: '86400000' },
              '最近1天'
            ),
            _react2.default.createElement(
              'option',
              { value: '-1' },
              '自定义'
            )
          ),
          _react2.default.createElement(
            'span',
            { style: { display: this.state.duration == -1 ? 'inline' : 'none' } },
            _react2.default.createElement(
              'label',
              null,
              '开始时间:',
              _react2.default.createElement('input', { className: 'form-control',
                readOnly: this.state.duration != -1,
                type: 'datetime-local',
                value: (0, _moment2.default)(this.state.from_ts).format('YYYY-MM-DDTHH:mm:ss'),
                onChange: this.handleTimeChange.bind(this, 'from_ts')
              })
            ),
            _react2.default.createElement(
              'label',
              null,
              '结束时间:',
              _react2.default.createElement('input', { className: 'form-control',
                readOnly: this.state.duration != -1,
                type: 'datetime-local',
                value: (0, _moment2.default)(this.state.to_ts).format('YYYY-MM-DDTHH:mm:ss'),
                onChange: this.handleTimeChange.bind(this, 'to_ts')
              })
            )
          ),
          _react2.default.createElement(
            'button',
            { className: 'btn btn-primary', disabled: this.state.playing, onClick: this.handlePlayClick.bind(this) },
            _react2.default.createElement('i', { className: 'glyphicon glyphicon-play' })
          ),
          _react2.default.createElement(
            'button',
            { className: 'btn btn-primary', disabled: !this.state.playing, onClick: this.handlePauseClick.bind(this) },
            _react2.default.createElement('i', { className: 'glyphicon glyphicon-pause' })
          ),
          _react2.default.createElement(
            'span',
            { style: { color: 'red' } },
            this.state.message
          )
        )
      );
    }
  }]);

  return Control;
}(_react.Component);

Control.defaultProps = {
  interval: 5000,
  default_duration: 3600000
};

exports.default = Control;
