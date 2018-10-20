import React from 'react';
import { withProduct } from './../../wrappers/ShopifyWrappers';
import Link from './../../routing/Link';

const ProductThumbnail = (props) => {
  let { handle, url, data, error, pending } = props;

  if(pending) return <div>Please wait...</div>;
  if(error) return <div>{ error || "Error!" }</div>;

  let { title } = data;

  url = url || "/";

  return (
    <div className="o-product-thumbnail">
      <Link to={ url }>
        { title }
      </Link>
    </div>
  );
}

export default withProduct(ProductThumbnail);
