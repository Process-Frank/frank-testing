import React from 'react';
import HeaderNavStyles from './../HeaderNav.scss';
import CartIcon from './CartIcon';

const HeaderIcon = (props) => {
  return (
    <li className="c-header-nav__menu-item">
      { props.children }
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

    let icons = [];
    icons.push(<CartIcon />);

    return (
      <nav role="navigation" className={clazz}>
        <ul className="c-header-nav__menu c-header-nav__menu--level-0">
          { icons }
        </ul>
      </nav>
    );
  }
}

export default HeaderIconNav;
export {
  HeaderIcon
};
