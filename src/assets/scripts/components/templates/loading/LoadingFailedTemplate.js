import React from 'react';
import Template from './../Template';

export default (props) => {
  return (
    <Template {...props}>
      Failed to load template:<br />
      { props.error || "Unknown Error" }
    </Template>
  );
}
