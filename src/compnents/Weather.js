import React, { Component } from "react";
import { Card } from "react-bootstrap";

export class Weather extends Component {
  render() {
    return (
      <>
        <Card
          border="primary"
          style={{ width: "18rem", marginLeft: 150, height: "fit-content" }}
        >
          <Card.Header>{this.props.city_name}</Card.Header>
          <Card.Body>
            <Card.Title>Daily Waether</Card.Title>
            <Card.Text>
              {this.props.weatherData.map((item) => {
                return (
                  <div style={{borderBottom:"2px solid #2680ed"}}>
                    <p>Date: {item.date}</p>
                    <p>Description: {item.description}</p>
                  </div>
                );
              })}
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Weather;
