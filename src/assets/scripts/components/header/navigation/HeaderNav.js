import React from 'react';
import Link from './../../routing/Link';

import HeaderNavStyles from './HeaderNav.scss';

const HeaderNavLink = (props) => {
  let { url, submenu, title } = props.data;
  let submenuElement;
  let clazzItem = "c-header-nav__menu-item c-header-nav__menu--level-"+props.level+"__item";
  let clazzLink = "c-header-nav__menu-link c-header-nav__menu--level-"+props.level+"__link"
  if(submenu) {
    submenuElement = <HeaderNavMenu level={ props.level+1 } data={ submenu } />
    clazzItem += " has-submenu";
    clazzLink += " has-submenu";
  }


  return (
    <li className={clazzItem}>
      <Link to={ url } title={ title } className={clazzLink} activeClassName="is-active">
        { title }
      </Link>
      { submenuElement }
    </li>
  );
};


const HeaderNavMenu = (props) => {
  let linkElements = [];

  for(let i = 0; i < props.data.links.length; i++) {
    let link = props.data.links[i]
    linkElements.push(
      <HeaderNavLink level={props.level} data={link} key={link.handle} />
    );
  }

  return (
    <ul className={"c-header-nav__menu c-header-nav__menu--level-"+props.level}>
      { linkElements }
    </ul>
  );
}

const HeaderNav = (props) => {
  return (
    <nav role="navigation" className={"c-header-nav "+props.className}>
      <HeaderNavMenu side={props.side} data={props.data} level={0} />
    </nav>
  );
};

export default HeaderNav;
