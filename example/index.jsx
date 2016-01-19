/**
 * Created by yan on 16-1-19.
 */

import React from 'react';
import Control from '../redux/Control.jsx';
import {render} from 'react-dom';

import {createStore} from 'redux';
import {Provider,connect} from 'react-redux';

const reducer = (state = {
  from_ts: Date.now() - 360000,
  to_ts: Date.now()
}, action)=> {
  switch (action.type) {
    case "SET_FROM_TS":
      return Object.assign({}, state, {
        from_ts: action.ts
      });
    case "SET_TO_TS":
      return Object.assign({}, state, {
        to_ts: action.ts
      });
    default:
      return state;
  }
}

let elem = document.createElement('div');
let store = createStore(reducer);

let APP = (props)=> {
  return <pre>props:{JSON.stringify(props, null, 2)}</pre>
}

APP = connect(state=>({
  from_ts: state.from_ts,
  to_ts: state.to_ts,
}))(APP)

render(<Provider store={store}>
  <div>
    <Control/>
    <APP/>
  </div>
</Provider>, elem);

document.body.appendChild(elem);


