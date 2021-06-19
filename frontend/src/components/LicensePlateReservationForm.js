'use strict';

import React from 'react';
import {
    Grid,
    Card,
    TextField,
    InputLabel,
    Select,
    MenuItem,
    Button,
    FormGroup,
    FormControl,
    Typography
} from '@material-ui/core';

import { withRouter } from 'react-router-dom';

import Page from './Page';
import UserService from '../services/UserService';
import DistrictService from '../services/DistrictService';
import LicensePlateService from '../services/LicensePlateService';

class LicensePlateReservationForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            areaCode: '',
            letters: '',
            digits: '',
            areaCodeOptions: [],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount(props) {
        this.setState({
            loading: true
        });
        (async () => {
            try {
                let user = await UserService.getUserDetails();
                console.log(user);
                let district = await DistrictService.getDistrict(
                    user.address.district
                );
                console.log(district);
                this.setState({
                    user: user,
                    areaCodeOptions: district.areaCode
                });
                console.log(this.state.areaCodeOptions);
            } catch (err) {
                console.error(err);
            }
        })();
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        let user = this.state.user;

        const licensePlate = {
            areaCode: this.state.areaCode,
            digits: this.state.digits,
            letters: this.state.letters
        };

        (async () => {
            try {
                const validatedPlate =
                    await LicensePlateService.createLicensePlate(licensePlate);
                this.setState({
                    newLicensePlate: validatedPlate._id
                });
            } catch (err) {
                console.error(err);
            }
        })().then(() => {
            user.licensePlateReservations.push({
                licensePlate: this.state.newLicensePlate,
                expiryDate: new Date(),
            });
            this.props.onSubmit(user);
        });
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
                            New LicensePlateReservation
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
                                <FormGroup
                                    row
                                    style={{
                                        justifyContent: 'space-between',
                                        padding: '20px',
                                        paddingLeft: '20%',
                                        height: '120px',
                                        backgroundImage: `url(${'https://t3.ftcdn.net/jpg/00/11/79/08/240_F_11790850_Gi4UC9cwGMUMGWtZhSP4yKpFg3tqlPis.jpg'})`,
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                >
                                    <FormControl style={{ width: '80px' }}>
                                        <InputLabel>
                                            {String('District')}
                                        </InputLabel>

                                        <Select
                                            value={this.state.areaCode}
                                            required={true}
                                            name="areaCode"
                                            onChange={this.handleChange}
                                        >
                                            {this.state.areaCodeOptions.map(
                                                (areaCode) => {
                                                    return (
                                                        <MenuItem
                                                            value={areaCode}
                                                        >
                                                            {areaCode}
                                                        </MenuItem>
                                                    );
                                                }
                                            )}
                                            ;
                                        </Select>
                                    </FormControl>
                                    <FormControl style={{ width: '80px' }}>
                                        <TextField
                                            label="Letters"
                                            required={true}
                                            name="letters"
                                            value={this.state.letters}
                                            // ToDo add regex
                                            onChange={this.handleChange}
                                            inputProps={{ maxLength: 2 }}
                                        />
                                    </FormControl>
                                    <FormControl style={{ width: '80px' }}>
                                        <TextField
                                            label="digits"
                                            required={true}
                                            name="digits"
                                            type="number"
                                            value={this.state.digits}
                                            onChange={this.handleChange}
                                            inputProps={{ maxLength: 3 }}
                                        />
                                    </FormControl>
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    style={{
                                        float: 'right',
                                        marginLeft: '15px'
                                    }}
                                    id="submit"
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                >
                                    Reserve
                                </Button>
                                <Button
                                    style={{ float: 'right' }}
                                    id="reset"
                                    type="reset"
                                    color="default"
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

export default withRouter(LicensePlateReservationForm);
