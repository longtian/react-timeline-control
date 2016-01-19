/**
 * Created by yan on 16-1-19.
 */

import React,{Component} from 'react';
import moment from 'moment';

const now = Date.now;

const timestamp = (ts)=> {
  return <span>{moment(ts).format('YYYY/MM/DD HH:mm:ss')}</span>
}

class Control extends Component {

  constructor(...args) {
    super(...args);
    this.state = {
      playing: true,
      timeout: 1000,
      duration: 3600000,
      to_ts: now(),
      from_ts: now() - 3600000
    }
  }

  componentDidMount() {
    this.check();
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

  check() {
    if (this.state.playing) {
      this.tick();
    }
    this._timer = setTimeout(this.check.bind(this), this.state.timeout)
  }

  handlePlayClick() {
    this.setState({
      playing: true
    })
    this._timer = this.check();
  }

  handlePauseClick() {
    clearTimeout(this._timer);
    this.setState({
      playing: false
    })
  }

  handleDurationChange(e) {
    clearTimeout(this._timer);
    this.setState({
      duration: e.target.value,
      playing: true
    })
    this._timer = this.check()
  }

  render() {
    return <div>
      <span>Timeout:{this.state.timeout}</span>
      <form>
        <div>
          {timestamp(this.state.from_ts)} - {timestamp(this.state.to_ts)}
        </div>

        <input readOnly value={this.state.from_ts} name="from_ts"/>
        <input readOnly value={this.state.to_ts} name="to_ts"/>

        <select onChange={this.handleDurationChange.bind(this)} value={this.state.duration}>
          <option value="3600000">最近1小时</option>
          <option value="10800000">最近3小时</option>
          <option value="21600000">最近6小时</option>
          <option value="43200000">最近12小时</option>
          <option value="86400000">最近1天</option>
        </select>

        <button disabled={this.state.playing} onClick={this.handlePlayClick.bind(this)}>Play</button>
        <button disabled={!this.state.playing} onClick={this.handlePauseClick.bind(this)}>Pause</button>

      </form>
    </div>
  }
}

export default Control;
