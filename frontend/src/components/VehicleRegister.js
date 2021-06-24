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
    FormHelperText,
    FormGroup,
    FormLabel
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import Page from './Page';
import UserService from '../services/UserService';

const style = { maxWidth: 500 };
import DistrictService from '../services/DistrictService';
import LicensePlateService from '../services/LicensePlateService';

class VehicleRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            licensePlate: props.vehicle.licensePlate,
            generalInspectionMonth: props.vehicle.generalInspectionMonth,
            generalInspectionYear: props.vehicle.generalInspectionYear,
            secCodeII: '',
            evb: '',
            iban: '',
            areaCodeOptions: [],
            areaCode: '',
            letters: '',
            digits: '',
            readOnly: false
        };

        this.yearOptions = this.monthOptions = Array(4)
            .fill()
            .map((element, index) => new Date().getFullYear() + index);
        this.monthOptions = Array(12)
            .fill()
            .map((element, index) => index + 1);

        if (
            this.props.location &&
            this.props.location.state &&
            this.props.location.state.info
        ) {
            this.state.secCodeII = this.props.location.state.info.secCodeII;
            this.state.evb = this.props.location.state.info.evb;
            this.state.iban = this.props.location.state.info.iban;
            this.state.readOnly = true;
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount(props) {
        this.setState({
            loading: true
        });
        (async () => {
            try {
                let user = await UserService.getUserDetails();
                let district = await DistrictService.getDistrict(
                    user.address.district
                );
                this.setState({
                    areaCodeOptions: district.areaCode
                });
            } catch (err) {
                console.error(err + 'X');
            }
        })();
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const licensePlate = {
            areaCode: this.state.areaCode,
            digits: this.state.digits,
            letters: this.state.letters
        };

        (async () => {
            try {
                const validatedPlate =
                    await LicensePlateService.createLicensePlate(licensePlate);
                this.setState({
                    licensePlate: validatedPlate._id
                });
            } catch (err) {
                console.error(err);
            }
        })().then(() => {
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
                    evb: this.state.evb,
                    secCodeII: this.state.secCodeII,
                    iban: this.state.iban
                }
            });

            this.props.onSubmit(vehicle);
        });
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
                                <FormGroup
                                    row
                                    style={{
                                        justifyContent: 'space-between',
                                        padding: '20px',
                                        paddingLeft: '20%',
                                        height: '120px',
                                        backgroundImage: `url(${'https://t3.ftcdn.net/jpg/00/11/79/08/240_F_11790850_Gi4UC9cwGMUMGWtZhSP4yKpFg3tqlPis.jpg'})`,
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                >
                                    <FormControl style={{ width: '80px' }}>
                                        <InputLabel>
                                            {String('District')}
                                        </InputLabel>

                                        <Select
                                            value={this.state.areaCode}
                                            required={true}
                                            name="areaCode"
                                            disabled={this.state.readOnly}
                                            onChange={this.handleChange}
                                        >
                                            {this.state.areaCodeOptions.map(
                                                (areaCode) => {
                                                    return (
                                                        <MenuItem
                                                            value={areaCode}
                                                        >
                                                            {areaCode}
                                                        </MenuItem>
                                                    );
                                                }
                                            )}
                                            ;
                                        </Select>
                                    </FormControl>
                                    <FormControl style={{ width: '80px' }}>
                                        <TextField
                                            label="Letters"
                                            required={true}
                                            name="letters"
                                            disabled={this.state.readOnly}
                                            value={this.state.letters}
                                            // ToDo add regex
                                            onChange={this.handleChange}
                                            inputProps={{ maxLength: 2 }}
                                        />
                                    </FormControl>
                                    <FormControl style={{ width: '80px' }}>
                                        <TextField
                                            label="digits"
                                            required={true}
                                            name="digits"
                                            type="number"
                                            disabled={this.state.readOnly}
                                            value={this.state.digits}
                                            onChange={this.handleChange}
                                            inputProps={{ maxLength: 3 }}
                                        />
                                    </FormControl>
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="VIN"
                                    disabled={true}
                                    required={true}
                                    fullWidth
                                    value={this.props.vehicle.vin}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="eVB (7)"
                                    name="evb"
                                    required={true}
                                    fullWidth
                                    disabled={this.state.readOnly}
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
                                    disabled={this.state.readOnly}
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
                                    disabled={this.state.readOnly}
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
                                    disabled={this.state.readOnly}
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
                                    disabled={this.state.readOnly}
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
                                {this.state.readOnly ? (
                                    <Button
                                        style={{
                                            float: 'right',
                                            marginLeft: '15px'
                                        }}
                                        id="submit"
                                        variant="contained"
                                        type="submit"
                                        color="primary"
                                    >
                                        Print confirmation
                                    </Button>
                                ) : (
                                    <div>
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
                                                this.state.evb.toString()
                                                    .length != 7 ||
                                                this.state.secCodeII.toString()
                                                    .length != 12 ||
                                                this.state.iban.toString()
                                                    .length != 22
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
                                    </div>
                                )}
                            </Grid>
                        </Grid>
                    </form>
                </Card>
            </Page>
        );
    }
}

export default withRouter(VehicleRegister);
