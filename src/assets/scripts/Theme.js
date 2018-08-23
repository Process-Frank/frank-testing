/*
 *  Theme Component
 *    Provides the entire theme container. This module will be directly rendered
 *    to the ReactDOM Container by the root indexer.
 *
 */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import TopBar from './components/promotion/topbar/TopBar';
import Header from './components/header/Header';
import Routes from './routing/Routes';

export default (props) => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <TopBar />
        <Header />
        <Routes />
      </React.Fragment>
    </BrowserRouter>
  );
};
