import React from 'react';
import Template from './../Template';

export default (props) => {
  return (
    <Template>
      Failed to load template:<br />
      { props.error || "Unknown Error" }
    </Template>
  );
}
