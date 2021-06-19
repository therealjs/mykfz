'use strict';

import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Card, Grid, IconButton } from '@material-ui/core';
import LicensePlate from './LicensePlate';
import AddIcon from '@material-ui/icons/Add'

import LicensePlateService from '../services/LicensePlateService';

const makeLogos = require('../../resources/carLogos')

// const licensePlateReservations = [
//     {
//         "plate": {
//             "areaCode": "M",
//             "letters": "EF",
//             "digits": "123"
//         },
//         "expiryDate": "2021-09-09"
//     },
//     {
//         "plate": {
//             "areaCode": "MIL",
//             "letters": "EF",
//             "digits": "123"
//         },
//         "expiryDate": "2021-20-09"
//     }
// ]

// const async = (id) => {
//     try {

//     } catch (err) {

//     }
// };

export const LicensePlateReservationList = ({ licensePlateReservations }) => {

    // componentWillMount(props) {
    //     (async () => {
    //         try {
    //             let licensePlate = await LicensePlateService.getLicensePlate(
    //                 this.props.vehicle.licensePlate
    //             );
    //             this.setState({
    //                 licensePlate: licensePlate.areaCode + " - " +  licensePlate.letters + " " + licensePlate.digits
    //             });
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     })();
    // }

    return <Grid item xs={12} sm={6} md={12}>
        <Card style={{ height: "200px" }}>
            {licensePlateReservations.length > 0 ? licensePlateReservations.map((plateReservation) => (
                <div>
                    <LicensePlate licensePlate={plateReservation.licensePlate} />
                    {plateReservation.expiryDate}
                </div>
            )) : <div>no plate reservations</div>}
            <IconButton
                component={Link}
                to={'/addLicensePlateReservation'}
                aria-label="addLicensePlateReservation"
            >
                <AddIcon />s
            </IconButton>
        </Card>
    </Grid>

};
