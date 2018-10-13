import React from 'react';
import Loadable from 'react-loadable';

import LoadingFailedSection from './../../section/loading/LoadingFailedSection';
import LoadingSection from './../../section/loading/LoadingSection';

export default (section) => {
  return (props) => {
    let CustomLoadable = Loadable({
      loader: section,
      loading: () => {
        if (props.error) {
          return <LoadingFailedSection {...props} />;
        } else if (props.pastDelay) {
          return <LoadingSection {...props} />;
        }
        return null;//Stops flickering on load?
      }
    });

    return <CustomLoadable {...props} />;
  }
};
