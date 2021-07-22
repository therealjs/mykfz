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
    Typography,
    TableFooter,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Radio
} from '@material-ui/core';

import LicensePlate from './LicensePlate';

import Pagination from '@material-ui/lab/Pagination';

import { withRouter } from 'react-router-dom';

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
            page: 0,
            rowsPerPage: 10,
            areaCodeOptions: [],
            queriedLicensePlates: [],
            selectedPlate: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSelection = this.handleChangeSelection.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentWillMount(props) {
        this.setState({
            loading: true
        });
        (async () => {
            try {
                let user = await UserService.getUserDetails();
                let district = await DistrictService.getDistrict(
                    user.address.district
                );
                this.setState({
                    user: user,
                    areaCodeOptions: district.areaCode
                });
            } catch (err) {
                console.error(err);
            }
        })();
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleChangePage(event) {
        this.setState({ page: event.target.value });
    }

    handleChangeRowsPerPage(event) {
        this.setState({ rowsPerPage: event.target.value, page: 0 });
    }

    handleChangeSelection(event) {
        this.setState({ selectedPlate: event.target.value });
        console.log(this.state.queriedLicensePlates);
        let id = this.state.selectedPlate;
    }

    handleSearch(event) {
        event.preventDefault();
        const query = {
            areaCode: this.state.areaCode,
            letters: this.state.letters,
            digits: this.state.digits
        };
        (async () => {
            try {
                const queriedPlates =
                    await LicensePlateService.getAvailableLicensePlates(query);
                this.setState({
                    queriedLicensePlates: queriedPlates
                });
            } catch (err) {
                console.error('No License Plates found');
            }
        })();
    }

    handleSubmit(event) {
        event.preventDefault();

        let user = this.state.user;
        let id = this.state.selectedPlate;

        const licensePlate = this.state.queriedLicensePlates[id];

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
        })().then(async () => {
            const reservation = await UserService.createLicensePlateReservation(
                user._id,
                this.state.newLicensePlate,
                30
            );
            this.props.history.push('/dashboard/plates');
        });
    }

    render() {
        return (
            <Grid
                justify="space-between"
                container
                direction="column"
                alignItems="center"
                justify="center"
                spacing={3}
            >
                <Grid item xs={12}>
                    <form
                        onSubmit={this.handleSearch}
                        onReset={() => this.props.history.goBack()}
                    >
                        <Card style={{ padding: '20px', maxWidth: '500px' }}>
                            <Typography
                                style={{ marginBottom: '10px' }}
                                component="h5"
                                variant="h5"
                            >
                                New Licenseplate Reservation
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
                                        <FormControl
                                            variant="outlined"
                                            style={{ width: '80px' }}
                                        >
                                            <InputLabel>
                                                {String('Area')}
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
                                                variant="outlined"
                                                label="Letters"
                                                required={true}
                                                name="letters"
                                                value={this.state.letters}
                                                // ToDo add regex

                                                onChange={this.handleChange}
                                                inputProps={{
                                                    maxLength: 2,
                                                    style: {
                                                        textTransform:
                                                            'uppercase'
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormControl style={{ width: '80px' }}>
                                            <TextField
                                                variant="outlined"
                                                label="Digits"
                                                required={true}
                                                name="digits"
                                                value={this.state.digits}
                                                onChange={this.handleChange}
                                                inputProps={{ maxLength: 4 }}
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
                                        Search
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
                        </Card>
                    </form>
                </Grid>
                {this.state.queriedLicensePlates ? (
                    <Grid item xs={12}>
                        <Card>
                            <TableBody>
                                {this.state.queriedLicensePlates.map(
                                    (plate, index) => (
                                        <TableRow>
                                            <TableCell padding="checkbox">
                                                <Radio
                                                    value={index}
                                                    defaultSelected={false}
                                                    checked={
                                                        index !=
                                                        this.state.selectedPlate
                                                            ? false
                                                            : true
                                                    }
                                                    onChange={
                                                        this
                                                            .handleChangeSelection
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <LicensePlate
                                                    licensePlate={plate}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[
                                            5,
                                            10,
                                            25,
                                            { label: 'All', value: -1 }
                                        ]}
                                        colSpan={3}
                                        count={
                                            this.state.queriedLicensePlates
                                                .length
                                        }
                                        rowsPerPage={this.state.rowsPerPage}
                                        page={this.state.page}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={
                                            this.handleChangeRowsPerPage
                                        }
                                        //ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                            <Button type="submit" onClick={this.handleSubmit}>
                                Reserve
                            </Button>
                        </Card>
                    </Grid>
                ) : (
                    []
                )}
            </Grid>
        );
    }
}

export default withRouter(LicensePlateReservationForm);
