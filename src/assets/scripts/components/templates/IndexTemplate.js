import React from 'react';
import { connect } from 'react-redux';
import ThemeSections from './../sections/ThemeSections';

class IndexTemplate extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

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
      <div>
        { sectionElements }
        End of sections
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    sections: state.sections
  }
}

export default connect(mapStateToProps)(IndexTemplate);
