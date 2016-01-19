#!/usr/bin/env bash
./node_modules/.bin/babel redux/ControlContainer.jsx -o redux/ControlContainer.js
./node_modules/.bin/babel redux/reducer.jsx -o redux/reducer.js
./node_modules/.bin/babel lib/Control.jsx -o lib/Control.js