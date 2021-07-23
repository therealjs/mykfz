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
                            value={process.infolicensePlate}
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
                        value={process.info.evb}
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
                        value={process.info.secCodeII}
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
                        value={process.info.iban}
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
}
