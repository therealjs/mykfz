"use strict";

import React from "react";
import { Grid, Card, TextField, Checkbox, InputLabel, NativeSelect, MenuItem, Button, FormControlLabel, RadioGroup, Radio, Switch, Typography
} from "@material-ui/core";
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

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
}

  handleChangeCheckbox(event) {
    this.setState({[event.target.name]: event.target.checked});
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
        <Card style={{padding: "20px", maxWidth: "500px"}}>
          <form
            onSubmit={this.handleSubmit}
            onReset={() => this.props.history.goBack()}
          >
            <Typography style={{marginBottom: "10px"}} component="h5" variant="h5">
              Deregister
            </Typography>
            <Grid
              justify="space-between"
              container
              direction="row"
              alignItems="center"
              justify="center"
              spacing={3}
            >
            <Grid item xs = {12}>
            <TextField
              label="License Plate"
              name="licensePlate"
              fullWidth
              disabled={true}
              value={this.state.licensePlate}
            />
            </Grid>
            <Grid item xs = {12}>
            <TextField
              label="VIN"
              name="vin"
              fullWidth
              disabled={true}
              value={this.state.vin}
                    />
            </Grid>
            <Grid item xs = {12}>
            <TextField
              label="Security Code I (7)"
              name="secCodeI"
              fullWidth
              required={true}
              value={this.state.secCodeI}
              onChange={this.handleChange}
              maxLength={7}
            />
            </Grid>
            <Grid item xs = {12}>
            <TextField
              label="Plate Code (3)"
              required={true}
              name="plateCode"
              fullWidth
              value={this.state.plateCode}
              onChange={this.handleChange}
              maxLength={3}
            />
            </Grid>
            <Grid item xs = {12}>

            <FormControlLabel
              control={<Checkbox
                checked={this.state.reserveLicensePlate}
                onChange={this.handleChangeCheckbox}
                name="reserveLicensePlate"
                color="primary"
                />}
              label="Reserve license plate for 90 days"
            />


              </Grid>
            <Grid item xs={12}>
              <Button
              style={{float: "right", marginLeft: "15px"}}
              id="submit"
              variant="contained"
              type="submit"
              color="primary"
              disabled={this.state.plateCode.toString().length != 3 || 
                        this.state.secCodeI.toString().length != 7}
              >
              Save
              </Button>
              <Button
                style={{float: "right"}}
                id="reset"
                type="reset"
                color="default"
                >
                Cancel
              </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Page>
    );
  }
}

export default withRouter(VehicleDeregister);
