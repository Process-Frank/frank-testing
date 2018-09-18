import React from 'react';
import ContentBoxStyles from './ContentBox.scss';

export default (props) => {
  props = {...props};
  let clazz = "o-content-box";

  //Floating?
  if(props.floating) clazz += " is-floating";

  //Size Definitions
  if(props.small) props.size = "small";
  if(props.medium) props.size = "medium";
  if(props.large) props.size = "large";
  if(props.size) clazz += " is-" + props.size;
  delete props.size;

  //Positions
  let pos = props.position;
  if(pos && pos.indexOf("is-") === -1) pos = pos.split(' ').map( i => 'is-'+i ).join(' ');

  if(props.left) {
    pos += " is-left";
  } else if(props.right) {
    pos += " is-right";
  } else if(props.center) {
    pos += " is-center";
  }

  if(props.top) {
    pos += " is-top";
  } else if(props.bottom) {
    pos += " is-bottom";
  } else if(props.middle) {
    pos += " is-middle";
  }

  if(props.floating) {
    if(!pos.length) pos = "is-middle is-center";
    clazz += " " + pos;
  }

  //Any additional clazzes?
  if(props.className) clazz += " "+props.className;

  return (
    <div className={clazz}>
      <div className="o-content-box__inner">
        { props.children }
      </div>
    </div>
  );
};
