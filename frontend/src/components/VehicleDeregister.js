'use strict';

import React from 'react';
import {
    Grid,
    Card,
    TextField,
    Checkbox,
    InputAdornment,
    InputLabel,
    NativeSelect,
    MenuItem,
    Button,
    FormControlLabel,
    RadioGroup,
    Radio,
    Switch,
    Tooltip,
    Typography
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { withRouter } from 'react-router-dom';

import Page from './Page';
import LicensePlateService from '../services/LicensePlateService';
import { withStyles } from '@material-ui/styles';

const LightTooltip = withStyles(() => ({
    tooltip: {
        backgroundColor: '#175B8E',
        color: 'white',
        fontSize: 14,
        fontFamily: 'Nunito'
    }
}))(Tooltip);

class VehicleDeregister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vin: props.vehicle.vin,
            licensePlate: props.vehicle.licensePlate,
            generalInspection: props.vehicle.generalInspection,
            secCodeI: '',
            plateCode: '',
            reserveLicensePlate: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleChangeCheckbox(event) {
        this.setState({ [event.target.name]: event.target.checked });
    }

    handleSubmit(event) {
        event.preventDefault();

        let vehicle = this.props.vehicle;

        (async () => {
            try {
                let del =
                    await LicensePlateService.createLicensePlateReservation(
                        this.props.user._id,
                        vehicle.licensePlate,
                        // TODO: set to 90 days
                        100
                    );
            } catch (err) {
                console.error(err);
            }
            if (this.state.reserveLicensePlate) {
                const licensePlate = 0;
            }
        })().then(() => {
            vehicle.licensePlate = null;
            vehicle.state = 'DEREGISTERED';
            vehicle.processes.push({
                processType: 'DEREGISTRATION',
                date: new Date(),
                state: 'NEW',
                info: {
                    secCodeI: this.state.secCodeI,
                    plateCode: this.state.plateCode
                },
                processState: 'PAYED'
            });

            this.props.onSubmit(vehicle);
        });
    }

    render() {
        const tooltipPlateCode = (
            <div>
                <Grid container>
                    <Grid item>
                        <label>
                            The plate code can be found on the license plate
                            associated to your vehicle. On the license plate,
                            you need to remove the seal form the badge to expose
                            the code. <b>Attention!</b> With the removal of the
                            seal, the validity of the license plate extingushes.
                        </label>
                    </Grid>
                    <Grid item>
                        <img
                            width="285"
                            height="165"
                            src="https://www.bmvi.de/SharedDocs/DE/Bilder/VerkehrUndMobilitaet/Strasse/fahrzeugzulassung-online-5.jpg?__blob=normal"
                            alt=""
                        ></img>
                    </Grid>
                </Grid>
            </div>
        );
        const tooltipSecurityCode = (
            <div>
                <Grid container>
                    <Grid item>
                        <label>
                            The security code I can be found on the acceptance
                            paper part 1 of your vehicle. You need to uncover
                            the respective field to see the code.
                        </label>
                    </Grid>
                    <Grid item>
                        <img
                            width="285"
                            height="365"
                            src="https://www.bmvi.de/SharedDocs/DE/Bilder/VerkehrUndMobilitaet/Strasse/fahrzeugzulassung-online-3.png?__blob=normal"
                            alt=""
                        ></img>
                    </Grid>
                </Grid>
            </div>
        );
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
                            <Grid item xs={12}>
                                <TextField
                                    label="License Plate"
                                    name="licensePlate"
                                    fullWidth
                                    disabled={true}
                                    value={this.state.licensePlate}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="VIN"
                                    name="vin"
                                    fullWidth
                                    disabled={true}
                                    value={this.state.vin}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Security Code I (7)"
                                    name="secCodeI"
                                    fullWidth
                                    required={true}
                                    value={this.state.secCodeI}
                                    onChange={this.handleChange}
                                    maxLength={7}
                                    InputProps={{
                                        endAdornment: (
                                            <LightTooltip
                                                title={tooltipSecurityCode}
                                                placement="right"
                                            >
                                                <InputAdornment position="end">
                                                    <InfoIcon />
                                                </InputAdornment>
                                            </LightTooltip>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Plate Code (3)"
                                    required={true}
                                    name="plateCode"
                                    fullWidth
                                    value={this.state.plateCode}
                                    onChange={this.handleChange}
                                    maxLength={3}
                                    InputProps={{
                                        endAdornment: (
                                            <LightTooltip
                                                title={tooltipPlateCode}
                                                placement="right"
                                            >
                                                <InputAdornment position="end">
                                                    <InfoIcon />
                                                </InputAdornment>
                                            </LightTooltip>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={
                                                this.state.reserveLicensePlate
                                            }
                                            onChange={this.handleChangeCheckbox}
                                            name="reserveLicensePlate"
                                            color="primary"
                                        />
                                    }
                                    label="Reserve license plate for 90 days"
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                                            this.state.plateCode.toString()
                                                .length != 3 ||
                                            this.state.secCodeI.toString()
                                                .length != 7
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
                            </Grid>
                        </Grid>
                    </form>
                </Card>
            </Page>
        );
    }
}

export default withRouter(VehicleDeregister);
