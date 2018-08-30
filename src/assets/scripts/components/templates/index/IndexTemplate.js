import React from 'react';
import Template from './../Template';
import { withIndexTemplate } from './../../../wrappers/IndexTemplate';

import Link from './../../../routing/Link';


class IndexTemplate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //Fetch the sections that belong to the index template
    let { sections } = this.props;

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
        End of sections
        <Link to="/collections/all">Shop All</Link>
      </Template>
    );
  }
};

export default withIndexTemplate(IndexTemplate);
