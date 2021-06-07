'use strict';

import React from 'react';

import VehicleRegister from '../components/VehicleRegister';

import VehicleService from '../services/VehicleService';

export class VehicleRegisterView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (this.props.history.location.pathname == '/add') {
            this.setState({
                loading: false,
                vehicle: undefined,
                error: undefined
            });
        } else if (
            this.props.location.state != undefined &&
            this.props.location.state.vehicle != undefined
        ) {
            this.setState({
                loading: false,
                vehicle: this.props.location.state.vehicle,
                error: undefined
            });
        } else {
            this.setState({
                loading: true,
                error: undefined
            });

            let id = this.props.match.params.id;

            VehicleService.getVehicle(id)
                .then((data) => {
                    this.setState({
                        vehicle: data,
                        loading: false,
                        error: undefined
                    });
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    }

    async updateVehicle(vehicle) {
        if (this.state.vehicle == undefined) {
            try {
                let ret = await VehicleService.createVehicle(vehicle);
                this.props.history.push('/');
            } catch (err) {
                console.error(err);
                this.setState(
                    Object.assign({}, this.state, {
                        error: 'Error while creating vehicle'
                    })
                );
            }
        } else {
            try {
                let ret = await VehicleService.updateVehicle(vehicle);
                this.props.history.goBack();
            } catch (err) {
                console.error(err);
                this.setState(
                    Object.assign({}, this.state, {
                        error: 'Error while creating vehicle'
                    })
                );
            }
        }
    }

    render() {
        if (this.state.loading) {
            return <h2>Loading...</h2>;
        }

        return (
            <VehicleRegister
                vehicle={this.state.vehicle}
                onSubmit={(vehicle) => this.updateVehicle(vehicle)}
                error={this.state.error}
            />
        );
    }
}
