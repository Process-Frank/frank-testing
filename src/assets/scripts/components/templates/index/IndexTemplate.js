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

    let crap = [];
    for(let i = 0; i < 1000; i++) {
      crap.push(<div key={i}>Crap {i}</div>);
    }

    return (
      <Template name="index">
        { children }
        {crap}
      </Template>
    );
  }
};

export default withIndexTemplate(IndexTemplate);
