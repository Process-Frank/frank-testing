import React from 'react';
import PageBoundaryStyles from './PageBoundary.scss';

export default (props) => {
  return <div {...props} className={"o-page-boundary" + (props.className?" "+props.className:"")} />
}
