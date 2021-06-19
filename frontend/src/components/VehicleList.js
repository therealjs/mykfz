'use strict';

import React from 'react';
import { Link } from 'react-router-dom';

import { VehicleListPaper } from './VehicleListPaper';

import Page from './Page';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';


export const VehicleList = ({ vehicles }) => (
    <Grid
        justify="flex-start"
        container
        direction="row"
        alignItems="center"
        spacing={3}
    >
        {vehicles.map((vehicle, i) => (
            <VehicleListPaper
                key={i}
                vehicle={vehicle}
            />
        ))}

        <Grid item xs={12} sm={6} md={6}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton
                    syle={{ width: 80 }}
                    component={Link}
                    to={'/addVehicle'}
                    aria-label="add"
                >
                    <AddIcon />
                </IconButton>
            </div>
        </Grid>
    </Grid>
);
