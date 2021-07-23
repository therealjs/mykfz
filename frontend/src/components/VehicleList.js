'use strict';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import VehicleListPaper from './VehicleListPaper';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import VehicleService from '../services/VehicleService';

import { withRouter } from 'react-router';

function VehicleList({ user }) {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let vehiclesResult = await VehicleService.getVehiclesForUser(
                user._id
            );
            setVehicles(vehiclesResult);
        };

        fetchData();
    }, []);
    return (
        <Grid
            justify="flex-start"
            container
            direction="row"
            alignItems="flex-start"
            spacing={3}
        >
            {vehicles.map((vehicle, i) => (
                <VehicleListPaper key={vehicle._id} vehicle={vehicle} />
            ))}
        </Grid>
    );
}

export default withRouter(VehicleList);
