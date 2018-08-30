import React from 'react';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import Loadable from 'react-loadable';
//import LoadingTemplate from './../components/templates/loading/LoadingTemplate'
//import LoadingFailedTemplate from './../components/templates/loading/LoadingFailedTemplate'

const Loading = (props) => {
  if (props.error) {
    return <div>{ props.error }</div>;
  } else if (props.pastDelay) {
    return <div>Loading</div>
  } else {
    return <div>Start</div>
;
  }
};

//Define our Route Wrapper (Literally to wrap routes in)
export const RouteWrapper = (props) => {
  //Render it out
  return (
    <Route {...props} render={() => {
      //This is the template we're wrapping.
      let CustomLoadable = Loadable({
        loader: props.template,
        loading: Loading
      });

      //Here you may opt to wrap, contain or do whatever to your page.
      //IF you're going with a page transition you would decide WHAT transitions
      //here (header? footer? Whole Body? etc)
      return <CustomLoadable />;
    }}/>
  );
};


//Now we can define our routes
class Routes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { match, location, history, routes, children } = this.props;

    return (
      <Route>
        <Switch location={ location }>
          { children }
        </Switch>
      </Route>
    );
  }
}

export default withRouter(Routes);
