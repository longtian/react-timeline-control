/**
 * Created by yan on 16-1-19.
 */
import Control from '../Control.jsx';
import {connect} from 'react-redux';

class ControlContainer extends Control {
  setState(state, ...args) {
    super.setState(state, ...args);
    if (state.from_ts) {
      this.props.dispatch({
        type: 'SET_FROM_TS',
        ts: this.state.from_ts
      });
    }
    if (state.to_ts) {
      this.props.dispatch({
        type: 'SET_TO_TS',
        ts: this.state.to_ts
      });
    }
  }
}

export  default connect()(ControlContainer);