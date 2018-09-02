import React from 'react';
import { withProduct } from './../../wrappers/Product'

const ProductThumbnail = (props) => {
  let { handle, data, error } = props;
  
  return (
    <div className="o-product-thumbnail">
      { data.title }
    </div>
  );
}

export default withProduct(ProductThumbnail);
