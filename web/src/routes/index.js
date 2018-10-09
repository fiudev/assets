import React from "react";
import { Route, BrowserRouter, Switch, withRouter } from "react-router-dom";
import { Container } from "reactstrap";

import NavWithoutLogin from "../components/shared/NavWithoutLogin";

const DefaultRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        <React.Fragment>
          <NavWithoutLogin />
          <Container>
            <Component {...props} />
          </Container>
        </React.Fragment>
      )}
    />
  );
};

const GalleryRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        <React.Fragment>
          <NavWithoutLogin />
          <Container>
            <Component {...props} />
          </Container>
        </React.Fragment>
      )}
    />
  );
};

const AddPropsToRoute = (WrappedComponent, passedProps) => {
  return class Route extends React.Component {
    render() {
      const props = Object.assign({}, this.props, passedProps);
      return <WrappedComponent {...props} />;
    }
  };
};

export { DefaultRoute, GalleryRoute, AddPropsToRoute };
