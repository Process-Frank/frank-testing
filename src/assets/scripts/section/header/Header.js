import React from 'react';
import { withSection, withCustomer } from './../../wrappers/ShopifyWrappers';

import PageBoundary from './../../objects/layout/boundary/PageBoundary';
import HeaderStyles from './Header.scss';

//Components
import DropdownMenu from './../../components/menu/dropdown/DropdownMenu';
import HamburgerMenu from './../../components/menu/hamburger/HamburgerMenu';

//Objects
import Logo from './../../objects/logo/Logo';
import Icon from './../../objects/icon/Icon';
import Link from './../../routing/Link';

const Header = withCustomer(withSection((props) => {
  let newProps = { ...props };
  let { settings, customersEnabled, customer } = newProps;
  let { menu } = settings;

  delete newProps.customersEnabled;
  delete newProps.customer;

  let accountIcon;
  if(props.customersEnabled) {
    let accountUrl = "/account/login";
    if(customer) accountUrl = '/account';
    accountIcon = <HeaderIcon to={accountUrl} name="account" />;
  }

  let accountUrl = '/account/login';
  if(props.customer) accountUrl = '/account/login';

  return (
    <header {...newProps} className="c-header" role="navigation">
      <PageBoundary className="c-header__boundary">

        {/* Desktop Menu */}
        <DropdownMenu data={ menu } className="c-header__menu" />
        <HamburgerMenu data={ menu } className="c-header__hamburger" />

        {/* Hamburger Menu (For Mobile) */}

        {/* Logo */}
        <Logo className="c-header__logo" />

        {/* Icon nav */}
        <div className="c-header__icons">
          <HeaderIcon to="/search" name="search" />
        </div>

      </PageBoundary>
    </header>
  );
}));


const HeaderIcon = (props) => {
  let contents = <Icon name={ props.name } className="c-header__icon-icon" />;
  if(props.to) {
    return <Link to={props.to} className="c-header__icon">{ contents }</Link>
  }
  return <button type="button" className="c-header__icon">{ contents }</button>;
}


export default (props) => <Header group="header" {...props} />;
