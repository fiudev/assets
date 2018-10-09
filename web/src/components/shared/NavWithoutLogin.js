import React from "react";
import {
  Navbar,
  NavbarBrand,
  InputGroup,
  Input,
  Button,
  Container
} from "reactstrap";

export default class NavWithoutLogin extends React.Component {
  render() {
    return (
      <Navbar expand="sm">
        <Container>
          <NavbarBrand href="/">
            <img src={require("../../static/logo_w.png")} />
          </NavbarBrand>
          <InputGroup>
            <Input placeholder="search" name="search" autoComplete="off" />
            <Button>
              <i className="fa fa-search" aria-hidden="true" />
            </Button>
          </InputGroup>
        </Container>
      </Navbar>
    );
  }
}
