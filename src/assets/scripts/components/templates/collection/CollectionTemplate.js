import React from 'react';
import { withCollectionTemplate } from './../../../wrappers/CollectionTemplate';

import ProductThumbnail from './../../../objects/product/ProductThumbnail';
import Template from './../Template';

class CollectionTemplate extends React.Component {
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
      </Template>
    );
  }
}

export default withCollectionTemplate(CollectionTemplate);
