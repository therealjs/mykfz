"use strict";

import React from "react";
import {
  Card,
  Button,
  FontIcon,
  TextField,
  NativeSelect,
  DatePicker,
} from "react-md";
import { withRouter } from "react-router-dom";

import { AlertMessage } from "./AlertMessage";
import Page from "./Page";
import UserService from "../services/UserService";

const style = { maxWidth: 500 };

class VehicleForm extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.vehicle != undefined) {
      this.state = {
        owner: UserService.isAuthenticated()
          ? UserService.getCurrentUser().id
          : undefined,
        vin: props.vehicle.vin,
        licensePlate: props.vehicle.licensePlate,
        state: props.vehicle.state,
        generalInspection: props.vehicle.generalInspection,
        processes: props.vehicle.processes,
      };
    } else {
      this.state = {
        owner: UserService.isAuthenticated()
          ? UserService.getCurrentUser().id
          : undefined,
        vin: "",
        licensePlate: "",
        state: "",
        generalInspection: "",
        processes: [],
      };
    }

    this.handleChangeVIN = this.handleChangeVIN.bind(this);
    this.handleChangeLicensePlate = this.handleChangeLicensePlate.bind(this);
    this.handleChangeState = this.handleChangeState.bind(this);
    this.handleChangeGeneralInspection =
      this.handleChangeGeneralInspection.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeVIN(value) {
    this.setState(Object.assign({}, this.state, { vin: value }));
  }

  handleChangeLicensePlate(value) {
    this.setState(Object.assign({}, this.state, { licensePlate: value }));
  }

  handleChangeState(value) {
    this.setState(Object.assign({}, this.state, { state: value }));
  }

  handleChangeGeneralInspection(value) {
    this.setState(Object.assign({}, this.state, { generalInspection: value }));
  }

  handleSubmit(event) {
    event.preventDefault();

    let vehicle = this.props.vehicle;
    if (vehicle == undefined) {
      vehicle = {};
    }

    vehicle.owner = this.state.owner;
    vehicle.vin = this.state.vin;
    vehicle.licensePlate = this.state.licensePlate;
    vehicle.state = this.state.state;
    vehicle.generalInspection = this.state.generalInspection;

    this.props.onSubmit(vehicle);
  }

  render() {
    return (
      <Page>
        <Card style={style} className="md-block-centered">
          <form
            className="md-grid"
            onSubmit={this.handleSubmit}
            onReset={() => this.props.history.goBack()}
          >
            <TextField
              label="Owner"
              id="OwnerField"
              type="text"
              disabled={true}
              value={this.state.owner}
            />
            <TextField
              label="VIN"
              id="VINField"
              type="text"
              className="md-row"
              required={true}
              value={this.state.vin}
              onChange={this.handleChangeVIN}
              errorText="VIN is required"
            />
            <TextField
              label="LicensePlate"
              id="LicensePlateField"
              type="text"
              className="md-row"
              required={true}
              value={this.state.licensePlate}
              onChange={this.handleChangeLicensePlate}
              errorText="LicensePlate is required"
              maxLength={12}
            />
            <TextField
              label="State"
              id="StateField"
              type="text"
              className="md-row"
              required={false}
              value={this.state.state}
              onChange={this.handleChangeState}
            />
            <TextField
              label="GeneralInspection"
              id="GeneralInspectionField"
              type="date"
              className="md-row"
              required={false}
              value={this.state.generalInspection}
              onChange={this.handleChangeGeneralInspection}
              errorText="GeneralInspection is required"
            />

            <Button
              id="submit"
              type="submit"
              disabled={
                // this.state.licensePlate.toString().length != 4 ||
                this.state.vin == undefined ||
                this.state.vin == "" ||
                this.state.licensePlate == undefined ||
                this.state.licensePlate == "" ||
                this.state.generalInspection == undefined ||
                this.state.generalInspection == ""
              }
              raised
              primary
              className="md-cell md-cell--2"
            >
              Save
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

export default withRouter(VehicleForm);
