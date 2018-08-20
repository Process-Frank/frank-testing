import React from 'react';
import HamburgerMenuStyles from './HamburgerMenu.scss';
import Image from './../../../image/Image';
import Link from './../../../routing/Link';

class HamburgerMenuList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open || false
    }
  }

  render() {
    let { data, level, className } = this.props;
    let { open } = this.state;
    let menuClass = "c-hamburger-menu__list c-hamburger-menu--level-" + level + "__list";
    if(this.props.open) menuClass += " is-open";
    let listItems = [];

    for(let i = 0; i < data.links.length; i++) {
      let link = data.links[i];
      let submenu;
      if(link.submenu) {
        submenu = <HamburgerMenuList
          data={link.submenu}
          level={level+1}
          open={this.state.submenuOpen}
        />;
      }

      //Classes
      let listClasses = "c-hamburger-menu__list-item";
      let linkClasses = "c-hamburger-menu__list-link";

      listItems.push(
        <li className={ listClasses } key={ link.handle }>
          <Link to={ link.url } className={ linkClasses }>
            { link.title }
          </Link>
          { submenu }
        </li>
      );
    }

    return (
      <ul className={menuClass}>
        { listItems }
      </ul>
    );
  }
}

//==//

class HamburgerMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  toggleMenu() {
    this.setState({
      open: !this.state.open
    });
  }

  closeMenu() {
    this.setState({
      open: false
    });
  }

  render() {
    let clazz = "c-hamburger-menu";
    if(this.state.open) clazz += " is-open";
    if(this.props.className) clazz += " " + this.props.className;

    return (
      <div className={clazz} >
        <button type="button" className="c-hamburger-menu__button" onClick={ this.toggleMenu.bind(this) }>
          <Image asset="icon-hamburger.svg" className="c-hamburger-menu__button-icon" />
        </button>

        <div className="c-hamburger-menu__drawer">
          <div className="c-hamburger-menu__drawer-inner">
            <div className="c-hamburger-menu__drawer-backdrop" onClick={ this.closeMenu.bind(this) } />
            <HamburgerMenuList data={this.props.data} level={0} open={this.state.open} />
          </div>
        </div>
      </div>
    );
  }
}

export default HamburgerMenu;
