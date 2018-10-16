import React from 'react';
import { connect } from 'react-redux';

const stateToProps = (state) => {
  return {
    shop: state.shop,
    customer: state.customer
  }
};

const dispatchToProps = (dispatch) => {
  return {
  }
};


export const withCustomer = (Wrapped) => {
  let CustomerWrapper = (props) => {
    return (<Wrapped
      { ...props }
      customer={ props.customer }
      customersEnabled={ props.shop.customer_accounts_enabled }
    />);
  };

  return connect(stateToProps, dispatchToProps)(CustomerWrapper);
};
