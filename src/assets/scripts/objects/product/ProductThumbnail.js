import React from 'react';

export default (props) => {
  let { handle } = props;
  return (
    <div className="o-product-thumbnail">
      { handle }
    </div>
  );
}
