import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const stateToProps = (state) => {
  return {
    sections: state.sections
  }
};

const dispatchToProps = (dispatch) => {

};

export const withIndexTemplate = (Wrapped) => {
  let IndexTemplateWrapper = class extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
      let sections = [];
      if(this.props.sections && this.props.sections.index) {
        sections = this.props.sections.index || [];
      }

      return <Wrapped {...this.props} sections={sections} />;
    }
  }

  return withRouter(connect(stateToProps, dispatchToProps)(IndexTemplateWrapper));
};
