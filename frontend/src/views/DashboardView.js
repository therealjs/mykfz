'use strict';

import React from 'react';

import { VehicleList } from '../components/VehicleList';
import { Grid } from '@material-ui/core';

import Page from '../components/Page';
import VehicleService from '../services/VehicleService';
import UserService from '../services/UserService';
import LicensePlateService from '../services/LicensePlateService';
import { LicensePlateReservationList } from '../components/LicensePlateReservationList';

export class DashboardView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };
    }

    componentWillMount() {
        this.setState({
            loading: true
        });

        (async () => {
            try {
                let user = await UserService.getUserDetails();
                let vehicles = await VehicleService.getVehiclesForUser(
                    user._id
                );
                let licensePlateReservations = user.licensePlateReservations;

                for (let i = 0; i < licensePlateReservations.length; i++) {
                    let licensePlateReservation = licensePlateReservations[i];
                    const plateId = licensePlateReservation.licensePlate;
                    const plateObject =
                        await LicensePlateService.getLicensePlate(plateId);
                    licensePlateReservations[i].licensePlate = plateObject;
                }

                console.log(licensePlateReservations);
                console.log(vehicles);
                this.setState({
                    vehicles: vehicles,
                    licensePlateReservations: licensePlateReservations,
                    loading: false
                });
            } catch (err) {
                console.error(err);
            }
        })();

        // VehicleService.getVehicles()
        //   .then((data) => {
        //     this.setState({
        //       data: [...data],
        //       loading: false,
        //     });
        //   })
        //   .catch((e) => {
        //     console.error(e);
        //   });
    }

    // async deleteVehicle(id) {
    //     this.setState({
    //         data: [...this.state.data],
    //         loading: true
    //     });

    //     try {
    //         let ret = await VehicleService.deleteVehicle(id);
    //         let vehicleIndex = this.state.data
    //             .map((vehicle) => vehicle['_id'])
    //             .indexOf(id);
    //         let vehicles = this.state.data;
    //         vehicles.splice(vehicleIndex, 1);
    //         this.setState({
    //             data: [...vehicles],
    //             loading: false
    //         });
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    render() {
        if (this.state.loading) {
            return <h2>Loading...</h2>;
        }

        //return <h2>Done Loading</h2>

        return (
            <Page>
                <Grid
                    justify="flex-start"
                    container
                    direction="row"
                    alignItems="center"
                    spacing={3}
                >
                    <Grid item xs={12} sm={9}>
                        <VehicleList vehicles={this.state.vehicles} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <LicensePlateReservationList
                            licensePlateReservations={
                                this.state.licensePlateReservations
                            }
                        />
                    </Grid>
                </Grid>
            </Page>
        );
    }
}
