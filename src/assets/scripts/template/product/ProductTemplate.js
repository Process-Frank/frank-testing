import React from 'react';
import { withProductTemplate } from './../../wrappers/product/ProductTemplate';

import Template from './../Template';

import Link from './../../routing/Link';

class ProductTemplate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { data, pending, error } = this.props;
    let children;

    if(error) {
      children = error;
    } else if(pending) {
      children = <div>Loading</div>
    } else {
      children = (
        <div>
          <h1>{ data.title }</h1>
          {data.products.map( (product, i) => <ProductThumbnail key={ i } handle={ product } /> )}
        </div>
      );
    }

    return (
      <Template className="c-collection-template">
        { children }
        <Link to="/">HOME</Link>
      </Template>
    );
  }
}

export default withProductTemplate(ProductTemplate);
