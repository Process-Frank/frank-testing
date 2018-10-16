import React from 'react';
import { connect } from 'react-redux';

const stateToProps = (state) => {
  return {
    shop: state.shop
  }
};

const dispatchToProps = (dispatch) => {
  return {
  }
};


export const withShop = (Wrapped) => {
  let ShopWrapper = (props) => {
    return (<Wrapped
      { ...props }
      shop={ props.shop }
    />);
  };

  return connect(stateToProps, dispatchToProps)(ShopWrapper);
};
