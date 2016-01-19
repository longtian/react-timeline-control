/**
 * Created by yan on 16-1-19.
 */

import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider,connect} from 'react-redux';

import ControlContainer from '../redux/ControlContainer.jsx';
import reducer from '../redux/reducer.jsx';


let APP = (props)=> {
  return <pre>props:{JSON.stringify(props, null, 2)}</pre>
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


