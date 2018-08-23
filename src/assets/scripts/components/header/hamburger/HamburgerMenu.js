import React from 'react';
import { connect } from 'react-redux';

import Image from './../../../objects/image/Image';
import HamburgerMenuStyles from './HamburgerMenu.scss';
import * as HamburgerMenuActions from './../../../actions/HamburgerMenuActions';

import Link from './../../../routing/Link';

class HamburgerMenu extends React.Component {
  render() {
    let clazz = "c-hamburger-menu";
    let asset = "icon-hamburger.svg";

    if(this.props.open) {
      clazz += " is-open";
      asset = "icon-close.svg";
    }

    if(this.props.className) clazz += " " + this.props.className;

    return (
      <nav className={ clazz } role="navigation">
        <button
          className="c-hamburger-menu__button"
          onClick={this.props.toggleMenu}
        >
          <Image asset={ asset } className="c-hamburger-menu__button-image" />
        </button>

        <div className="c-hamburger-menu__menu-wrapper">
          <HamburgerMenuList data={ this.props.data } level={0} />
        </div>
      </nav>
    );
  }
}

//MenuList
const HamburgerMenuList = (props) => {
  let { data, level } = props;

  //Links (may contain sublinks)
  let linkItems = [];
  for(let i = 0; i < data.links.length; i++) {
    let l = data.links[i];
    linkItems.push(<HamburgerMenuLink data={l} key={l.handle} level={level} />);
  }

  return (
    <ul className={ "c-hamburger-menu__menu c-hamburger-menu__menu--level-"+level }>
      { linkItems }
    </ul>
  );
};

//HamburgerMenuLink (Stated)
class HamburgerMenuLink extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expaned: false
    };
  }

  toggleExpand() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    let { data, level, className } = this.props;
    let { expanded } = this.state;

    let clickHandler;
    let submenu;
    let hasChildren = data.submenu && data.submenu.links && data.submenu.links.length;
    let expandIcon;

    //Class manipulation
    let clazzPrefix = "c-hamburger-menu__menu--level-" + level;

    let itemClazz = "c-hamburger-menu__menu-item " + clazzPrefix + "-item";
    let linkClazz = "c-hamburger-menu__menu-item-link " + clazzPrefix + "-item-link";
    let iconClazz = "c-hamburger-menu__menu-item-icon " + clazzPrefix + "-item-icon";

    //Submenu(s), recursive
    if(hasChildren) {
      submenu = <HamburgerMenuList data={ data.submenu } level={level+1} />;
      clickHandler = this.toggleExpand.bind(this);//Listen for expand
      itemClazz += " has-children";
    }

    if(expanded) {
      itemClazz += " is-expanded";
      expandIcon = <Image asset="icon-close.svg" className={ iconClazz } />;
    } else {
      expandIcon = <Image asset="icon-plus.svg" className={ iconClazz } />;
    }

    //Append Parent Class
    if(className) itemClazz += " " + className;

    return (
      <li {...this.props} className={itemClazz}>
        <Link to={ data.url } className={ linkClazz } onClick={clickHandler} >
          { data.title }

          { expandIcon }
        </Link>
        { submenu }
      </li>
    );
  }
}


//Finally, Exporting
export {
  HamburgerMenuLink,
  HamburgerMenuList
}
export default connect((state) => {
  return {
    open: state.hamburgerMenu.open
  }
}, (dispatch) => {
  return {
    toggleMenu: () => {
      dispatch(HamburgerMenuActions.toggleMenu());
    }
  }
})(HamburgerMenu);
