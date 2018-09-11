import React from 'react';
import Routes, { RouteWrapper } from './../../routing/Routes';

import IndexTemplate from './index/IndexTemplate';

export default (props) => {
  return (
    <Routes>
      <RouteWrapper exact path="/" template={ () => import('./index/IndexTemplate') } />

      <RouteWrapper exact path="/collections/:collection/:tag?" template={ () => import('./collection/CollectionTemplate') } />

      <RouteWrapper exact path="/collections/:collection/:tag/products/:product" template={ () => import('./product/ProductTemplate') } />
      <RouteWrapper exact path="/collections/:collection/products/:product" template={ () => import('./product/ProductTemplate') } />
      <RouteWrapper exact path="/products/:product" template={ () => import('./product/ProductTemplate') } />
    </Routes>
  );
}
