import React from 'react';

import CartDrawerStyles from './CartDrawer.scss';
import Image from './../../../objects/image/Image';
import Link from './../../../routing/Link';

export default (props) => {
  return (
    <div className={"c-cart-drawer"+(props.className?" "+props.className:"")}>
      <Link to="/cart" className="c-cart-drawer__button">
        <Image asset="icon-cart.svg" className="c-cart-drawer__button-image" />
      </Link>
    </div>
  );
};
