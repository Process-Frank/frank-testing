import React from 'react';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';

//Import Our Templates
import IndexTemplate from './../components/templates/IndexTemplate';

//Define our Route Wrapper (Literally to wrap routes in)
const RouteWrapper = (props) => {
  //Render it out
  return (
    <Route {...props} render={() => {
      //This is the template we're wrapping.
      let CustomTag = props.template;

      //Here you may opt to wrap, contain or do whatever to your page.
      //IF you're going with a page transition you would decide WHAT transitions
      //here (header? footer? Whole Body? etc)
      return (
        <CustomTag />
      );
    }}/>
  );
};


//Now we can define our routes
class Routes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { match, location, history, routes } = this.props;

    return (
      <Route>
        <Switch location={ location }>
          {/* You may define your routes here, be sure to use the RouteWrapper */}

          {/* Standard Shopify Routes */}
          <RouteWrapper exact path="/" template={ IndexTemplate } />

          {/* You may add specific custom routes if you like to here */}

          {/* Finally the catch all (404 Page) Route */}

        </Switch>
      </Route>
    );
  }
}

export default withRouter(Routes);
