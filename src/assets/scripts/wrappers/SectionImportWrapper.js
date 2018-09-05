import React from 'react';
import Loadable from 'react-loadable';

import LoadingFailedSection from './../components/sections/loading/LoadingFailedSection';
import LoadingSection from './../components/sections/loading/LoadingSection';

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
