import React from 'react';

import DrawerStyles from './Drawer.scss';

export default (props) => {
  props = {...props};
  let { open, right, className, children, onClose } = props;

  delete props.open;
  delete props.right;

  let clazz = "o-drawer";
  if(open) clazz += " is-open";
  if(right) clazz += " is-right";
  if(className) clazz += " " + className;

  return (
    <div {...props} className={clazz}>
      <div className="o-drawer__background" onClick={ onClose }></div>
      <div className="o-drawer__body">
        { children }
      </div>
    </div>
  );
};
