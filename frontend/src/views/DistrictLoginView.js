'use strict';

import React from 'react';

import DistrictLogin from '../components/DistrictLogin';

import UserService from '../services/UserService';

export class DistrictLoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async login(districtUser) {
        try {
            let ret = await UserService.districtLogin(
                districtUser.username,
                districtUser.password
            );
            this.props.history.push('/');
        } catch (err) {
            console.error(err);
            this.setState({
                error: err
            });
        }
    }

    render() {
        return (
            <DistrictLogin
                onSubmit={(districtUser) => this.login(districtUser)}
                error={this.state.error}
            ></DistrictLogin>
        );
    }
}
