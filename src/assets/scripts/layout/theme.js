// Copyright (c) 2018 Process Creative
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

//Operate in strict mode.
'use strict';

//Needed first
import 'babel-polyfill';//Required polyfills

//Required modules
import React from 'react';                                  //Needed to render JSX
import ReactDOM from 'react-dom';                           //Needed to render to DOM
import { createStore, applyMiddleware } from 'redux';       //Needed for state management
import { Provider } from 'react-redux';                     //Connecting React and Redux
import RootReducer from './../reducers/RootReducer';        //RootReducer, contains all sub-reducers
import Theme from './../Theme';                             //Starting point, this will render everything else.
import promiseMiddleware from 'redux-promise-middleware';   //Allows use to use async actions.
import { createLogger } from 'redux-logger';                //For debugging purposes.

//Import our GLOBAL Styles
import Styles from './../../styles/theme.scss';

//Create our redux && middleware(s)
const store = createStore(RootReducer, applyMiddleware(
  promiseMiddleware(),
  createLogger({ collapsed: true })
));

//For testing/debugging the object will be stored onto the window.
window.store = store;

//Setup the initial render, while you CAN customize this, don't.
ReactDOM.render((
  <Provider store={store}>
    <Theme />
  </Provider>
), document.getElementById("main"));
//At this point React is now rendering everything to the DOM.
