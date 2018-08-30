import React from 'react';
import Routes, { RouteWrapper } from './../../routing/Routes';

import IndexTemplate from './index/IndexTemplate';

export default (props) => {
  return (
    <Routes>
      <RouteWrapper exact path="/" template={ () => import('./index/IndexTemplate') } />
      <RouteWrapper exact path="/collections/:collection/:tag?" template={ () => import('./collection/CollectionTemplate') } />
    </Routes>
  );
}