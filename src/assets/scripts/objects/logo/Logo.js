import React from 'react';
import Link from './../../routing/Link';

import Image from './../image/Image';
import LogoStyles from './Logo.scss';

import { withShop } from './../../wrappers/ShopifyWrappers';

export default withShop((props) => {
  let { className, shop } = props;
  let { name } = shop;

  return (
    <Link {...props} to="/" className={"o-logo " + (className ? className : "") }>
      <Image
        className={"o-logo__image "+(className ? className+"__image":"") }
        asset="logo.svg"
        title={ name }
      />
    </Link>
  );
});
