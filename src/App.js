import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LocationForm from "./compnents/LocationForm";
import LocationInformation from "./compnents/LocationInformation";
import axios from "axios";
import Header from "./compnents/Header";
import ErrorAlert from "./compnents/ErrorAlert";
import Weather from "./compnents/Weather";
import TopMovies from "./compnents/TopMovies";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city_name: "",
      lat: "",
      lon: "",
      country_code: "",
      isSubmit: false,
      showModal: false,
      apiError: "",
      sreverError: "",
      movies: [],
      weatherData: [],
    };
  }

  getName = (e) => {
    this.setState({
      weatherData: [],
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
          country_code: responseData.address.country_code,
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
            `${process.env.REACT_APP_LOCAL_URL}/weather?lat=${this.state.lat}&lon=${this.state.lon}`
          )
          .then((res) => {
            this.setState({
              weatherData: res.data,
            });
          })
          .catch((err) => {
            this.setState({
              showModal: true,
              sreverError: err,
            });
          });
      })
      .then(() => {
        axios
          .get(
            `${process.env.REACT_APP_LOCAL_URL}/movie?country_code=${this.state.country_code}`
          )
          .then((res) => {
            this.setState({
              movies: res.data,
            });
          })
          .catch((err) => {
            this.setState({
              showModal: true,
              sreverError: err,
            });
          });
      });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
      apiError: "",
      sreverError: "",
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
              // display: "grid",
              // gridTemplateColumns: "1fr 1fr",
              border: "5px solid #2680ed",
              borderRadius: "10px",
              padding: "20px",
              width: "75%",
              margin: "auto",
              backgroundColor: "#c2c9d1",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              <div>
                <LocationInformation
                  city_name={this.state.city_name}
                  lat={this.state.lat}
                  lon={this.state.lon}
                />

                <img
                  src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center= ${this.state.lat},${this.state.lon}&zoom=1-18`}
                  style={{ height: "400px", margin: "50px 0px", width: "100%" }}
                ></img>

                <div>
                  <TopMovies movies={this.state.movies} />
                </div>
              </div>

              <Weather
                weatherData={this.state.weatherData}
                city_name={this.state.city_name}
              />
            </div>
          </div>
        )}

        <ErrorAlert
          handleClose={this.handleClose}
          showModal={this.state.showModal}
          frontError={this.state.apiError}
          backError={this.state.sreverError}
        />
      </div>
    );
  }
}

export default App;
