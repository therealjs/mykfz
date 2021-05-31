"use strict";

import React from 'react';
import { Card, Button, TextField } from 'react-md';
import { withRouter } from 'react-router-dom';

import { AlertMessage } from './AlertMessage';
import Page from './Page';


const style = { maxWidth: 500 };


class UserSignup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            district: '',
            city: '',
            zipCode: '',
            street: '',
            houseNumber: '',
            idId: '',
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeDistrict = this.handleChangeDistrict.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.handleChangeZipCode = this.handleChangeZipCode.bind(this);
        this.handleChangeStreet = this.handleChangeStreet.bind(this);
        this.handleChangeHouseNumber = this.handleChangeHouseNumber.bind(this);

        this.handleChangeIdId = this.handleChangeIdId.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(value) {
        this.setState(Object.assign({}, this.state, {username: value}));
    }

    handleChangePassword(value) {
        this.setState(Object.assign({}, this.state, {password: value}));
    }

    handleChangeFirstName(value) {
        this.setState(Object.assign({}, this.state, {firstName: value}));
    }

    handleChangeLastName(value) {
        this.setState(Object.assign({}, this.state, {lastName: value}));
    }

    handleChangeDistrict(value) {
        this.setState(Object.assign({}, this.state, {district: value}));
    }

    handleChangeZipCode(value) {
        this.setState(Object.assign({}, this.state, {zipCode: value}));
    }

    handleChangeCity(value) {
        this.setState(Object.assign({}, this.state, {city: value}));
    }

    handleChangeStreet(value) {
        this.setState(Object.assign({}, this.state, {street: value}));
    }

    handleChangeHouseNumber(value) {
        this.setState(Object.assign({}, this.state, {houseNumber: value}));
    }

    handleChangeIdId(value) {
        this.setState(Object.assign({}, this.state, {idId: value}));
    }

    handleSubmit(event) {
        event.preventDefault();

        let user = {
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: {
                district: this.state.district,
                zipCode: this.state.zipCode,
                city: this.state.city,
                street: this.state.street,
                houseNumber: this.state.houseNumber,
            },
            identityDocument: {
                idId: this.state.idId,
            }
        };

        this.props.onSubmit(user);
    }

    render() {
        return (
            <Page>
                <Card style={style} className="md-block-centered">
                    <form className="md-grid" onSubmit={this.handleSubmit} onReset={() => this.props.history.goBack()}>
                        <TextField
                            label="Username"
                            id="UsernameField"
                            type="text"
                            className="md-row"
                            required={true}
                            value={this.state.username}
                            onChange={this.handleChangeUsername}
                            errorText="Username is required"/>
                        <TextField
                            label="Password"
                            id="PasswordField"
                            type="password"
                            className="md-row"
                            required={true}
                            value={this.state.password}
                            onChange={this.handleChangePassword}
                            errorText="Password is required"/>
                        <TextField
                            label="First Name"
                            id="FirstNameField"
                            type="text"
                            className="md-row"
                            required={true}
                            value={this.state.firstName}
                            onChange={this.handleChangeFirstName}
                            errorText="First Name is required"/>
                        <TextField
                            label="Last Name"
                            id="LastNameField"
                            type="text"
                            className="md-row"
                            required={true}
                            value={this.state.lastName}
                            onChange={this.handleChangeLastName}
                            errorText="Last Name is required"/>
                        <TextField
                            label="District"
                            id="DistrictField"
                            type="text"
                            className="md-row"
                            required={true}
                            value={this.state.district}
                            onChange={this.handleChangeDistrict}
                            errorText="District is required"/>
                        <TextField
                            label="City"
                            id="CityField"
                            type="text"
                            className="md-row"
                            required={true}
                            value={this.state.city}
                            onChange={this.handleChangeCity}
                            errorText="City is required"/>
                        <TextField
                            label="Zip Code"
                            id="ZipCodeField"
                            type="text"
                            className="md-row"
                            required={true}
                            value={this.state.zipCode}
                            onChange={this.handleChangeZipCode}
                            errorText="Zip Code is required"/>
                        <TextField
                            label="Street"
                            id="SteetField"
                            type="text"
                            className="md-row"
                            required={true}
                            value={this.state.street}
                            onChange={this.handleChangeStreet}
                            errorText="Street is required"/>
                        <TextField
                            label="House Number"
                            id="HouseNumberField"
                            type="text"
                            className="md-row"
                            required={true}
                            value={this.state.houseNumber}
                            onChange={this.handleChangeHouseNumber}
                            errorText="House Number is required"/>
                        <TextField
                            label="Id"
                            id="IdField"
                            type="text"
                            className="md-row"
                            required={true}
                            value={this.state.idId}
                            onChange={this.handleChangeIdId}
                            errorText="ID is required"/>
                        

                        <Button id="submit" type="submit"
                                disabled={this.state.username == undefined || this.state.username == '' || this.state.password == undefined || this.state.password == '' ? true : false}
                                raised primary className="md-cell md-cell--2">Register</Button>
                        <Button id="reset" type="reset" raised secondary className="md-cell md-cell--2">Dismiss</Button>
                        <AlertMessage className="md-row md-full-width" >{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
                    </form>
                </Card>
            </Page>
        );
    }
};

export default withRouter(UserSignup);