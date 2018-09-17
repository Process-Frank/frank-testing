import React from 'react';

export default (props) => {
  let { className } = props;
  className = className ? " " + className : "";
  className = "o-paragraph"+className;

  return <p {...props} className={className} />
};
