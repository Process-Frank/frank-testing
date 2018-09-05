import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as CollectionActions from './../actions/shopify/CollectionActions';

//Redux Connector for the High Order Component
const stateToProps = (state) => {
  return {
    collections: state.collection.collections
  }
};

const dispatchToProps = (dispatch) => {
  return {
    fetchCollection: (collection) => {
      dispatch(CollectionActions.fetchCollection(collection));
    }
  }
};

//Export High Order Component
export const withCollectionTemplate = (Wrapped) => {
  let CollectionTemplateWrapper = class extends React.Component {
    constructor(props) {
      super(props);
    }

    getCollectionHandle() {
      if(!this.props) return;
      if(!this.props.match) return;
      if(!this.props.match.params) return;
      return this.props.match.params.collection;
    }

    componentDidMount() {
      //Dispatch available?
      if(!this.props.fetchCollection) return;

      let handle = this.getCollectionHandle();
      if(!handle) return;

      if(this.props.collections && this.props.collections[handle]) return;
      this.props.fetchCollection(handle);
    }

    componentWillUnmount() {}

    render() {
      let error, handle;
      let pending = false;
      let data = {};

      if(this.getCollectionHandle()) {
        handle = this.getCollectionHandle();
        pending = true;

        if(this.props.collections) {
          data = this.props.collections[handle];
          if(data && data.error) {
            error = data.error;
            pending = data.pending;
          } else if(data) {
            pending = data.pending;
          } else {
            data = {};
            error = "Invalid Collection Data!";
          }
        }
      } else {
        error = "Missing Collection Handle";
      }

      return <Wrapped data={data} pending={pending} error={error} {...this.props} />
    }
  }

  return withRouter(connect(stateToProps, dispatchToProps)(CollectionTemplateWrapper));
};
