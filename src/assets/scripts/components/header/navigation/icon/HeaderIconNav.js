import React from 'react';
import HeaderNavStyles from './../HeaderNav.scss';
import Link from './../../../routing/Link';
import Image from './../../../image/Image';

import AccountIcon from './AccountIcon';
import CartIcon from './CartIcon';

const HeaderIcon = (props) => {
  let { to, children, className } = props;

  let clazz = "c-header-nav__icon-menu-item";
  if(className) clazz += " " +className;

  return (
    <li className={clazz}>
      <Link
        to={ to }
        className="c-header-nav__icon-menu-link"
        title={ props.title }
        activeClassName="is-active"
        aria-label={ props.title }
      >
        <Image
          asset={ props.asset }
          alt={ props.title }
          className="c-header-nav__icon-menu-icon"
        />
      </Link>
    </li>
  );
};

class HeaderIconNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let clazz = "c-header-nav c-header-nav--icons";
    if(this.props.className) clazz += " " + this.props.className;

    return (
      <nav role="navigation" className={clazz}>
        <ul className="c-header-nav__icon-menu">
          <AccountIcon className="c-header-nav__icon-account" />
          <CartIcon className="c-header-nav__icon-cart" />
        </ul>
      </nav>
    );
  }
}

export default HeaderIconNav;
export {
  HeaderIcon
};
