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
import PrintIcon from '@material-ui/icons/Print';
import LicensePlate from './LicensePlate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import LicensePlateService from '../services/LicensePlateService';
import ProcessService from '../services/ProcessService';
import Chip from '@material-ui/core/Chip';
import VehicleEditDialog from './VehicleEditDialog';

const makeLogos = require('../../resources/carLogos');

const styles = (theme) => ({
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest
        }),
        willChange: 'transform, box-shadow, z-index'
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
            expanded: false,
            editOpen: false
        };
        this.handleExpandClick = this.handleExpandClick.bind(this);
        this.createPdfAndDownload = this.createPdfAndDownload.bind(this);
        this.handleEditClose = this.handleEditClose.bind(this);
        this.handleEditOpen = this.handleEditOpen.bind(this);
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

    createPdfAndDownload(processId) {
        (async () => {
            try {
                await ProcessService.generateProcessStatusPDF(
                    this.props.vehicle._id,
                    processId
                );
            } catch (err) {
                console.error(err);
            }
        })();
    }

    handleEditOpen() {
        this.setState({ editOpen: true });
    }

    handleEditClose() {
        this.setState({ editOpen: false });
        this.props.onChange();
    }

    hasPendingProcesses(vehicle) {
        return vehicle.processes.some((p) => p.state == 'PENDING');
    }

    hasValidGeneralInspection(vehicle) {
        return (
            vehicle.generalInspectionYear &&
            vehicle.generalInspectionYear &&
            (vehicle.generalInspectionYear > new Date().getFullYear() || // größeres Jahr
                (vehicle.generalInspectionYear == new Date().getFullYear() &&
                    vehicle.generalInspectionMonth >= new Date().getMonth())) // gleiches Jahr und minestens gleicher Monat
        );
    }

    render() {
        const { classes, vehicle } = this.props;
        const cardContent =
            vehicle.state == 'REGISTERED' ? (
                <LicensePlate
                    vehicleState={vehicle.state}
                    licensePlate={this.state.licensePlate}
                />
            ) : (
                <LicensePlate vehicleState={vehicle.state} />
            );

        const state_colors = {
            PENDING: 'yellow',
            ACCEPTED: 'lightgreen',
            REJECTED: 'lightsalmon'
        };

        const deregisterButton = (
            <Button
                style={{ marginLeft: 'auto' }}
                variant="contained"
                component={Link}
                to={`/dashboard/vehicles/${this.props.vehicle._id}/deregister`}
            >
                Deregister
            </Button>
        );

        const registerButton = (
            <Button
                style={{ marginLeft: 'auto' }}
                variant="contained"
                component={Link}
                to={`/dashboard/vehicles/${this.props.vehicle._id}/register`}
            >
                Register
            </Button>
        );

        const giInvalidButton = (
            <Button
                style={{ marginLeft: 'auto' }}
                variant="contained"
                disabled={true}
            >
                General Inspection Invalid
            </Button>
        );

        const processPendingButton = (
            <Button
                style={{ marginLeft: 'auto' }}
                variant="contained"
                disabled={true}
            >
                Process Pending
            </Button>
        );

        const processButton = this.hasPendingProcesses(vehicle)
            ? processPendingButton
            : vehicle.state == 'REGISTERED'
            ? deregisterButton
            : this.hasValidGeneralInspection(vehicle)
            ? registerButton
            : giInvalidButton;

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
                                src={makeLogos[vehicle.make]}
                            />
                        }
                        action={
                            <IconButton onClick={this.handleEditOpen}>
                                <EditIcon />
                            </IconButton>
                        }
                        title={vehicle.make + ' ' + vehicle.model}
                        subheader={vehicle.vin}
                    />
                    <VehicleEditDialog
                        vehicle={vehicle}
                        open={this.state.editOpen}
                        handleClose={this.handleEditClose}
                    />
                    <CardContent
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        {cardContent}
                        <Chip
                            style={{
                                marginTop: '1em',
                                width: '200px',
                                justifyContent: 'space-between'
                            }}
                            color={
                                this.hasValidGeneralInspection(vehicle)
                                    ? 'primary'
                                    : 'secondary'
                            }
                            label={`${vehicle.generalInspectionMonth} / ${vehicle.generalInspectionYear}`}
                            avatar={
                                <Avatar src="https://www.kues-fahrzeugueberwachung.de/wordpress/wp-content/uploads/2018/09/hu-plakette-gelb.png" />
                            }
                            // onClick={this.handleEditOpen}
                            onDelete={this.handleEditOpen}
                            deleteIcon={<EditIcon />}
                        />
                    </CardContent>
                    <CardActions
                        disableSpacing
                        style={{ alignContent: 'center' }}
                    >
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
                        {processButton}
                    </CardActions>
                    <Collapse
                        in={this.state.expanded}
                        timeout="auto"
                        unmountOnExit
                    >
                        <CardContent>
                            <Table
                                className={classes.table}
                                aria-label="simple table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Process type</TableCell>
                                        <TableCell align="right">
                                            Submission Date
                                        </TableCell>
                                        <TableCell align="right">
                                            State
                                        </TableCell>
                                        <TableCell>Print</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {vehicle.processes.map((process) => (
                                        <TableRow key={process._id}>
                                            <TableCell scope="row">
                                                {process.processType}
                                            </TableCell>
                                            <TableCell align="right">
                                                {new Date(
                                                    Date.parse(process.date)
                                                ).toLocaleString('de-DE', {
                                                    timeZone: 'UTC'
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    style={{
                                                        backgroundColor:
                                                            state_colors[
                                                                process.state
                                                            ]
                                                    }}
                                                    label={process.state}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    onClick={() =>
                                                        this.createPdfAndDownload(
                                                            process._id
                                                        )
                                                    }
                                                >
                                                    <PrintIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Collapse>
                </Card>
            </Grid>
        );
    }
}

VehicleListPaper.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(VehicleListPaper);
