'use strict';

import React from 'react';
import { Link } from 'react-router-dom';

import {
    Card,
    CircularProgress,
    Grid,
    IconButton,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Paper
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import LicensePlate from './LicensePlate';
import UserService from '../services/UserService';
import LicensePlateService from '../services/LicensePlateService';
import DeleteIcon from '@material-ui/icons/Delete';
import { Alert, AlertTitle } from '@material-ui/lab';

const makeLogos = require('../../resources/carLogos');

class LicensePlateReservationList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            user: {},
            licensePlates: [],
            licensePlateReservations: [],
            reservedPlates: []
        };
        this.handleDeleteLicensePlateReservation =
            this.handleDeleteLicensePlateReservation.bind(this);
    }

    componentWillMount(props) {
        (async () => {
            let reservedPlates = [];
            const user = await UserService.getUserDetails();
            this.setState({ user: user });
            await Promise.all(
                user.licensePlateReservations.map(
                    async (licensePlateReservation) => {
                        const licensePlate =
                            await LicensePlateService.getLicensePlate(
                                licensePlateReservation.licensePlate
                            );
                        reservedPlates.push({
                            info: licensePlate,
                            reservation: licensePlateReservation
                        });
                    }
                )
            );
            return reservedPlates;
        })().then((reservedPlates) => {
            this.setState({
                reservedPlates: reservedPlates,
                loading: false
            });
        });
    }

    formatDate(expiryDate) {
        let currently = new Date(expiryDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' }; //, hour: '2-digit', minute: '2-digit' };
        return currently.toLocaleDateString('en-US', options);
    }

    getDaysLeft(expiryDate) {
        let currently = new Date();
        let difference = Math.abs(currently - new Date(expiryDate).getTime());
        let daysLeft = Math.floor(difference / 1000 / 60 / 60 / 24);
        return daysLeft;
    }

    handleDeleteLicensePlateReservation(plateReservationId, plateId) {
        (async () => {
            try {
                let user = await UserService.deleteLicensePlateReservation(
                    this.state.user._id,
                    plateReservationId
                );
                let deletedLicensePlate =
                    await LicensePlateService.deleteLicensePlate(plateId);
                let updatedReservedPlates = this.state.reservedPlates.filter(
                    (plate) => plate._id === plateId
                );
                this.setState({
                    user: user,
                    reservedPlates: updatedReservedPlates
                });
            } catch (err) {
                console.error(err);
            }
        })();
    }

    render() {
        if (this.state.loading) {
            return <CircularProgress />;
        }

        if (!this.state.reservedPlates || this.state.reservedPlates == 0) {
            return (
                <Grid
                    justify="center"
                    container
                    alignItems="center"
                    spacing={3}
                >
                    <Grid item xs={6}>
                        <Alert severity="info">
                            <AlertTitle>No License Plates</AlertTitle>
                            Try reserving a new license plate on the side bar.
                        </Alert>
                    </Grid>
                </Grid>
            );
        }

        return (
            //this.state.reservedPlates.length > 0 ?
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Expires</TableCell>
                            <TableCell>Days Left</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.reservedPlates.map((licensePlate) => (
                            <TableRow key={licensePlate._id}>
                                <TableCell align="left">
                                    <LicensePlate
                                        key={licensePlate._id}
                                        licensePlate={licensePlate.info}
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    {this.formatDate(
                                        licensePlate.reservation.expiryDate
                                    )}
                                </TableCell>
                                <TableCell>
                                    {this.getDaysLeft(
                                        licensePlate.reservation.expiryDate
                                    )}
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() =>
                                            this.handleDeleteLicensePlateReservation(
                                                licensePlate.reservation._id,
                                                licensePlate.info._id
                                            )
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <caption style={{ textAlign: 'center' }}>
                        Reservations always expire at 12:00 AM on the
                        corresponding date.
                    </caption>
                </Table>
            </TableContainer>
        );
        // : (
        //     <div>No plate reservations</div>
        // )}
        //);
    }
}

export default withRouter(LicensePlateReservationList);
