import React from 'react';
import Section from './../Section';

export default (props) => {
  return (
    <Section {...props}>
      { props.error || "Failed to load section" }
    </Section>
  );
};
