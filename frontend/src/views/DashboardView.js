'use strict';

import React from 'react';
import UserService from '../services/UserService';
import Dashboard from '../components/Dashboard';
import DistrictDashboard from '../components/DistrictDashboard';

export class DashboardView extends React.Component {
    render() {
        let isDistrictUser = UserService.isDistrictUser();

        if (isDistrictUser) {
            console.log('district user logged in');
            return <DistrictDashboard />;
        }
        console.log('normal user logged in');
        return <Dashboard />;
    }
}
