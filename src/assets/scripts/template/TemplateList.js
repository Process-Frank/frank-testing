import React from 'react';
import Routes, { RouteWrapper } from './../routing/Routes';

export default (props) => {
  return (
    <Routes>
      {/* Index Templates */}
      <RouteWrapper exact path="/" template={ () => import('./index/IndexTemplate') } />

      {/* Collection Templates */}
      <RouteWrapper exact path="/collections/:collection/:tag?" template={ () => import('./collection/CollectionTemplate') } />

      {/* Product Templates */}
      <RouteWrapper exact path="/collections/:collection/:tag/products/:product" template={ () => import('./product/ProductTemplate') } />
      <RouteWrapper exact path="/collections/:collection/products/:product" template={ () => import('./product/ProductTemplate') } />
      <RouteWrapper exact path="/products/:product" template={ () => import('./product/ProductTemplate') } />

      {/*
        END of supported templates (Excl. 404), everything below this line is
        not guaranteed to work!
      */}

      {/* CUSTOM (404 hacking) Templates */}
      <RouteWrapper exact path="/test/kitchen-sink" template={ () => import('./test/KitchenSinkTemplate') } />
    </Routes>
  );
}
