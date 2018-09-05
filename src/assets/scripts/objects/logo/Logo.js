import React from 'react';
import Link from './../../routing/Link';

import Image from './../image/Image';
import LogoStyles from './Logo.scss';

export default (props) => {
  let { className } = props;

  return (
    <Link {...props} to="/" className={"o-logo " + (className ? className : "") }>
      <Image
        className={"o-logo__image " + (className ? className+"__image":"") }
        asset="logo.svg"
        alt="yourstore"
        title="yourstore"
      />
    </Link>
  );
};
