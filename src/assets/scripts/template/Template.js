import React from 'react';

export default (props) => {
  let className = "c-template";
  if(props.className) className += " " + props.className;

  return <main {...props} className={ className } />;
};
