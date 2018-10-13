import React from 'react';
import { withProduct } from './../../wrappers/product/Product';
import Link from './../../routing/Link';

const ProductThumbnail = (props) => {
  let { handle, data, error } = props;

  return (
    <div className="o-product-thumbnail">
      { data.title }
    </div>
  );
}

export default withProduct(ProductThumbnail);
