import React from 'react';
import { connect } from 'react-redux';
import ThemeSections from './../../sections/ThemeSections';
import Template from './../Template';

import Link from './../../../routing/Link';

class IndexTemplate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //Fetch the sections that belong to the index template
    let sections = this.props.sections.index || [];

    //Now we're going to get the components that these sections are mapped to
    let sectionElements = [];
    for(let i = 0; i < sections.length; i++) {
      let s = sections[i];
      let CustomElement = s.getComponent();
      sectionElements.push(<CustomElement data={s} key={s.id} />);
    }

    return (
      <Template name="index">
        { sectionElements }
        <Link to="/collections/all">Shop All</Link>
        End of sections
      </Template>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    sections: state.sections
  }
}

export default connect(mapStateToProps)(IndexTemplate);
