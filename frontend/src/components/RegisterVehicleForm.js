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

class RegisterVehicleForm extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        owner: UserService.getCurrentUser().id,
        vin: props.vehicle.vin,
        evb: "",
        iban: "",
        licensePlate: props.vehicle.licensePlate,
        generalInspection: props.vehicle.generalInspection,
        secCodeII: ""
    };
    

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
              label="License Plate"
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
              label="eVB"
              id="eVBField"
              type="text"
              className="md-row"
              required={true}
              value={this.state.evb}
              onChange={this.handleChangeEVB}
              errorText="eVB is required"
                    />
            <TextField
              label="Security Code II"
              id="SecCodeIIField"
              type="text"
              className="md-row"
              required={true}
              value={this.state.secCodeII}
              onChange={this.handleChangeSecCodeII}
              errorText="Security Code II is required"
                    />
            <TextField
              label="IBAN"
              id="IBANField"
              type="text"
              className="md-row"
              required={true}
              value={this.state.iban}
              onChange={this.handleChangeIBAN}
              errorText="IBAN is required"
            />
            <TextField
              label="Date of General Inspection"
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

export default withRouter(RegisterVehicleForm);
