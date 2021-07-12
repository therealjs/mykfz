'use strict';

import React from 'react';
import { Link } from 'react-router-dom';

import { Card, Grid, IconButton } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import LicensePlate from './LicensePlate';
import UserService from '../services/UserService';
import LicensePlateService from '../services/LicensePlateService';


const makeLogos = require('../../resources/carLogos');

class LicensePlateReservationList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            licensePlates:[],
            licensePlateReservations: [],
            reservedPlateIds: [],
            reservedPlates: []
        };
    }

    componentWillMount(props) {
        (async () => {
            let reservedPlates = [];
            const user = await UserService.getUserDetails();
            await Promise.all(user.licensePlateReservations.map(async licensePlateReservation => {
                const licensePlate = await LicensePlateService.getLicensePlate(licensePlateReservation.licensePlate);
                reservedPlates.push({ info: licensePlate, reservation: licensePlateReservation });
            }));
            return reservedPlates;
        })().then((reservedPlates) => {
            this.setState({
                reservedPlates: reservedPlates
            });
            console.log(this.state);
        });
        
    }

    render() {
        return (
            <Grid item xs={12} sm={6} md={12}>
                <Card style={{ height: '200px' }}>
                    {this.state.reservedPlates.length > 0 ? (
                        this.state.reservedPlates.map((licensePlate) => (
                            <div key={licensePlate._id}>
                                <LicensePlate
                                    key={licensePlate._id}
                                    licensePlate={licensePlate.info}
                                />
                                {licensePlate.reservation.expiryDate}
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
