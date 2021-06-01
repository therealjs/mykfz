"use strict";

import React from "react";
import {
  Card,
  Button,
  TextField,
} from "react-md";
import { withRouter } from "react-router-dom";

import { AlertMessage } from "./AlertMessage";
import Page from "./Page";
import UserService from "../services/UserService";

const style = { maxWidth: 500 };

class VehicleDeregister extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        user: UserService.getCurrentUser().id,
        vin: props.vehicle.vin,
        licensePlate: props.vehicle.licensePlate,
        generalInspection: props.vehicle.generalInspection,
        secCodeI: "",
        plateCode: ""
    };
    
    this.handleChangePlateCode = this.handleChangePlateCode.bind(this);
    this.handleChangeSecCodeI = this.handleChangeSecCodeI.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangePlateCode(value) {
    this.setState(Object.assign({}, this.state, { plateCode: value }));
  }

  handleChangeSecCodeI(value) {
    this.setState(Object.assign({}, this.state, { secCodeI: value }));
  }

  handleSubmit(event) {
    event.preventDefault();

    let vehicle = this.props.vehicle;

    vehicle.licensePlate = "";
    vehicle.state = "DEREGISTERED";
    vehicle.processes.push({
      processType: "DEREGISTRATION",
      date: "2020-05-30",
      state: "NEW",
      info: {
        secCodeI: this.state.secCodeI,
        plateCode: this.state.plateCode,
      }
    })

    this.props.onSubmit(vehicle);
  }

  render() {
    return (
      <Page>
        <Card style={style} className="md-block-centered">
          Deregister Vehicle
          <form
            className="md-grid"
            onSubmit={this.handleSubmit}
            onReset={() => this.props.history.goBack()}
                >
            <TextField
              label="License Plate"
              id="LicensePlateField"
              type="text"
              className="md-row"
              disabled={true}
              value={this.state.licensePlate}
                    />
            <TextField
              label="VIN"
              id="VINField"
              type="text"
              className="md-row"
              disabled={true}
              value={this.state.vin}
                    />
            <TextField
              label="Security Code I (7)"
              id="SecCodeIField"
              type="text"
              className="md-row"
              required={true}
              value={this.state.secCodeI}
              onChange={this.handleChangeSecCodeI}
              inputProps={{
                minLength:7,
                maxLength: 7
              }}
              errorText="Security Code I is required"
              maxLength={7}
                    />
            <TextField
              label="Plate Code (3)"
              id="PlateCodeField"
              type="text"
              className="md-row"
              required={true}
              value={this.state.plateCode}
              onChange={this.handleChangePlateCode}
              errorText="IBAN is required"
              maxLength={3}
            />

            <Button
              id="submit"
              type="submit"
              disabled={
                this.state.secCodeI.toString().length != 7,
                this.state.plateCode.toString().length != 3
              }
              raised
              primary
              className="md-cell md-cell--2"
            >
              Deregister
            </Button>
            <Button
              id="reset"
              type="reset"
              raised
              secondary
              className="md-cell md-cell--2"
            >
              Dismiss
            </Button>
            <AlertMessage className="md-row md-full-width">
              {this.props.error ? `${this.props.error}` : ""}
            </AlertMessage>
          </form>
        </Card>
      </Page>
    );
  }
}

export default withRouter(VehicleDeregister);
