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
      <div className="c-header__wrapper">
        <nav role="navigation" className="c-header__nav c-header__nav--left">
        </nav>

        <div className="c-header__logo">
        </div>

        <nav role="navigation" className="c-header__nav c-header__nav--right">
          <span className="c-header__icons">
          </span>
        </nav>
      </div>
    </header>
  );
});
