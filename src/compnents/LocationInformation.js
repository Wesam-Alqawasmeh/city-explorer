import React, { Component } from "react";
import { Card } from "react-bootstrap";

class LocationInformation extends Component {
  render() {
    return (
      <>
        <Card
          border="primary"
          style={{ width: "18rem", marginLeft: 150, height: "fit-content" }}
        >
          <Card.Header>{this.props.city_name}</Card.Header>
          <Card.Body>
            <Card.Title>Information</Card.Title>
            <Card.Text>
              <p>Lattitude: {this.props.lat}</p>
              <p>Longittude: {this.props.lon}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default LocationInformation;
