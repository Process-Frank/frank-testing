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
    <header role="banner" className={"c-header is-sticky"+(props.className ? " "+props.className : "")}>
      <PageBoundary className="c-header__wrapper">
        
        {/* Icons and Hamburger Menu */}
        <div className="c-header__icons">
          <HamburgerMenu className="c-header__hamburger" data={ menu.value } />
          <CartDrawer className="c-header__cart" />
        </div>

        {/* Logo */}
        <Logo className="c-header__logo" />

        {/* Logo Bars */}
        <div className="c-header__bar c-header__bar--left" />
        <div className="c-header__bar c-header__bar--right" />

        {/* Menu */}

      </PageBoundary>
    </header>
  );
});

export default (props) => <Header group="header" {...props} />;
