import React from 'react';
import { HeaderIcon } from './HeaderIconNav';
import Image from './../../../image/Image';

export default (props) => {
  return (
    <HeaderIcon to="/cart">
      <Image asset="icon-cart.svg" alt="Cart" title="Cart" />
    </HeaderIcon>
  );
};
