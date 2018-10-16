import React from 'react';
import Image from './../image/Image';

import IconStyles from './Icon.scss';

export default (props) => {
  let { name, className, baseline } = props;
  let image = "icon-" + name + ".svg";
  className = "o-icon o-icon--"+name;

  if(baseline) className += ' is-baseline';
  if(className) className += ` ${className}`;

  return (
    <span className={className}>
      <Image {...props} className="o-icon__image" asset={ image } />
    </span>
  );
};
