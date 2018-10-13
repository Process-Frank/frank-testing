import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as CollectionActions from './../../actions/shopify/CollectionActions';
import * as ProductActions from './../../actions/shopify/ProductActions';

//Redux Connector for the High Order Component
const stateToProps = (state) => {
  return {
  }
};

const dispatchToProps = (dispatch) => {
  return {
  }
};

//Export High Order Component
export const withProductTemplate = (Wrapped) => {
  let ProductTemplateWrapper = class extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {}

    render() {
      let error, handle;
      let pending = false;

      return <Wrapped pending={pending} error={error} {...this.props} />
    }
  }

  return withRouter(connect(stateToProps, dispatchToProps)(ProductTemplateWrapper));
};
