import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as SectionActions from './../actions/shopify/SectionActions';

const stateToProps = (state) => {
  return {
    sectionData: state.sections.index
  }
};

const dispatchToProps = (dispatch) => {
  return {
    fetchIndexSections: () => {
      dispatch(SectionActions.fetchIndexSections());
    }
  };
};

export const withIndexTemplate = (Wrapped) => {
  let IndexTemplateWrapper = class extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      if(!this.props.fetchIndexSections) return;
      if(this.props.sectionData) return;
      this.props.fetchIndexSections();
    }

    componentWillUnmount() {}

    render() {
      let sectionData = this.props.sectionData || {};
      let { pending, error, sections } = sectionData;
      sections = sections || [];
      return <Wrapped {...this.props} pending={pending} error={error} sections={sections} />;
    }
  }

  return withRouter(connect(stateToProps, dispatchToProps)(IndexTemplateWrapper));
};
