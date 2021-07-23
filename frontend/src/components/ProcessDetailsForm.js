import {
    Button,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Tooltip
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import InfoIcon from '@material-ui/icons/Info';
import { PayPalButton } from 'react-paypal-button-v2';
import LicensePlateService from '../services/LicensePlateService';

const LightTooltip = withStyles(() => ({
    tooltip: {
        backgroundColor: '#175B8E',
        color: 'white',
        fontSize: 14,
        fontFamily: 'Nunito'
    }
}))(Tooltip);

export default function ProcessDetailsForm({
    user,
    vehicle,
    process,
    onProcessChange
}) {
    const handleChange = (event) => {
        onProcessChange(event);
    };

    const [loading, setLoading] = useState(true);
    const [reservedPlates, setReservedPlates] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let platesResult = [];
            for (const reservedPlateId of user.licensePlateReservations.map(
                (reservation) => reservation.licensePlate
            )) {
                const plate = await LicensePlateService.getLicensePlate(
                    reservedPlateId
                );
                console.log(plate);
                platesResult.push(plate);
            }
            setReservedPlates(platesResult);
            console.log(platesResult);
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return <h2>Loading</h2>;
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Process Details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        label="VIN"
                        disabled={true}
                        required={true}
                        fullWidth
                        value={vehicle.vin}
                        InputProps={{
                            endAdornment: (
                                <LightTooltip
                                    title="Vehicle Identifcation Number. The vehicle identification number provides a unique identifier for your vehicle and can be found 
                                                on the acceptance paper part 1 and 2 of your vehicle. "
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
                    <FormControl fullWidth>
                        <InputLabel id="plate-select-label">
                            Reserved Plate
                        </InputLabel>
                        <Select
                            fullWidth
                            value={process.licensePlate}
                            labelId="plate-select-label"
                            required={true}
                            name="licensePlate"
                            id="plate-select"
                            onChange={onProcessChange}
                        >
                            {reservedPlates.map((plate) => {
                                return (
                                    <MenuItem value={plate._id}>
                                        {`${plate.areaCode}` +
                                            ' - ' +
                                            `${plate.letters}` +
                                            ' ' +
                                            `${plate.digits}`}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="eVB (7)"
                        name="evb"
                        required={true}
                        fullWidth
                        value={process.evb}
                        onChange={handleChange}
                        minLength={7}
                        maxLength={7}
                        InputProps={{
                            endAdornment: (
                                <LightTooltip
                                    title="Electronic confirmation of insurance coverage. The eVB number has to be requested from your auto insurer."
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
                        label="Security Code II (12)"
                        name="secCodeII"
                        required={true}
                        fullWidth
                        value={process.secCodeII}
                        onChange={handleChange}
                        minLength={12}
                        maxLength={12}
                        InputProps={{
                            endAdornment: (
                                //TODO insert actual tooltip
                                <LightTooltip title={'title'} placement="right">
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
                        label="IBAN (22)"
                        name="iban"
                        required={true}
                        fullWidth
                        value={process.iban}
                        onChange={handleChange}
                        minLength={22}
                        maxLength={22}
                        InputProps={{
                            endAdornment: (
                                <LightTooltip
                                    title="The IBAN is required for the recurrent payment of the vehicle tax."
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
            </Grid>
        </React.Fragment>
    );

    // const [process, setProcess] = useState({
    //     amount: 0,
    //     evb: '',
    //     secCodeII: '',
    //     iban: '',
    //     generalInspectionMonth: 1,
    //     generalInspectionYear: 2022
    // });
    // const [areaCode, setAreaCode] = useState('M');

    // const clientId =
    //     'ATuI28VIncLCJuX7OGrZeGvMtje-hZnJMvYWnUcr_TF89oEoN0wO0D1oMz3cGq9ShUt-sEZhFXuA2lvN';

    // const areaCodeOptions = [];

    // const changeUsesReservedPlate = () => {
    //     let newProcess = process;
    //     newProcess.usesReservedPlate = !process.usesReservedPlate;
    //     setProcess(newProcess);
    // };

    // const handleChange = (e) => {
    //     console.log(e);
    // };

    // const tooltipImgTxt = (
    //     <div>
    //         <Grid container>
    //             <Grid item>
    //                 <label>
    //                     Security Code II can be found on the acceptance paper
    //                     part 2 of your vehicle.
    //                 </label>
    //             </Grid>
    //             <Grid item>
    //                 <img
    //                     width="285"
    //                     height="350"
    //                     src="https://www.bmvi.de/SharedDocs/DE/Bilder/VerkehrUndMobilitaet/Strasse/fahrzeugzulassung-online-3.png?__blob=normal"
    //                     alt=""
    //                 ></img>
    //             </Grid>
    //         </Grid>
    //     </div>
    // );

    // const yearOptions = Array(4)
    //     .fill()
    //     .map((element, index) => new Date().getFullYear() + index);
    // const monthOptions = Array(12)
    //     .fill()
    //     .map((element, index) => index + 1);

    // return (
    //     <React.Fragment>
    //         <Typography variant="h6" gutterBottom>
    //             Process Details
    //         </Typography>
    {
        /* 
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
                        <InputLabel>{String('District')}</InputLabel>

                        <Select
                            value={areaCode}
                            required={true}
                            name="areaCode"
                            onChange={handleChange}
                        >
                            {areaCodeOptions.map((areaCode) => {
                                return (
                                    <MenuItem value={areaCode}>
                                        {areaCode}
                                    </MenuItem>
                                );
                            })}
                            ;
                        </Select>
                    </FormControl>
                    <FormControl style={{ width: '80px' }}>
                        <TextField
                            label="Letters"
                            required={true}
                            name="letters"
                            value={process.letters}
                            // ToDo add regex
                            onChange={handleChange}
                            inputProps={{ maxLength: 2 }}
                        />
                    </FormControl>
                    <FormControl style={{ width: '80px' }}>
                        <TextField
                            label="digits"
                            required={true}
                            name="digits"
                            type="number"
                            value={process.digits}
                            onChange={handleChange}
                            inputProps={{ maxLength: 3 }}
                        />
                    </FormControl>
                </FormGroup>
            </Grid>
            <Grid item xs={3}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={process.usesReservedPlate}
                            onChange={changeUsesReservedPlate}
                            name="usesReservedPlate"
                            color="primary"
                        />
                    }
                    label="use reserved plate"
                />
            </Grid>
            <Grid item xs={9}>
                {process.usesReservedPlate ? (
                    <div>
                        <InputLabel>Reserved Plate</InputLabel>
                        <Select
                            label="Reserved Plate"
                            value={process.selectedReservedPlate}
                            defaultValue=""
                            required={true}
                            fullWidth
                            disabled={process.readOnly}
                            name="selectedReservedPlate"
                            onChange={this.changeReservedPlate}
                        >
                            {process.reservedPlates.map((plate) => {
                                return (
                                    <MenuItem value={plate}>
                                        {`${plate.areaCode}` +
                                            ' - ' +
                                            `${plate.letters}` +
                                            ' ' +
                                            `${plate.digits}`}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </div>
                ) : (
                    []
                )}
            </Grid>

            <Grid item xs={12}>
                <TextField
                    label="VIN"
                    disabled={true}
                    required={true}
                    fullWidth
                    value={'VIN'}
                    InputProps={{
                        endAdornment: (
                            <LightTooltip
                                title="Vehicle Identifcation Number. The vehicle identification number provides a unique identifier for your vehicle and can be found 
                                                on the acceptance paper part 1 and 2 of your vehicle. "
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
                    label="eVB (7)"
                    name="evb"
                    required={true}
                    fullWidth
                    value={process.evb}
                    onChange={handleChange}
                    maxLength={7}
                    InputProps={{
                        endAdornment: (
                            <LightTooltip
                                title="Electronic confirmation of insurance coverage. The eVB number has to be requested from your auto insurer."
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
                    label="Security Code II (12)"
                    name="secCodeII"
                    required={true}
                    fullWidth
                    value={process.secCodeII}
                    onChange={handleChange}
                    maxLength={12}
                    InputProps={{
                        endAdornment: (
                            <LightTooltip
                                title={tooltipImgTxt}
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
                    label="IBAN (22)"
                    name="iban"
                    required={true}
                    fullWidth
                    value={process.iban}
                    onChange={handleChange}
                    maxLength={22}
                    InputProps={{
                        endAdornment: (
                            <LightTooltip
                                title="The IBAN is required for the recurrent payment of the vehicle tax."
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
            <Grid
                item
                xs={12}
                container
                direction="row"
                justify="space-between"
            >
                <Grid item>
                    <FormLabel component="legend">General Inspection</FormLabel>
                </Grid>
                <Grid item>
                    <LightTooltip
                        title="Provide the expiration date of the general inspection of your vehicle."
                        placement="right"
                    >
                        <InfoIcon />
                    </LightTooltip>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <InputLabel>Month</InputLabel>
                <Select
                    label="Month"
                    value={process.generalInspectionMonth}
                    required={true}
                    fullWidth
                    name="generalInspectionMonth"
                    onChange={handleChange}
                >
                    {monthOptions.map((year) => {
                        return <MenuItem value={year}>{year}</MenuItem>;
                    })}
                </Select>
            </Grid>
            <Grid item xs={6}>
                <InputLabel>Year</InputLabel>
                <Select
                    label="Year"
                    value={process.generalInspectionYear}
                    required={true}
                    fullWidth
                    name="generalInspectionYear"
                    onChange={handleChange}
                >
                    {yearOptions.map((year) => {
                        return <MenuItem value={year}>{year}</MenuItem>;
                    })}
                </Select>
            </Grid>
            <Grid item xs={12}>
                <h2>Total:</h2>
                <h1>€{process.amount.toFixed(2)}</h1>
            </Grid>

            <Grid item xs={12}>
                <PayPalButton
                    amount={process.amount}
                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                    onSuccess={(details, data) => {
                        alert(
                            'Transaction completed by ' +
                                details.payer.name.given_name
                        );

                        // OPTIONAL: Call your server to save the transaction
                        // return fetch(
                        //     '/paypal-transaction-complete',
                        //     {
                        //         method: 'post',
                        //         body: JSON.stringify({
                        //             orderId: data.orderID
                        //         })
                        //     }
                        // );
                    }}
                    options={{
                        clientId: clientId,
                        currency: 'EUR'
                    }}
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
                            //process.licensePlate.toString().length != 4 ||
                            process.evb.toString().length != 7 ||
                            process.secCodeII.toString().length != 12 ||
                            process.iban.toString().length != 22
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
                    <p>Item is paid? {process.isPaid.toString()}</p>
                    <p>OrderID is: {process.orderID.toString()}</p>
                </div>
                <p>Item is paid? {process.isPaid.toString()}</p>
                <p>OrderID is: {process.orderID.toString()}</p>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Address line 1"
                        fullWidth
                        autoComplete="shipping address-line1"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="shipping address-line2"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="state"
                        name="state"
                        label="State/Province/Region"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="shipping country"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                color="secondary"
                                name="saveAddress"
                                value="yes"
                            />
                        }
                        label="Use this address for payment details"
                    />
                </Grid>
            </Grid> */
    }
    {
        /* </React.Fragment>
    ); */
    }
}
