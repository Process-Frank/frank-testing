import React from 'react';

export default (props) => {
  return (
    <section {...props}>
      { props.children }
    </section>
  );
}
