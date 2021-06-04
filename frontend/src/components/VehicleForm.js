"use strict";

import React from "react";
import { Card, Button, TextField } from "react-md";
// import Button from "@material-ui/core/Button";
import { Select, NativeSelect, MenuItem } from "@material-ui/core";
import { withRouter } from "react-router-dom";

import { AlertMessage } from "./AlertMessage";
import Page from "./Page";
import UserService from "../services/UserService";
import VINService from "../services/VINService";

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
        make: props.vehicle.make,
        model: props.vehicle.model,
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
        make: "",
        model: "",
        licensePlate: "",
        state: "",
        generalInspection: "",
        processes: [],
      };
    }

    this.handleChangeVIN = this.handleChangeVIN.bind(this);
    this.handleChangeMake = this.handleChangeMake.bind(this);
    this.handleChangeModel = this.handleChangeModel.bind(this);
    this.handleChangeLicensePlate = this.handleChangeLicensePlate.bind(this);
    this.handleChangeState = this.handleChangeState.bind(this);
    this.handleChangeGeneralInspection =
      this.handleChangeGeneralInspection.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleChangeVIN(value) {
    const vin = value;
    this.setState({ vin: vin });
    console.log(`vin is ${vin}`);
    if (vin.length == 17) {
      const result = await VINService.getVehicleInfo(vin);
      const make = result.Make;
      const model = result.Model;
      console.log(`make is ${make}, model is ${model}`);
      if (make) {
        this.handleChangeMake(make);
      }
      if (model) {
        this.handleChangeModel(model);
      }
    }
  }

  handleChangeMake(value) {
    this.setState({ make: value });
  }

  handleChangeModel(value) {
    this.setState({ model: value });
  }

  handleChangeLicensePlate(value) {
    this.setState({ licensePlate: value });
  }

  handleChangeState(value) {
    this.setState({ state: value });
  }

  handleChangeGeneralInspection(value) {
    this.setState({ generalInspection: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    let vehicle = this.props.vehicle;
    if (vehicle == undefined) {
      vehicle = {};
    }

    vehicle.owner = this.state.owner;
    vehicle.vin = this.state.vin;
    vehicle.make = this.state.make;
    vehicle.model = this.state.model;
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
              label="VIN (17)"
              id="VINField"
              type="text"
              className="md-row"
              required={true}
              value={this.state.vin}
              onChange={this.handleChangeVIN}
              errorText="VIN is required"
            />

            {/* <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.make}
              onChange={this.handleChangeMake}
            >
              <MenuItem value="BMW"}>BMW</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select> */}
            <TextField
              label="Make"
              id="MakeField"
              type="text"
              className="md-row"
              required={true}
              value={this.state.make}
              onChange={this.handleChangeMake}
              errorText="Make is required"
            />
            <TextField
              label="Model"
              id="ModelField"
              type="text"
              className="md-row"
              required={true}
              value={this.state.model}
              onChange={this.handleChangeModel}
              errorText="Model is required"
            />
            <TextField
              label="License Plate"
              id="LicensePlateField"
              type="text"
              className="md-row"
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
              value={this.state.state}
              onChange={this.handleChangeState}
            />
            <TextField
              label="General Inspection"
              id="GeneralInspectionField"
              type="text"
              className="md-row"
              value={this.state.generalInspection}
              onChange={this.handleChangeGeneralInspection}
              errorText="GeneralInspection is required"
            />

            <Button
              id="submit"
              type="submit"
              disabled={this.state.vin.toString().length != 17}
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
