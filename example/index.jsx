/**
 * Created by yan on 16-1-19.
 */

import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider,connect} from 'react-redux';

import ControlContainer from '../redux/ControlContainer.jsx';
import reducer from '../redux/reducer.jsx';

import moment from 'moment';

let APP = (props)=> {
  return <div>
    <h5>{moment(props.from_ts).format('YYYY/MM/DD HH:mm:ss')}</h5>
    <h5>{moment(props.to_ts).format('YYYY/MM/DD HH:mm:ss')}</h5>
  </div>
}

APP = connect(state=>({
  from_ts: state.from_ts,
  to_ts: state.to_ts,
}))(APP)

let store = createStore(reducer);

let elem = document.createElement('div');
render(<Provider store={store}>
  <div>
    <ControlContainer/>
    <APP/>
  </div>
</Provider>, elem);
document.body.appendChild(elem);


