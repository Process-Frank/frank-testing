import React from 'react';
import { connect } from 'react-redux';
import * as ProductActions from './../actions/shopify/ProductActions';

const stateToProps = (state) => {
  return {
    products: state.product.products
  }
};

const dispatchToProps = (dispatch) => {
  return {
    fetchProduct: (handle) => {
      dispatch(ProductActions.fetchProduct(handle));
    }
  }
};

export const withProduct = (Wrapped) => {
  let ProductWrapper = class extends React.Component {
    constructor(props) {
      super(props);
    }

    getProductHandle() {
      if(this.props.handle) return this.props.handle;
      if(this.props.data && this.props.data.handle) return this.props.data.handle;
      return null;
    }

    componentDidMount() {
      if(!this.props.fetchProduct) return;
      let handle = this.getProductHandle();
      if(!handle) return;
      if(this.props.products && this.props.products[handle]) return;
      this.props.fetchProduct(handle);
    }

    componentWillUnmount() {

    }

    render() {
      let error;
      let handle = this.getProductHandle();
      let pending = false;
      let data = {};

      if(handle) {
        if(this.props.products) data = this.props.products[handle];

        if(data && data.error) {
          error = data.error;
          pending = data.pending;
        } else if(data) {
          pending = data.pending;
        } else {
          data = {};
          error = "Invalid Product Data!";
        }
      } else {
        error = "Missing Product Handle";
      }

      return <Wrapped {...this.props} data={ data } pending={pending} error={error} />
    }
  }

  return connect(stateToProps, dispatchToProps)(ProductWrapper);
};
