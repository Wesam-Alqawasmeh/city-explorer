import React, { Component } from "react";
import { Modal, Alert } from "react-bootstrap";

class ErrorAlert extends Component {
  render() {
    return (
      <>
        <Modal show={this.props.showModal} onHide={this.props.handleClose}>
          <Alert variant="danger" onClose={this.props.handleClose} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
            {this.props.frontError.name}: {this.props.frontError.message}
              <br />
              {this.props.backError.name}: {this.props.backError.message}
            </p>
          </Alert>
        </Modal>
      </>
    );
  }
}

export default ErrorAlert;
