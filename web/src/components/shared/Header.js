import React from "react";
import {
  Jumbotron,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
  Input,
  Form,
  FormGroup
} from "reactstrap";

export default class Header extends React.Component {
  search = e => {
    e.preventDefault();
    const form = new FormData(e.target);
    const searchValue = form.get("search");
    this.props.search(searchValue);
    e.target.reset();
  };
  render() {
    return (
      <Jumbotron>
        <h1 className="display-3">assets</h1>
        <Form onSubmit={this.search}>
          <InputGroup>
            <Input xs="2" placeholder="search" name="search" />
            <Button>search</Button>
          </InputGroup>
        </Form>
      </Jumbotron>
    );
  }
}
