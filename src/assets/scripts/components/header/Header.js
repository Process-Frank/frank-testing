//StaticHeader Section
import React from 'react';
import { connect } from 'react-redux';
import StaticSection from './../sections/StaticSection';
import PageBoundary from './../../objects/layout/boundary/PageBoundary';

import HamburgerMenu from './hamburger/HamburgerMenu';
import Logo from './../../objects/logo/Logo';
import CartDrawer from './cart/CartDrawer';
import HeaderStyles from './Header.scss';

const Header = (props) => {
  let { menu } = props.data.settingsById;

  return (
    <header role="banner" className={"c-header"}>
      <PageBoundary className="c-header__wrapper">
        <HamburgerMenu className="c-header__hamburger" data={ menu.value } />
        <Logo className="c-header__logo" />
        <CartDrawer className="c-header__cart" />
      </PageBoundary>
    </header>
  );
};

export default (props) => {
  return <StaticSection {...props} group="header" component={Header} />;
}
