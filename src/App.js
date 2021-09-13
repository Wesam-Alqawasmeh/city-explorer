import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LocationForm from "./compnents/LocationForm";
import LocationInformation from "./compnents/LocationInformation";
import axios from "axios";
import Header from "./compnents/Header";
import ErrorAlert from "./compnents/ErrorAlert";
import Weather from "./compnents/Weather";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city_name: "",
      lat: "",
      lon: "",
      isSubmit: false,
      showModal: false,
      apiError: "",
      weatherData: [],
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

    axios(config)
      .then((res) => {
        let responseData = res.data[0];
        this.setState({
          city_name: responseData.address.name,
          lon: responseData.lon,
          lat: responseData.lat,
          isSubmit: true,
        });
      })
      .catch((err) => {
        this.setState({
          showModal: true,
          apiError: err,
        });
      })
      .then(() => {
        axios
          .get(
            `${process.env.REACT_APP_LOCAL_URL}/weather?lat=${this.state.lat}&lon=${this.state.lon}&q=${this.state.city_name}`
          )
          .then((res) => {
            this.setState({
              weatherData : res.data
            })
          })
          .catch((err) => {
            this.setState({
              showModal: true,
              apiError: err,
            })
          })
      });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    return (
      <div>
        <Header />
        <LocationForm
          getName={this.getName}
          submitHandler={this.submitHandler}
        />

        {this.state.isSubmit && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              border: "5px solid #2680ed",
              borderRadius: "10px",
              padding: "20px",
              width: "75%",
              margin: "auto",
              backgroundColor: "#c2c9d1",
            }}
          >
            <div style={{display:"grid", gridTemplateRows:"1fr 1fr"}}>
            <LocationInformation
              city_name={this.state.city_name}
              lat={this.state.lat}
              lon={this.state.lon}
            />

            
               <Weather weatherData={this.state.weatherData}  city_name={this.state.city_name}/>
            
            </div>
            
            

            <img
              src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center= ${this.state.lat},${this.state.lon}&zoom=1-18`}
              style={{ height: "400px", margin: "auto" }}
            ></img>
          </div>
        )}

        <ErrorAlert
          handleClose={this.handleClose}
          showModal={this.state.showModal}
          error={this.state.apiError}
        />
      </div>
    );
  }
}

export default App;
