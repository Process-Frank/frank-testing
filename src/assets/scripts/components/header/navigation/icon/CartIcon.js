import React from 'react';
import { HeaderIcon } from './HeaderIconNav';
import { connect } from 'react-redux';

const mapStateToProps = function(state) {
  return {
    language: state.language
  }
}

export default connect(mapStateToProps)((props) => {
  return (
    <HeaderIcon
      to="/cart"
      asset="icon-cart.svg"
      className={ props.className }
      title={ props.language.get("header.cart.title") }
    />
  );
});
