import React from 'react';
import DropdownMenuStyles from './DropdownMenu.scss';
import Menu from './../Menu';

export default (props) => {
  let { className } = props;
  return (<div className={props.className}>
    <Menu {...props} className="c-dropdown-menu" />
  </div>);
};
