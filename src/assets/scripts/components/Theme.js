/*
 *  Theme Component
 *    Provides the entire theme container. This module will be directly rendered
 *    to the ReactDOM Container by the root indexer.
 *
 */
import React from 'react';
import Header from './header/Header';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routing/Routes';

export default (props) => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Header />
        <Routes />
      </React.Fragment>
    </BrowserRouter>
  );
};
