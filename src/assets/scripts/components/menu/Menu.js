import React from 'react';
import Link from './../../routing/Link';

//Menu Itself
const Menu = (props) => {
  let { className, listItem, data, level } = props;

  //Defaults
  data = data || {};
  data.links = data.links || [];
  level = level || 0;

  let ListElement = listItem || "ul";

  //Class Names
  let clazz = "c-menu c-menu--level-" + level;
  if(className) clazz += " " + className + " " + className + "--level-" + level;

  //Build...
  let links = [];
  for(let i = 0; i < data.links.length; i++) {
    let l = data.links[i];
    links.push(<MenuItem {...props} data={ l } key={ l.handle } level={ level } />);
  }

  return <ListElement className={ clazz } children={ links } />;
};

//Menu Item
const MenuItem = (props) => {
  let { className, data, level, menuItem, onLinkClick } = props;
  let { title, url, submenu } = data;

  //Defaults
  level = level || 0;

  let ItemElement = menuItem || "li";
  let hasChildren = submenu && submenu.links && submenu.links.length;
  let submenuElement;

  //Class Names
  let clazz = "c-menu__item c-menu__item--level-"+level;
  let linkClazz = "c-menu__item-link c-menu__item-link--level-" + level;
  if(className) {
    clazz += " " + className + "__item";
    clazz += " " + className + "__item--level-" + level;
    linkClazz += " "  + className + "__item-link";
    linkClazz += " " + className + "__item-link--level-" + level;
  }

  //Submenu
  if(hasChildren) {
    submenuElement = <Menu { ...props } data={ submenu } level={ level+1 } />;
    clazz += " has-children";
  }

  return (
    <ItemElement {...props} className={clazz} level={level}>
      <Link title={ title } to={ url } className={ linkClazz } onClick={ onLinkClick }>
        { title }
      </Link>

      { submenuElement }
    </ItemElement>
  );
};

export default Menu;
