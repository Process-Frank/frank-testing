import React from 'react';

export default (props) => {
  let { section, className, children } = props;

  //All sections will pass their props to this, if they're a real section they
  //will likely pass some Shopify attributes.
  let clazz = "c-section";

  if(section) {
    if(section.id) clazz += " c-section--" + section.id;
    if(section.clazz) clazz += " " + section.clazz;
  }

  if(className) clazz += " " + className;

  return (
    <section {...props} className={ clazz } />
  );
}
