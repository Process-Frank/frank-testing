//StaticHeader Section
import React from 'react';
import { connect } from 'react-redux';

import HeaderStyles from './Header.scss';

//State Props
const mapStateToProps = function(state) {
  return {
    sections: state.sections,
    customer: state.customer
  }
}

export default connect(mapStateToProps)((props) => {
  //Get the header data
  let section = props.sections.header ? props.sections.header[0] : {};

  return (
    <header role="banner" className="c-header">
    </header>
  );
});
