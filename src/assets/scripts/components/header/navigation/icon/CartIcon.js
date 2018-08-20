import React from 'react';
import { HeaderIcon } from './HeaderIconNav';
import Image from './../../../image/Image';
import { connect } from 'react-redux';

const mapStateToProps = function(state) {
  return {
    language: state.language
  }
}

export default connect(mapStateToProps)( (props) => {
  return (
    <HeaderIcon to="/cart">
      <Image asset="icon-cart.svg" alt="Cart" title="Cart" />
    </HeaderIcon>
  );
} );
