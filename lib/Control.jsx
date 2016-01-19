/**
 * Created by yan on 16-1-19.
 */

import React,{Component} from 'react';
import moment from 'moment';

const now = Date.now;

/**
 * 时间选择器
 */
class Control extends Component {

  constructor(props, ...args) {
    super(props, ...args);
    this.state = {
      playing: true,
      interval: props.interval,
      duration: props.default_duration,
      to_ts: now(),
      from_ts: now() - props.default_duration,
      message: null
    }
  }

  componentDidMount() {
    this._timer = setInterval(this.tick.bind(this), this.state.interval)
  }

  tick() {
    let duration = this.state.duration;
    let to_ts = now();
    let from_ts = now() - duration;
    this.setState({
      to_ts: now(),
      from_ts: now() - duration
    });
  }

  handlePlayClick() {
    this.setState({
      playing: true,
      duration: this.state.duration == -1 ? this.props.default_duration : this.state.duration
    });
  }

  handlePauseClick() {
    this.setState({
      playing: false
    })
  }

  handleDurationChange(e) {
    clearInterval(this._timer);

    let duration = parseInt(e.target.value);
    if (duration < 0) {
      this.setState({
        duration,
        playing: false,
        message: null
      });
    } else {
      let to_ts = now();
      let from_ts = now() - duration;
      this.setState({
        duration,
        playing: true,
        to_ts: now(),
        from_ts: now() - duration,
        message: null
      });
    }

    this._timer = setInterval(this.tick.bind(this), this.props.interval)
  }

  handleTimeChange(field, e) {
    var newTs = moment(e.target.value).unix() * 1000;
    if (isNaN(newTs)) {
      return this.setState({
        message: '请输入正确的时间'
      })
    }
    if (field == 'from_ts') {
      this.validateFromTs(newTs)
    } else if (field == 'to_ts') {
      this.validateToTs(newTs)
    }
  }

  validateFromTs(newTs) {
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

  validateToTs(newTs) {
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

  render() {
    return <div>
      <form>
        <select onChange={this.handleDurationChange.bind(this)} value={this.state.duration}>
          <option value="3600000">最近1小时</option>
          <option value="10800000">最近3小时</option>
          <option value="21600000">最近6小时</option>
          <option value="43200000">最近12小时</option>
          <option value="86400000">最近1天</option>
          <option value="-1">自定义</option>
        </select>
        <span style={{display:this.state.duration==-1?'inline':'none'}}>
          <label>
            开始时间:
            <input readOnly={this.state.duration!=-1}
                   type="datetime-local"
                   value={moment(this.state.from_ts).format('YYYY-MM-DDTHH:mm:ss')}
                   onChange={this.handleTimeChange.bind(this,'from_ts')}
            />
          </label>
          <label>
            结束时间:
            <input readOnly={this.state.duration!=-1}
                   type="datetime-local"
                   value={moment(this.state.to_ts).format('YYYY-MM-DDTHH:mm:ss')}
                   onChange={this.handleTimeChange.bind(this,'to_ts')}
            />
          </label>
        </span>
        <button disabled={this.state.playing} onClick={this.handlePlayClick.bind(this)}>Play</button>
        <button disabled={!this.state.playing} onClick={this.handlePauseClick.bind(this)}>Pause</button>
        <span style={{color:'red'}}>{this.state.message}</span>
      </form>
      <pre>{JSON.stringify(this.state, null, 2)}</pre>
    </div>
  }
}

Control.defaultProps = {
  interval: 5000,
  default_duration: 3600000
}

export default Control;
