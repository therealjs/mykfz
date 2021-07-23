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
import UserService from '../services/UserService';

const LightTooltip = withStyles(() => ({
    tooltip: {
        backgroundColor: '#175B8E',
        color: 'white',
        fontSize: 14,
        fontFamily: 'Nunito'
    }
}))(Tooltip);

function RegisterProcessFormFields({
    vehicle,
    process,
    reservedPlates,
    onProcessChange
}) {
    return (
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
                        value={process.info.licensePlate}
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
                    onChange={onProcessChange}
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
                    onChange={onProcessChange}
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
                    onChange={onProcessChange}
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
    );
}

function DeregisterProcessFormFields({ vehicle, process, onProcessChange }) {
    const tooltipSecurityCode = (
        <div>
            <Grid container justifyContent="center" spacing={1}>
                <Grid item>
                    <label>
                        The security code I can be found on the acceptance paper
                        part 1 of your vehicle. You need to uncover the
                        respective field to see the code.
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

    const tooltipPlateCode = (
        <div>
            <Grid container justifyContent="center" spacing={1}>
                <Grid item>
                    <label>
                        The plate code can be found on the license plate
                        associated to your vehicle. On the license plate, you
                        need to remove the seal form the badge to expose the
                        code. <b>Attention!</b> With the removal of the seal,
                        the validity of the license plate extingushes.
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

    return (
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
                <TextField
                    label="Security Code I (7)"
                    name="secCodeI"
                    fullWidth
                    required={true}
                    value={process.info.secCodeI}
                    onChange={onProcessChange}
                    maxLength={7}
                    minLength={7}
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
                    value={process.info.plateCode}
                    onChange={onProcessChange}
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
        </Grid>
    );
}

export default function ProcessDetailsForm({
    user,
    vehicle,
    process,
    onProcessChange
}) {
    const [loading, setLoading] = useState(true);
    const [reservedPlates, setReservedPlates] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (process.processType == 'REGISTRATION') {
                const user = await UserService.getUserDetails(); // could have just added a new plate reservation
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
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return <h2>Loading</h2>;
    }

    const formGrid =
        process.processType == 'REGISTRATION' ? (
            <RegisterProcessFormFields
                vehicle={vehicle}
                process={process}
                reservedPlates={reservedPlates}
                onProcessChange={onProcessChange}
            />
        ) : (
            <DeregisterProcessFormFields
                vehicle={vehicle}
                process={process}
                onProcessChange={onProcessChange}
            />
        );

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Process Details
            </Typography>
            {formGrid}
        </React.Fragment>
    );
}
