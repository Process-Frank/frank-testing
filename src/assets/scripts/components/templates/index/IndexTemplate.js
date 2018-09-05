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
    let children;

    if(this.props.pending) {
      children = <div>Please Wait...</div>;

    } else if(this.props.error) {
      children = <div>{ this.props.error }</div>;

    } else {

      //Now we're going to get the components that these sections are mapped to
      children = sections.map((s) => {
        let Element = s.getComponent();
        return <Element section={s} key={s.id} />;
      });
    }

    return (
      <Template name="index">
        { children }
        <Link to="/collections/all">Collection Template</Link>
      </Template>
    );
  }
};

export default withIndexTemplate(IndexTemplate);
