'use strict';

import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Card, Grid, IconButton } from '@material-ui/core';
import LicensePlate from './LicensePlate';
import AddIcon from '@material-ui/icons/Add';

const makeLogos = require('../../resources/carLogos');

export const LicensePlateReservationList = ({ licensePlateReservations }) => {
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
                    <div>no plate reservations</div>
                )}
                <IconButton
                    component={Link}
                    to={'/addLicensePlateReservation'}
                    aria-label="addLicensePlateReservation"
                >
                    <AddIcon />
                </IconButton>
            </Card>
        </Grid>
    );
};
