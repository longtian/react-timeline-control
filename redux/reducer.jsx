/**
 * Created by yan on 16-1-19.
 */

import {ACTION_SET} from './constants';

const reducer = (state = {
  from_ts: Date.now() - 3600000,
  to_ts: Date.now()
}, action)=> {
  switch (action.type) {
    case ACTION_SET:
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
}

export default reducer