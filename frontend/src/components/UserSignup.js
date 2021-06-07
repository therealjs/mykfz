'use strict';

import React from 'react';
import {
    Grid,
    Card,
    TextField,
    ListItemAvatar,
    Avatar,
    ListItemText,
    InputLabel,
    MenuItem,
    Button,
    Typography
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withRouter, Link } from 'react-router-dom';
import DistrictService from '../services/DistrictService';

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
            districtOptions: [{name: ''}]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDistrictChange = this.handleDistrictChange.bind(this);

        DistrictService.getDistricts()
            .then((data) => {
                this.setState({districtOptions: data});
            })
            .catch((e) => {
              console.error(e);
            });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleDistrictChange(event, value) {
        this.setState({district: value});
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
                houseNumber: this.state.houseNumber
            },
            identityDocument: {
                idId: this.state.idId
            }
        };

        this.props.onSubmit(user);
    }

    render() {
        return (
            <Page>
                <Card style={{ padding: '20px', maxWidth: '500px' }}>
                    <form
                        onSubmit={this.handleSubmit}
                        onReset={() => this.props.history.goBack()}
                    >
                        <Typography
                            style={{ marginBottom: '10px' }}
                            component="h5"
                            variant="h5"
                        >
                            Login
                        </Typography>
                        <Grid
                            justify="space-between"
                            container
                            direction="row"
                            alignItems="center"
                            justify="center"
                            spacing={3}
                        >
                            <Grid item xs={12}>
                                <TextField
                                    label="Username"
                                    name="username"
                                    required={true}
                                    fullWidth
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Password"
                                    type="password"
                                    name="password"
                                    fullWidth
                                    required={true}
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="First Name"
                                    required={true}
                                    name="firstName"
                                    fullWidth
                                    value={this.state.firstName}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Last Name"
                                    required={true}
                                    name="lastName"
                                    fullWidth
                                    value={this.state.lastName}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={this.state.districtOptions}
                                    getOptionLabel={(option) => option.name}
                                    style={{ width: 300 }}
                                    name="district"
                                    required={true}
                                    fullWidth
                                    onChange={this.handleDistrictChange}
                                    renderInput={(params) => <TextField {...params} label="District" />}
                                />
                                {/* <Select
                                    label="District"
                                    value={this.state.district}
                                    required={true}
                                    fullWidth
                                    name="district"
                                    onChange={this.handleChange}
                                >
                                    {this.districtOptions.map((district) => {
                                        return (
                                            <MenuItem
                                                style={{ display: 'flex' }}
                                                value={district}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar
                                                        alt={district}
                                                        src="https://upload.wikimedia.org/wikipedia/commons/1/17/Muenchen_Kleines_Stadtwappen.svg"
                                                    />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    style={{
                                                        maerginTop: '8px'
                                                    }}
                                                    primary={district}
                                                />
                                            </MenuItem>
                                        );
                                    })}
                                </Select> */}
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    label="City"
                                    name="city"
                                    fullWidth
                                    required={true}
                                    value={this.state.city}
                                    onChange={this.handleChange}
                                    errortext="City is required"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Zip Code"
                                    name="zipCode"
                                    fullWidth
                                    required={true}
                                    value={this.state.zipCode}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Street"
                                    required={true}
                                    name="street"
                                    fullWidth
                                    value={this.state.street}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="House Number"
                                    name="houseNumber"
                                    fullWidth
                                    required={true}
                                    value={this.state.houseNumber}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Document Id"
                                    required={true}
                                    name="idId"
                                    fullWidth
                                    value={this.state.idId}
                                    onChange={this.handleChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    style={{
                                        float: 'right',
                                        marginLeft: '15px'
                                    }}
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    disabled={
                                        this.state.username.toString().length <
                                            4 ||
                                        this.state.password.toString().length <
                                            4
                                    }
                                >
                                    Register
                                </Button>
                                <Button
                                    component={Link}
                                    to={'/register'}
                                    style={{ float: 'right' }}
                                    variant="contained"
                                    type="reset"
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Card>
            </Page>
        );
    }
}

export default withRouter(UserSignup);
