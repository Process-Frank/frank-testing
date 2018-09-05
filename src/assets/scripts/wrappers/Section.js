import React from 'react';
import { connect } from 'react-redux';

const stateToProps = (state) => {
  return {
    sections: state.sections
  }
};

const dispatchToProps = (dispatch) => {
  return {
  }
};


export const withSection = (Wrapped) => {
  let SectionWrapper = (props) => {
    //Determine section data from either the global section object or ?
    let section;

    if(props.section) {
      section = props.section;

    } else if(props.group) {
      let sections = props.sections[props.group];
      sections = sections.sections ? sections.sections : [];

      if(props.sectionId) {
        for(let i = 0; i < sections.length; i++) {
          if(sections[i].id != props.sectionId) continue;
          section = sections[i];
          break;
        }
      } else {
        section = sections.length ? sections[0] : section;
      }
    }

    section = section || {};
    let settings = section.settingsById || {};

    return <Wrapped {...props} section={ section } settings={ settings } />;
  };

  return connect(stateToProps, dispatchToProps)(SectionWrapper);
};
