import React, { Component } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

class LocationForm extends Component {
  render() {
    return (
      <form
        onSubmit={this.props.submitHandler}
        style={{padding:"50px"}}
      >
        <Row>
          <Col>
            <Form.Group as={Col} controlId="formGridEmail" onChange={this.props.getName} >
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" placeholder="Enter Location" />
            </Form.Group>
          </Col>
          <Col>
            <Button variant="primary" type="submit" style={{marginTop:"32px"}}>
              Explore!
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

export default LocationForm;
