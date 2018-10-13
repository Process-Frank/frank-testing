/*
 *  Theme Component
 *    Provides the entire theme container. This module will be directly rendered
 *    to the ReactDOM Container by the root indexer.
 *
 */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';//Our router, works in tangent with Shopify

import TemplateList from './template/TemplateList';//Import our template list

export default (props) => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <TemplateList />
      </React.Fragment>
    </BrowserRouter>
  );
};
