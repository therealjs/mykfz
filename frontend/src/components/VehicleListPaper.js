'use strict';

import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import LicensePlate from './LicensePlate';

import LicensePlateService from '../services/LicensePlateService';
import { CardMedia } from '@material-ui/core';

export class VehicleListPaper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            licensePlate: '',
        };
    }

    componentWillMount(props) {
        (async () => {
            try {
                let licensePlate = await LicensePlateService.getLicensePlate(
                    this.props.vehicle.licensePlate
                );
                this.setState({
                    licensePlate: licensePlate.areaCode + " - " +  licensePlate.letters + " " + licensePlate.digits
                });
                console.log(this.state.licensePlate)
            } catch (err) {
                console.error(err);
            }
        })();
    }

    render() {
        console.log(this.props.vehicle.licensePlate)
        return (
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar
                                aria-label="make"
                                src="https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg"
                            />
                        }
                        action={
                            <IconButton
                                component={Link}
                                to={`/edit/${this.props.vehicle._id}`}
                            >
                                <EditIcon />
                            </IconButton>
                        }
                        title={
                            this.props.vehicle.make +
                            ' ' +
                            this.props.vehicle.model
                        }
                        subheader={this.props.vehicle.vin}
                    />
                    {this.props.vehicle.licensePlate ?
                        <LicensePlate licensePlate = {this.state.licensePlate}/>
                        : []
                    }
                    <CardActions
                        disableSpacing
                        style={{ justifyContent: 'center', padding: '15px' }}
                    >
                        {this.renderProcess(this.props.vehicle.state)}
                    </CardActions>
                </Card>
            </Grid>
        );
    }

    renderProcess(state) {
        switch (state) {
            case 'NEW':
                return (
                    <Button
                        variant="contained"
                        component={Link}
                        to={`/register/${this.props.vehicle._id}`}
                    >
                        Register
                    </Button>
                );
            case 'REGISTERED':
                return (
                    <Button
                        variant="contained"
                        component={Link}
                        to={`/deregister/${this.props.vehicle._id}`}
                    >
                        Deregister
                    </Button>
                );
            case 'DEREGISTERED':
                return (
                    <Button
                        variant="contained"
                        component={Link}
                        to={`/register/${this.props.vehicle._id}`}
                    >
                        Reregister
                    </Button>
                );
        }
    }
}
