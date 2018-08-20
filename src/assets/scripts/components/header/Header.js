//StaticHeader Section
import React from 'react';
import { connect } from 'react-redux';
import PageBoundary from './../layout/boundary/PageBoundary';

import Logo from './logo/Logo';
import HamburgerMenu from './navigation/hamburger/HamburgerMenu';
import HeaderNav from './navigation/HeaderNav';
import HeaderIconNav from './navigation/icon/HeaderIconNav';
import HeaderStyles from './Header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fixed: false };
  }

  render() {
    let { sections } = this.props;
    let { fixed } = this.state;
    let section = sections["header"][0];

    return (
      <header role="banner" className={"c-header" + (fixed?" is-fixed":"")}>
        <PageBoundary className="c-header__wrapper">
          {/* Mobile Drawer */}
          <HamburgerMenu
            className="c-header__hamburger-menu"
            data={ section.getSetting("menu").value }
          />

          {/* Left Side Menu */}
          <HeaderNav
            className="c-header__menu"
            data={ section.getSetting("menu").value }
            side="left"
          />

          {/* Logo */}
          <Logo className="c-header__logo" />

          {/* Icon Menu */}
          <HeaderIconNav
            className="c-header__icon-nav"
          />
        </PageBoundary>
      </header>
    );
  }
}

//State Props
const mapStateToProps = function(state) {
  return {
    sections: state.sections,
    customer: state.customer
  }
}

export default connect(mapStateToProps)(Header);
