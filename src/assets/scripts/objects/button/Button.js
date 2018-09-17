import React from 'react';

import ButtonStyles from './Button.scss';

import Link from './../../routing/Link';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let newProps = {...this.props};
    let { type, className, to, href, block } = newProps;

    //Setup Basic Params
    let ElementType = "button";
    let clazz = "o-btn";

    //Swap Type Based on certain things...
    if(!type) type = "button";
    if(to || href) type = "link";

    //Set Type to class
    clazz += " is-" + type;

    //Adjust Element based on type
    if(type == "link") {
      ElementType = Link;
      newProps.to = newProps.to || newProps.href;
      delete newProps.href;
    }

    if(type == "dummy") {
      ElementType = "div";
    }

    //Styles and other attributes
    if(block) {
      clazz += " is-block";
      delete newProps.block;
    }

    //Class Name Adjustments
    if(newProps.className) clazz += " " + newProps.className;

    //Render
    return <ElementType {...newProps} className={clazz} />;
  }
}
