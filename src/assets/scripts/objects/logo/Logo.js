import React from 'react';
import Link from './../../routing/Link';

import Image from './../image/Image';
import LogoStyles from './Logo.scss';

export default (props) => {
  return (
    <Link {...props} to="/" className={"o-logo " + (props.className ? props.className : "") }>
      <Image
        className={"o-logo__image " + (props.className ? props.className+"__image":"") }
        asset="logo.svg"
        alt="yourstore"
        title="yourstore"
      />
    </Link>
  );
};
