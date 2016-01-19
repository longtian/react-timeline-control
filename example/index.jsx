/**
 * Created by yan on 16-1-19.
 */

import React from 'react';
import Control from '../Control.jsx';
import {render} from 'react-dom';

var elem = document.createElement('div');
render(<Control/>, elem);

document.body.appendChild(elem);


