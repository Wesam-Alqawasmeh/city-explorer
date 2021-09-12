import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LocationForm from "./compnents/LocationForm";
import LocationInformation from "./compnents/LocationInformation";
import axios from "axios";
import Header from "./compnents/Header";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city_name: "",
      lat: "",
      lon: "",
      isSubmit: false,
    };
  }

  getName = (e) => {
    this.setState({
      city_name: `${e.target.value}`,
      isSubmit: false,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();

    let config = {
      method: "GET",
      baseURL: `https://api.locationiq.com/v1/autocomplete.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city_name}`,
    };

    axios(config).then((res) => {
      let responseData = res.data[0];
      this.setState({
        city_name: responseData.display_name,
        lon: responseData.lon,
        lat: responseData.lat,
        isSubmit: true,
      });
    });
  };

  render() {
    return (
      <div>
        <Header/>
        <LocationForm
          getName={this.getName}
          submitHandler={this.submitHandler}
        />
        {this.state.isSubmit && (
          <LocationInformation
            city_name={this.state.city_name}
            lat={this.state.lat}
            lon={this.state.lon}
          />
        )}
      </div>
    );
  }
}

export default App;
