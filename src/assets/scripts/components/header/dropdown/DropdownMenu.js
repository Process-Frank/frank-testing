import React from 'react';
import { connect } from 'react-redux';

import DropdownMenuStyles from './DropdownMenu.scss';

import Link from './../../../routing/Link';

class DropdownMenu = (props) => {
  return (
    <nav
      className={"c-dropdown-menu"+(props.className?""+props.className:"")}
      role="navigation"
    >
      <DropdownMenuList />
    </nav>
  );
}

//MenuList
const DropdownMenuList = (props) => {
  let { data, level } = props;

  //Links (may contain sublinks)
  let linkItems = [];
  for(let i = 0; i < data.links.length; i++) {
    let l = data.links[i];
    linkItems.push(<DropdownMenuLink data={l} key={l.handle} level={level} />);
  }

  return (
    <ul className={ "c-dropdown-menu__menu c-dropdown-menu__menu--level-"+level }>
      { linkItems }
    </ul>
  );
};

//DropdownMenuLink (Stated)
class DropdownMenuLink = (props) => {
  let { data, level, className } = props;

  let submenu;
  let hasChildren = data.submenu && data.submenu.links && data.submenu.links.length;

  //Class manipulation
  let clazzPrefix = "c-dropdown-menu__menu--level-" + level;

  let itemClazz = "c-dropdown-menu__menu-item " + clazzPrefix + "-item";
  let linkClazz = "c-dropdown-menu__menu-item-link " + clazzPrefix + "-item-link";
  let iconClazz = "c-dropdown-menu__menu-item-icon " + clazzPrefix + "-item-icon";

  //Submenu(s), recursive
  if(hasChildren) {
    submenu = <DropdownMenuList data={ data.submenu } level={level+1} />;
  }

  //Append Parent Class
  if(className) itemClazz += " " + className;

  return (
    <li {...this.props} className={itemClazz}>
      <Link to={ data.url } className={ linkClazz }>
        { data.title }
      </Link>
      { submenu }
    </li>
  );
}

export default DropdownMenu;
