'use strict';

import React from 'react';
import { Link } from 'react-router-dom';

import { Card, Grid, IconButton, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import LicensePlate from './LicensePlate';
import UserService from '../services/UserService';
import LicensePlateService from '../services/LicensePlateService';
import DeleteIcon from '@material-ui/icons/Delete';


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

    formatDate(expiryDate) {
        let currently = new Date(expiryDate) 
        const options = {year: 'numeric', month: 'long', day: 'numeric'};//, hour: '2-digit', minute: '2-digit' };
        return currently.toLocaleDateString('en-US', options)
    }

    getDaysLeft(expiryDate) {
        let currently = new Date() 
        let difference = Math.abs(currently - (new Date(expiryDate)).getTime());
        console.log(difference)
        let daysLeft = Math.floor(difference/1000/60/60/24)
        return daysLeft
    }

    render() {
        console.log(this.state)
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
                        <TableCell align="left">{this.formatDate(licensePlate.reservation.expiryDate)}</TableCell>
                        <TableCell>{this.getDaysLeft(licensePlate.reservation.expiryDate)}</TableCell>
                        <TableCell>
                            <IconButton aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <caption style={{textAlign: "center"}}>Reservations always expire at 12:00 AM on the corresponding date.</caption>
                </Table>
                </TableContainer>) 
                // : (
                //     <div>No plate reservations</div>
                // )}
                //);
    }
}

export default withRouter(LicensePlateReservationList);
