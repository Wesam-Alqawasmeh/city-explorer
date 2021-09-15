import React, { Component } from "react";
import { Card } from "react-bootstrap";

class TopMovies extends Component {
  render() {
    return (
      <div>
        <Card
          border="primary"
          style={{ width: "100%", height: "fit-content" }}
        >
          <Card.Header>{this.props.city_name}</Card.Header>
          <Card.Body>
            <Card.Title>Top movies</Card.Title>
            <Card.Text>
              {this.props.movies.map((item) => {
                return (
                  <p style={{ borderBottom: "2px solid black" }}>
                    <b>Movie name:</b> {item.name}
                  </p>
                );
              })}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default TopMovies;
