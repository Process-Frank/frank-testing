import React from 'react';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import TemplateImportWrapper from './../wrappers/template/TemplateImportWrapper';

//Define our Route Wrapper (Literally to wrap routes in)
export const RouteWrapper = (props) => {
  //Render it out
  return (
    <Route {...props} render={ () => <TemplateImportWrapper {...props} /> }/>
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
