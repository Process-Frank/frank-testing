import React from 'react';
//import Section from './../Section';

export default (props) => {
  return (
    <div {...props}>
      { props.error || "Failed to load section" }
    </div>
  );
};
