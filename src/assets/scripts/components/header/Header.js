//StaticHeader Section
import React from 'react';
import { withSection } from './../../wrappers/Section';

import PageBoundary from './../../objects/layout/boundary/PageBoundary';
import HamburgerMenu from './hamburger/HamburgerMenu';
import Logo from './../../objects/logo/Logo';
import CartDrawer from './cart/CartDrawer';
import HeaderStyles from './Header.scss';

const Header = withSection((props) => {
  let { menu } = props.settings;

  return (
    <header role="banner" className={"c-header"}>
      <PageBoundary className="c-header__wrapper">
        <HamburgerMenu className="c-header__hamburger" data={ menu.value } />
        <Logo className="c-header__logo" />
        <CartDrawer className="c-header__cart" />
      </PageBoundary>
    </header>
  );
});

export default (props) => <Header group="header" {...props} />;
