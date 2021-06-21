'use strict';

import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
    Button,
    Card,
    CardHeader,
    CardActions,
    CardContent,
    Collapse,
    Grid,
    IconButton
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import LicensePlate from './LicensePlate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

import LicensePlateService from '../services/LicensePlateService';

const makeLogos = require('../../resources/carLogos');

const styles = (theme) => ({
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: 'rotate(180deg)'
    }
});

class VehicleListPaper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            licensePlate: {
                areaCode: '  ',
                digits: '  ',
                letters: '  '
            },
            expanded: false
        };
        this.handleExpandClick = this.handleExpandClick.bind(this);
    }

    componentWillMount(props) {
        (async () => {
            try {
                if (this.props.vehicle.licensePlate) {
                    let licensePlate =
                        await LicensePlateService.getLicensePlate(
                            this.props.vehicle.licensePlate
                        );
                    this.setState({
                        licensePlate: licensePlate
                    });
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }

    handleExpandClick() {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid item xs={12} sm={6} md={6}>
                <Card
                    style={{
                        display: 'flex',
                        justiyContent: 'space-between',
                        flexDirection: 'column'
                    }}
                >
                    <CardHeader
                        avatar={
                            <Avatar
                                //variant="square"
                                aria-label="make"
                                src={makeLogos[this.props.vehicle.make]}
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
                    {
                        <CardContent>
                            <LicensePlate
                                licensePlate={this.state.licensePlate}
                            />
                        </CardContent>
                    }
                    <CardActions
                        disableSpacing
                        style={{ alignContent: 'center' }}
                    >
                        {this.renderProcess(this.props.vehicle.state)}
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: this.state.expanded
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                            minutes.
                        </CardContent>
                    </Collapse>
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

VehicleListPaper.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(VehicleListPaper);
