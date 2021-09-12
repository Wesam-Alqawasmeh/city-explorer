import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <header
        style={{
          height: "100px",
          textAlign: "center",
          paddingTop: "25px",
          backgroundColor: "black",
          color: "white",
        }}
      >
        <h1 style={{ margin: "auto" }}>City Explorer</h1>
      </header>
    );
  }
}

export default Header;
