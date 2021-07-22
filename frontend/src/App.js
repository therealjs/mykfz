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
import { DistrictLoginView } from './views/DistrictLoginView';
import { UserSignupView } from './views/UserSignupView';
import { LandingPageView } from './views/LandingPageView';

import DashboardView from './views/DashboardView';
import UserVerificationView from './views/UserVerificationView';
import { VehicleDetailView } from './views/VehicleDetailView';
import { VehicleRegisterView } from './views/VehicleRegisterView';
import { VehicleDeregisterView } from './views/VehicleDeregisterView';
import { LicensePlateReservationView } from './views/LicensePlateReservationView';
import { VehicleFormView } from './views/VehicleFormView';
import Dashboard from './components/Dashboard';
import SignInSide from './components/SignInSide';
import UserSignup from './components/UserSignup';

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
                            if (UserService.isVerified()) {
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
                { component: DistrictLoginView, path: '/districtLogin' },
                { component: SignInSide, path: '/login' },
                { component: UserSignupView, path: '/register' },
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
