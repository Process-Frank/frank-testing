import React from 'react';
import { HeaderIcon } from './HeaderIconNav';
import { connect } from 'react-redux';

const mapStateToProps = function(state) {
  return {
    language: state.language,
    customer: state.customer
  }
}

export default connect(mapStateToProps)((props) => {
  let to = "/login";
  let title = "header.account.login.title";

  //Is Logged In?
  if(props.customer) {
    to = "/account";
    title = "header.account.details.title";
  }

  return (
    <HeaderIcon
      to={ to }
      asset="icon-account.svg"
      className={ props.className }
      title={ props.language.get(title) }
    />
  );
});
