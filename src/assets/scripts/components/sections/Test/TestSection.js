import React from 'react';
import Section from './../Section';

export default class TestSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Section>
        Test Section Loaded Here
      </Section>
    );
  }
}
