'use strict';

import React from 'react';
import {
    Grid,
    Card,
    TextField,
    InputLabel,
    Select,
    MenuItem,
    Button,
    FormControlLabel,
    RadioGroup,
    Radio,
    Switch,
    Typography
} from '@material-ui/core';

import { withRouter } from 'react-router-dom';

import Page from './Page';
import UserService from '../services/UserService';
import VINService from '../services/VINService';

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
                generalInspectionMonth: props.vehicle.generalInspectionMonth,
                generalInspectionYear: props.vehicle.generalInspectionYear,
                generalInspectionBool:
                    props.vehicle.generalInspectionMonth != '' ? true : false,
                processes: props.vehicle.processes
            };
        } else {
            this.state = {
                owner: UserService.isAuthenticated()
                    ? UserService.getCurrentUser().id
                    : undefined,
                vin: '',
                make: '',
                model: '',
                licensePlate: null,
                state: '',
                generalInspection: null,
                generalInspectionMonth: '',
                generalInspectionYear: '',
                generalInspectionBool: false,
                processes: []
            };
        }

        this.yearOptions = this.monthOptions = Array(4)
            .fill()
            .map((element, index) => new Date().getFullYear() + index);
        this.monthOptions = Array(12)
            .fill()
            .map((element, index) => index + 1);

        this.handleChangeVIN = this.handleChangeVIN.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleGIBool = this.toggleGIBool.bind(this);
    }

    async handleChangeVIN(event) {
        const vin = event.target.value;
        this.setState({ vin: vin });
        if (vin.length == 17) {
            const result = await VINService.getVehicleInfo(vin);
            const make_value = result.Make;
            const model_value = result.Model;
            if (make_value) {
                this.setState({ make: make_value });
            }
            if (model_value) {
                this.setState({ model: model_value });
            }
        }
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleChangeDate(date) {
        this.setState({ generalInspection: date });
    }

    toggleGIBool(event) {
        this.setState({ generalInspectionBool: event.target.checked });
        this.setState({ generalInspectionMonth: '' });
        this.setState({ generalInspectionYear: '' });
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
        vehicle.generalInspectionMonth = this.state.generalInspectionMonth;
        vehicle.generalInspectionYear = this.state.generalInspectionYear;

        this.props.onSubmit(vehicle);
    }

    render() {
        return (
            <Grid
                justify="space-between"
                container
                direction="column"
                alignItems="center"
                justify="center"
                spacing={3}>
                <Grid item xs={12}>
                <Card style={{ padding: '20px', maxWidth: '500px' }}>
                    <form
                        onSubmit={this.handleSubmit}
                        onReset={() => this.props.history.goBack()}
                    >
                        <Typography
                            style={{ marginBottom: '10px' }}
                            component="h5"
                            variant="h5"
                        >
                            Vehicle
                        </Typography>
                        <Grid
                            justify="space-between"
                            container
                            direction="row"
                            alignItems="center"
                            justify="center"
                            spacing={3}
                        >
                            <Grid item xs={12}>
                                <TextField
                                    label="Owner"
                                    name="owner"
                                    id="OwnerField"
                                    fullWidth
                                    disabled={true}
                                    value={this.state.owner}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="VIN (17)"
                                    id="VINField"
                                    name="vin"
                                    fullWidth
                                    required={true}
                                    value={this.state.vin}
                                    onChange={this.handleChangeVIN}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Make"
                                    required={true}
                                    fullWidth
                                    value={this.state.make}
                                    name="make"
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Model"
                                    required={true}
                                    fullWidth
                                    value={this.state.model}
                                    name="model"
                                    onChange={this.handleChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <RadioGroup
                                    style={{ justifyContent: 'center' }}
                                    row
                                    aria-label="gender"
                                    name="state"
                                    value={this.state.state}
                                    onChange={this.handleChange.bind(this)}
                                >
                                    <FormControlLabel
                                        value="NEW"
                                        control={<Radio />}
                                        label="New"
                                    />
                                    <FormControlLabel
                                        value="REGISTERED"
                                        control={<Radio />}
                                        label="Registered"
                                    />
                                    <FormControlLabel
                                        value="DEREGISTERED"
                                        control={<Radio />}
                                        label="Deregistered"
                                    />
                                </RadioGroup>
                            </Grid>
                            {this.state.state == 'REGISTERED' ? (
                                <Grid item xs={12}>
                                    <TextField
                                        label="License Plate"
                                        fullWidth
                                        value={this.state.licensePlate}
                                        required={true}
                                        disabled={
                                            this.state.state != 'REGISTERED'
                                        }
                                        name="licensePlate"
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                            ) : (
                                []
                            )}
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={
                                                this.state.generalInspectionBool
                                            }
                                            onChange={this.toggleGIBool}
                                            name="generalInspectionBool"
                                            color="primary"
                                        />
                                    }
                                    label="General Inspection available"
                                />
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <InputLabel>Month</InputLabel>
                                <Select
                                    label="Month"
                                    labelId="StateField"
                                    value={this.state.generalInspectionMonth}
                                    disabled={!this.state.generalInspectionBool}
                                    required={this.state.generalInspectionBool}
                                    fullWidth
                                    name="generalInspectionMonth"
                                    onChange={this.handleChange}
                                >
                                    {this.monthOptions.map((year, i) => {
                                        return (
                                            <MenuItem value={year} key={i}>
                                                {year}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <InputLabel>Year</InputLabel>
                                <Select
                                    label="Year"
                                    labelId="StateField"
                                    value={this.state.generalInspectionYear}
                                    disabled={!this.state.generalInspectionBool}
                                    required={this.state.generalInspectionBool}
                                    fullWidth
                                    name="generalInspectionYear"
                                    onChange={this.handleChange}
                                >
                                    {this.yearOptions.map((year) => {
                                        return (
                                            <MenuItem value={year}>
                                                {year}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </Grid>

                            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                margin="normal"
                label="General Inspection"
                format="yyyy-MM"
                value={this.state.generalInspection}
                onChange={this.handleChangeDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider> */}
                            <Grid item xs={12}>
                                <Button
                                    style={{
                                        float: 'right',
                                        marginLeft: '15px'
                                    }}
                                    id="submit"
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    disabled={
                                        this.state.vin.toString().length != 17
                                    }
                                >
                                    Save
                                </Button>
                                <Button
                                    style={{ float: 'right' }}
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
                </Grid>
                </Grid>
        );
    }
}

export default withRouter(VehicleForm);
