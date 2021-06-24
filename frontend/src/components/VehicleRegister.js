'use strict';

import {
    Button,
    Card,
    FormControl,
    FormGroup,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { withRouter } from 'react-router-dom';
import DistrictService from '../services/DistrictService';
import LicensePlateService from '../services/LicensePlateService';
import UserService from '../services/UserService';
import Page from './Page';
import CurrencyFormat from 'react-currency-format';

const style = { maxWidth: 500 };

const clientId =
    'ATuI28VIncLCJuX7OGrZeGvMtje-hZnJMvYWnUcr_TF89oEoN0wO0D1oMz3cGq9ShUt-sEZhFXuA2lvN';

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
            areaCodeOptions: [],
            areaCode: '',
            letters: '',
            digits: '',
            orderID: 0,
            isPaid: false,
            amount: 42.5,
            usesReservedPlate: false
        };

        this.yearOptions = this.monthOptions = Array(4)
            .fill()
            .map((element, index) => new Date().getFullYear() + index);
        this.monthOptions = Array(12)
            .fill()
            .map((element, index) => index + 1);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createOrder = this.createOrder.bind(this);
    }

    componentWillMount(props) {
        this.setState({
            loading: true
        });

        // set district area code options
        (async () => {
            try {
                let district = await DistrictService.getDistrict(
                    this.props.user.address.district
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
        if (event.target.name === 'usesReservedPlate') {
            // checkbox field
            const usesReservedPlate = event.target.checked;
            this.setState({
                usesReservedPlate: usesReservedPlate,
                amount: 42.5 + 12.8 * usesReservedPlate // using a reserved plate costs extra
            });
        } else {
            this.setState({
                [event.target.name]: event.target.value
            });
        }
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
                    eVB: this.state.evb,
                    secCodeII: this.state.secCodeII,
                    iban: this.state.iban
                }
            });

            this.props.onSubmit(vehicle);
        });
    }

    createOrder(data, actions) {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: {
                            value: this.state.amount
                        }
                    }
                ]
            })
            .then((orderID) => {
                this.setState({ orderId: orderID });
                return orderID;
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
                        TODO license plate should be a separate component
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
                                            value={this.state.digits}
                                            onChange={this.handleChange}
                                            inputProps={{ maxLength: 3 }}
                                        />
                                    </FormControl>
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={
                                                this.state.usesReservedPlate
                                            }
                                            onChange={this.handleChange}
                                            name="usesReservedPlate"
                                            color="primary"
                                        />
                                    }
                                    label="is a reserved plate"
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
                                <h2>Total:</h2>
                                <CurrencyFormat
                                    value={this.state.amount}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'€'}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <PayPalButton
                                    amount={this.state.amount}
                                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                    onSuccess={(details, data) => {
                                        alert(
                                            'Transaction completed by ' +
                                                details.payer.name.given_name
                                        );

                                        // OPTIONAL: Call your server to save the transaction
                                        return fetch(
                                            '/paypal-transaction-complete',
                                            {
                                                method: 'post',
                                                body: JSON.stringify({
                                                    orderId: data.orderID
                                                })
                                            }
                                        );
                                    }}
                                    options={{
                                        clientId: clientId,
                                        currency: 'EUR'
                                    }}
                                />
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
                                <p>
                                    Item is paid? {this.state.isPaid.toString()}
                                </p>
                                <p>
                                    OrderID is: {this.state.orderID.toString()}
                                </p>
                            </Grid>
                        </Grid>
                    </form>
                </Card>
            </Page>
        );
    }
}

export default withRouter(VehicleRegister);
