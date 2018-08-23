import React from 'react';
import { connect } from 'react-redux';
import Section from './Section';

//Simple wrapper for static sections, also helps find faults.

class StaticSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { sections, component, group } = this.props;

    if(
      typeof sections === typeof undefined || !sections ||
      typeof component === typeof undefined || !component ||
      typeof group === typeof undefined || !group ||
      typeof sections[group] === typeof undefined || !Array.isArray(sections[group]) ||
      !sections[group].length
    ) {
      return <Section {...props}>Missing Section Data for { group }!</Section>
    }

    let index = 0;
    if(this.props.groupIndex) index = this.props.groupIndex;

    let CustomTag = component
    return (
      <Section {...this.props}>
        <CustomTag {...this.props} data={ sections[group][index] } />
      </Section>
    );
  }
}

//State Props
const mapStateToProps = function(state) {
  return { sections: state.sections }
}

export default connect(mapStateToProps)(StaticSection);
