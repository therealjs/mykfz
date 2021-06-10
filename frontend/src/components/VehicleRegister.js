'use strict';

import React from 'react';
import {
    Grid,
    Card,
    Checkbox,
    TextField,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Typography,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import Page from './Page';
import UserService from '../services/UserService';

const style = { maxWidth: 500 };
import DistrictService from '../services/DistrictService';

class VehicleRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: UserService.getCurrentUser().id,
            vin: props.vehicle.vin,
            evb: '',
            iban: '',
            licensePlate: props.vehicle.licensePlate,
            generalInspectionMonth: props.vehicle.generalInspectionMonth,
            generalInspectionYear: props.vehicle.generalInspectionYear,
            secCodeII: '',
            districtOptions: [],
            district: '',
            letters: '',
            numbers: '',
            
        };

        this.yearOptions = this.monthOptions = Array(4)
            .fill()
            .map((element, index) => new Date().getFullYear() + index);
        this.monthOptions = Array(12)
            .fill()
            .map((element, index) => index + 1);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount(props) {
        this.setState({
            loading: true
        });

        (async () => {
            try {
                let district = await DistrictService.getDistrict(this.props.user.address.district);
                console.log(this.props.user)
                this.setState({
                    districtOptions: district.kfz[0].split(", "),
                });
                console.log(district.kfz)
                console.log(this.state.districtOptions)
            } catch (err) {
                console.error(err+ "X");
            }
        })();
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        let vehicle = this.props.vehicle;

        vehicle.licensePlate = this.state.licensePlate;
        vehicle.state = 'REGISTERED';
        vehicle.generalInspectionMonth = this.state.generalInspectionMonth;
        vehicle.generalInspectionYear = this.state.generalInspectionYear;
        vehicle.processes.push({
            processType: 'REGISTRATION',
            date: Date(),
            state: 'NEW',
            info: {
                eVB: this.state.evb,
                secCodeII: this.state.secCodeII,
                iban: this.state.iban
            }
        });

        this.props.onSubmit(vehicle);
    }

    render() {
        return (
            <Page>
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
                            Register
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
                                    label="License Plate"
                                    required={true}
                                    fullWidth
                                    name="licensePlate"
                                    value={this.state.licensePlate}
                                    onChange={this.handleChange}
                                    maxLength={12}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="VIN"
                                    disabled={true}
                                    required={true}
                                    fullWidth
                                    value={this.state.vin}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="eVB (7)"
                                    name="evb"
                                    required={true}
                                    fullWidth
                                    value={this.state.evb}
                                    onChange={this.handleChange}
                                    maxLength={7}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Security Code II (12)"
                                    name="secCodeII"
                                    required={true}
                                    fullWidth
                                    value={this.state.secCodeII}
                                    onChange={this.handleChange}
                                    maxLength={12}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="IBAN (22)"
                                    name="iban"
                                    required={true}
                                    fullWidth
                                    value={this.state.iban}
                                    onChange={this.handleChange}
                                    maxLength={22}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormLabel component="legend">
                                    General Inspection
                                </FormLabel>
                            </Grid>

                            <Grid item xs={6}>
                                <InputLabel>Month</InputLabel>
                                <Select
                                    label="Month"
                                    value={this.state.generalInspectionMonth}
                                    required={true}
                                    fullWidth
                                    name="generalInspectionMonth"
                                    onChange={this.handleChange}
                                >
                                    {this.monthOptions.map((year) => {
                                        return (
                                            <MenuItem value={year}>
                                                {year}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>Year</InputLabel>
                                <Select
                                    label="Year"
                                    value={this.state.generalInspectionYear}
                                    required={true}
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
                                        //this.state.licensePlate.toString().length != 4 ||
                                        this.state.evb.toString().length != 7 ||
                                        this.state.secCodeII.toString()
                                            .length != 12 ||
                                        this.state.iban.toString().length != 22
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
            </Page>
        );
    }
}

export default withRouter(VehicleRegister);
