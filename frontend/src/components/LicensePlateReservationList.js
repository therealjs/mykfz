'use strict';

import React from 'react';
import { Link } from 'react-router-dom';

import { Card, Grid, IconButton } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import LicensePlate from './LicensePlate';
import UserService from '../services/UserService';
import LicensePlateService from '../services/LicensePlateService';

console.log("aha")


const makeLogos = require('../../resources/carLogos');

class LicensePlateReservationList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reservedPlateIds: [],
            reservedPlates: []
        };
        console.log("aha2");
    }

    componentWillMount(props) {
            console.log("aha3");
        (async () => {
            const user = await UserService.getUserDetails();
            return user.licensePlateReservations;

        })().then((licensePlateReservations) => {
                Promise.all(licensePlateReservations.map(async plate => {
                    const licensePlate = await LicensePlateService.getLicensePlate(plate.licensePlate);
                    return licensePlate;
                })).then((o) => {
                    console.log(o)
                }
                )
        })();
    }

    async getLicensePlates(userPlateReservations) {
        (async () => reservedPlatesList = Promise.all(userPlateReservations.map(async plate => {
                        const licensePlate = await LicensePlateService.getLicensePlate(plate.licensePlate);
                        return licensePlate;
                    })))().then(() => {
                        console.log(reservedPlatesList);
                        return reservedPlatesList;
    })()}

    render() {
        console.log(this.state)
        return (
            <Grid item xs={12} sm={6} md={12}>
                <Card style={{ height: '200px' }}>
                    {licensePlateReservations.length > 0 ? (
                        licensePlateReservations.map((plateReservation) => (
                            <div key={plateReservation._id}>
                                <LicensePlate
                                    key={plateReservation._id}
                                    licensePlate={plateReservation.licensePlate}
                                />
                                {plateReservation.expiryDate}
                            </div>
                        ))
                    ) : (
                        <div>No plate reservations</div>
                    )}
                </Card>
            </Grid>
        );
    }
}

export default withRouter(LicensePlateReservationList);
