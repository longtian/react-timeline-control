/**
 * Created by yan on 16-1-19.
 */
import Control from '../lib/Control.js';
import {connect} from 'react-redux';
import {ACTION_SET} from './constants';

class ControlContainer extends Control {
  setState(state, ...args) {
    super.setState(state, ...args);


    // 不可以在这个方法里直接访问 this.state ,因为此时 state 还未被更新

    let action = {
      type: ACTION_SET,
    }

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
}

export  default connect()(ControlContainer);