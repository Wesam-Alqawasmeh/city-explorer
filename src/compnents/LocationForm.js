import React, { Component } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

class LocationForm extends Component {
  render() {
    return (
      <form
        onSubmit={this.props.submitHandler}
        style={{
          padding: "50px",
          border: "5px solid #2680ed",
          borderRadius: "10px",
          margin: "100px 20px",
          backgroundColor: "#c2c9d1",
        }}
      >
        <Row>
          <Col>
            <Form.Group
              as={Col}
              controlId="formGridEmail"
              onChange={this.props.getName}
            >
              <Form.Label style={{ fontSize: "30px" }}>
                <b>Location</b>
              </Form.Label>
              <Form.Control type="text" placeholder="Enter Location" />
            </Form.Group>
          </Col>
          <Col>
            <Button
              variant="primary"
              type="submit"
              style={{ marginTop: "52px" }}
            >
              Explore!
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

export default LocationForm;
