'use strict';

import React from 'react';
import UserService from '../services/UserService';
import Dashboard from '../components/Dashboard';
import DistrictDashboard from '../components/DistrictDashboard';

export class DashboardView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        UserService.isDistrictUser().then((isDistrictUser) =>
            this.setState({ isDistrictUser: isDistrictUser })
        );
    }

    render() {
        if (this.state.isDistrictUser) {
            return <DistrictDashboard />;
        }
        return <Dashboard />;
    }
}
