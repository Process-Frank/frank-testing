import React from 'react';
import HeadingStyles from './Heading.scss';

const Heading = (props) => {
  let { className, size, color } = props;
  props = { ...props };
  let ElementType = "h1";
  let clazz = "o-heading";
  let style = {...props.style};

  //Size default
  if(!size) size = "1";

  //Clazzes
  if(size == "title") {
    clazz = "o-title";
  } else if(size == "subtitle") {
    ElementType = "p";
    clazz = "o-subtitle";
  } else {
    ElementType = "h" + size;
    clazz += " o-heading--" + size;
  }

  //Styles
  if(color && color.value) color = color.value;
  if(color) style.color = color;
  delete props.color;

  if(className) clazz += " " + className;

  return <ElementType {...props} className={clazz} style={style} />
};

//Shorthands
export const Title = (props) => <Heading size="title" {...props} />;
export const Subtitle = (props) => <Heading size="subtitle" {...props} />;

export const Heading1 = (props) => <Heading size="1" {...props} />;
export const Heading2 = (props) => <Heading size="2" {...props} />;
export const Heading3 = (props) => <Heading size="3" {...props} />;
export const Heading4 = (props) => <Heading size="4" {...props} />;
export const Heading5 = (props) => <Heading size="5" {...props} />;
export const Heading6 = (props) => <Heading size="6" {...props} />;

export default Heading;
