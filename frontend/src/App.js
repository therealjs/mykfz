'use strict';

import React from 'react';
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import UserService from './services/UserService';
import { UserSignupView } from './views/UserSignupView';
import { LandingPageView } from './views/LandingPageView';

import DashboardView from './views/DashboardView';
import UserVerificationView from './views/UserVerificationView';
import { LicensePlateReservationView } from './views/LicensePlateReservationView';
import { VehicleFormView } from './views/VehicleFormView';
import DistrictSignInSide from './components/DistrictSignInSide';
import SignInSide from './components/SignInSide';
import SignUpSide from './components/SignUpSide';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'MyKfz',
            routes: [
                {
                    render: (props) => {
                        if (UserService.isAuthenticated()) {
                            return <Redirect to={'/dashboard'} />;
                        } else {
                            return <Redirect to={'/landingPage'} />;
                        }
                    },
                    path: '/',
                    exact: true
                },
                {
                    render: (props) => {
                        if (UserService.isAuthenticated()) {
                            // Check here if district user
                            if (UserService.isVerified()) {
                                //if (UserService.isVerified()) {
                                return <DashboardView />;
                            } else {
                                // unverified regular user --> needs to verify first
                                return <Redirect to={'/verification'} />;
                            }
                        } else {
                            return <Redirect to={'/login'} />;
                        }
                    },
                    path: '/dashboard',
                    exact: false
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
                {
                    render: (props) => {
                        if (UserService.isAuthenticated()) {
                            return <UserVerificationView />;
                        } else {
                            return <Redirect to={'/login'} />;
                        }
                    },
                    path: '/verification'
                },

                //{ component: UserLoginView, path: '/login' },
                { component: DistrictSignInSide, path: '/districtLogin' },
                { component: SignInSide, path: '/login' },
                { component: SignUpSide, path: '/register' },
                //TODO Remove this
                { component: UserSignupView, path: '/signup' },
                { component: LandingPageView, path: '/landingPage' }
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
