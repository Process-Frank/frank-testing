import React from 'react';
import Loadable from 'react-loadable';
import LoadingTemplate from './../../template/loading/LoadingTemplate';
import LoadingFailedTemplate from './../../template/loading/LoadingFailedTemplate';

const TemplateLoading = (props) => {
  if (props.error) {
    //Error Loading Template
    return <LoadingFailedTemplate {...props} />;

  } else if (props.pastDelay) {
    //Loading Template
    return <LoadingTemplate {...props} />;
  }
  return null;//Stops flickering on load?
};


export default (props) => {
  //This is the template we're wrapping.
  let CustomLoadable = Loadable({
    loader: props.template,
    loading: TemplateLoading
  });

  //Here you may opt to wrap, contain or do whatever to your page.
  //IF you're going with a page transition you would decide WHAT transitions
  //here (header? footer? Whole Body? etc)
  return <CustomLoadable />;
};
