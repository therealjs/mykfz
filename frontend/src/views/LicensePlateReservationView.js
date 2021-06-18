'use strict';

import React from 'react';

import VehicleForm from '../components/VehicleForm';

import VehicleService from '../services/VehicleService';
import LicensePlateReservationForm from '../components/LicensePlateReservationForm';
import UserService from '../services/UserService';


export class LicensePlateReservationView extends React.Component {
    constructor(props) {
        super(props);
    }

    async updateUser(user) {
        await UserService.updateUser(user);
        this.props.history.push('/');
    }

    render() {
        return (
            <LicensePlateReservationForm
                onSubmit={(user) => this.updateUser(user)}
            />
        );
    }
}
