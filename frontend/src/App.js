'use strict';

import React from 'react';
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import UserService from './services/UserService';
import { UserLoginView } from './views/UserLoginView';
import { UserSignupView } from './views/UserSignupView';
import { LandingPageView } from './views/LandingPageView';

import { DashboardView } from './views/DashboardView';
import { VehicleDetailView } from './views/VehicleDetailView';
import { VehicleRegisterView } from './views/VehicleRegisterView';
import { VehicleDeregisterView } from './views/VehicleDeregisterView';
import { LicensePlateReservationView } from './views/LicensePlateReservationView';
import { VehicleFormView } from './views/VehicleFormView';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'MyKfz',
            routes: [
                {
                    render: (props) => {
                        if (UserService.isAuthenticated()) {
                            return <DashboardView {...props} />;
                        } else {
                            return <Redirect to={'/login'} />;
                        }
                    },
                    path: '/login',
                    exact: true
                },
                {
                    render: (props) => {
                        if (UserService.isAuthenticated()) {
                            return <VehicleDetailView {...props} />;
                        } else {
                            return <Redirect to={'/login'} />;
                        }
                    },
                    path: '/show/:id'
                },
                {
                    render: (props) => {
                        if (UserService.isAuthenticated()) {
                            return <VehicleFormView {...props} />;
                        } else {
                            return <Redirect to={'/login'} />;
                        }
                    },
                    path: '/edit/:id'
                },
                {
                    render: (props) => {
                        if (UserService.isAuthenticated()) {
                            return <VehicleRegisterView {...props} />;
                        } else {
                            return <Redirect to={'/login'} />;
                        }
                    },
                    path: '/register/:id'
                },
                {
                    render: (props) => {
                        if (UserService.isAuthenticated()) {
                            return <VehicleDeregisterView {...props} />;
                        } else {
                            return <Redirect to={'/login'} />;
                        }
                    },
                    path: '/deregister/:id'
                },
                {
                    render: (props) => {
                        if (UserService.isAuthenticated()) {
                            return <VehicleFormView {...props} />;
                        } else {
                            return <Redirect to={'/login'} />;
                        }
                    },
                    path: '/addVehicle'
                },
                {
                    render: (props) => {
                        if (UserService.isAuthenticated()) {
                            return <LicensePlateReservationView {...props} />;
                        } else {
                            return <Redirect to={'/login'} />;
                        }
                    },
                    path: '/addLicensePlateReservation'
                },
                { component: LandingPageView, path: '/landingPage' },
                { component: LandingPageView, path: '/' },
                { component: UserLoginView, path: '/login' },
                { component: UserSignupView, path: '/register' }
            ]
        };
    }

    componentDidMount() {
        document.title = this.state.title;
    }

    render() {
        return (
            <Router>
                <Switch>
                    {this.state.routes.map((route, i) => (
                        <Route key={i} {...route} />
                    ))}
                </Switch>
            </Router>
        );
    }
}
