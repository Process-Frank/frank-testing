import React from 'react';

export default (props) => {
  let p = Object.assign({}, props);
  let d = p.data || {};

  //All sections will pass their props to this, if they're a real section they
  //will likely pass some Shopify attributes.
  let clazz = "c-section";

  if(d.id) clazz += " c-section--" + d.id;
  if(d.clazz) clazz += " " + d.clazz;
  if(p.className) clazz += " " + p.className;

  //TODO: The ability to listen for Shopify's section events would be great.

  return (
    <section className={clazz}>
      { p.children }
    </section>
  );
}
