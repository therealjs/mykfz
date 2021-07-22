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
            alignItems="center"
            spacing={3}
        >
            {vehicles.map((vehicle, i) => (
                <VehicleListPaper key={vehicle._id} vehicle={vehicle} />
            ))}

            <Grid item xs={12} sm={6} md={6}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton
                        syle={{ width: 80 }}
                        component={Link}
                        to={'/dashboard/add'}
                        aria-label="add"
                    >
                        <AddIcon />
                    </IconButton>
                </div>
            </Grid>
        </Grid>
    );
}

export default withRouter(VehicleList);
