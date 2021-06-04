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

class VehicleRegister extends React.Component {
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
    this.handleChangeEVB = this.handleChangeEVB.bind(this);
    this.handleChangeIBAN = this.handleChangeIBAN.bind(this);
    this.handleChangeSecCodeII = this.handleChangeSecCodeII.bind(this);
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

  handleChangeEVB(value) {
    this.setState(Object.assign({}, this.state, { evb: value }));
  }

  handleChangeIBAN(value) {
    this.setState(Object.assign({}, this.state, { iban: value }));
  }

  handleChangeSecCodeII(value) {
    this.setState(Object.assign({}, this.state, { secCodeII: value }));
  }

  handleChangeGeneralInspection(value) {
    this.setState(Object.assign({}, this.state, { generalInspection: value }));
  }

  handleSubmit(event) {
    event.preventDefault();

    let vehicle = this.props.vehicle;

    vehicle.licensePlate = this.state.licensePlate;
    vehicle.state = "REGISTERED";
    vehicle.generalInspection = this.state.generalInspection;
    vehicle.processes.push({
      processType: "REGISTRATION",
      date: "2020-05-30",
      state: "NEW",
      info: {
        eVB: this.state.evb,
        secCodeII: this.state.secCodeII,
        iban: this.state.iban
      }
    })

    this.props.onSubmit(vehicle);
  }

  render() {
    return (
      <Page>
        <Card style={style} className="md-block-centered">
          Register Vehicle
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
              disabled={true}
              required={true}
              value={this.state.vin}
                    />
            <TextField
              label="eVB (7)"
              id="eVBField"
              type="text"
              className="md-row"
              required={true}
              value={this.state.evb}
              onChange={this.handleChangeEVB}
              errorText="eVB is required"
              maxLength={7}
                    />
            <TextField
              label="Security Code II (12)"
              id="SecCodeIIField"
              type="text"
              className="md-row"
              required={true}
              value={this.state.secCodeII}
              onChange={this.handleChangeSecCodeII}
              maxLength={12}
              errorText="Security Code II is required"
                    />
            <TextField
              label="IBAN (22)"
              id="IBANField"
              type="text"
              className="md-row"
              required={true}
              value={this.state.iban}
              onChange={this.handleChangeIBAN}
              errorText="IBAN is required"
              maxLength={22}
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
                this.state.evb.toString().length != 7,
                this.state.secCodeII.toString().length != 12,
                this.state.iban.toString().length != 22
              }
              raised
              primary
              className="md-cell md-cell--2"
            >
              Register
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

export default withRouter(VehicleRegister);
