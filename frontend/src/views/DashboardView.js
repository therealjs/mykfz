'use strict';

import React from 'react';

import { VehicleList } from '../components/VehicleList';
import { Grid } from '@material-ui/core';

import Page from '../components/Page';
import VehicleService from '../services/VehicleService';
import UserService from '../services/UserService';
import LicensePlateService from '../services/LicensePlateService';
import { LicensePlateReservationList } from '../components/LicensePlateReservationList';
import Dashboard from '../components/Dashboard';
import DistrictDashboard from '../components/DistrictDashboard';

export class DashboardView extends React.Component {
    render() {
        if (UserService.isDistrictUser()) {
            return <DistrictDashboard />;
        }

        return <Dashboard />;
    }
}
