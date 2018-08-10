import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/fn/object/values';
import 'core-js/fn/object/entries';
import 'raf/polyfill';
import '../assets/custom/main.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { configureStore } from 'shared/store/state';

import { Root } from 'root';
import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
fontawesome
  .library
  .add(solid, regular);

import { browserHistory } from 'shared/utils';

const store = configureStore();

ReactDOM.render(
  <Root history={browserHistory} store={store} />, document.getElementById('root'));
