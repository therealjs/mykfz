'use strict';

import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React, { useEffect, useState } from 'react';
import LicensePlateService from '../services/LicensePlateService';
import UserService from '../services/UserService';
import ProcessService from '../services/ProcessService';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PrintIcon from '@material-ui/icons/Print';

const VehiclesTableRow = ({ vehicle }) => {
    const [owner, setOwner] = useState({});
    const [open, setOpen] = useState(false);
    const [licensePlate, setLicensePlate] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const user = await UserService.getUser(vehicle.owner);
            setOwner(user);

            if (vehicle.licensePlate) {
                const licensePlate = await LicensePlateService.getLicensePlate(
                    vehicle.licensePlate
                );

                setLicensePlate(licensePlate);
            }
        };

        fetchData();
    }, []);

    return (
        <React.Fragment>
            <TableRow key={vehicle.vin}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {vehicle.vin}
                </TableCell>
                <TableCell align="right">
                    {owner.firstName} {owner.lastName}
                </TableCell>
                <TableCell align="right">{vehicle.make}</TableCell>
                <TableCell align="right">{vehicle.model}</TableCell>
                <TableCell align="right">
                    <Chip
                        label={
                            vehicle.state == 'REGISTERED'
                                ? LicensePlateService.asString(licensePlate)
                                : vehicle.state
                        }
                        color={
                            vehicle.state == 'REGISTERED'
                                ? 'primary'
                                : 'default'
                        }
                    />
                </TableCell>
            </TableRow>
            <CollapsibleRow
                vehicleId={vehicle._id}
                processes={vehicle.processes}
                open={open}
            />
        </React.Fragment>
    );
};

const CollapsibleRow = ({ vehicleId, processes, open }) => {
    return (
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                        <Typography variant="h6" gutterBottom component="div">
                            Processes
                        </Typography>
                        <ProcessesTable
                            vehicleId={vehicleId}
                            processes={processes}
                        />
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    );
};

const ProcessesTable = ({ vehicleId, processes }) => {
    console.log(processes);

    return (
        <Table size="small" aria-label="purchases">
            <TableHead>
                <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Details</TableCell>
                    <TableCell align="right">Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {processes.map((process) => (
                    <ProcessesTableRow
                        vehicleId={vehicleId}
                        process={process}
                    />
                ))}
            </TableBody>
        </Table>
    );
};

const ProcessesTableRow = ({ vehicleId, process }) => {
    return (
        <TableRow key={process._id}>
            <TableCell component="th" scope="row">
                {process.processType}
            </TableCell>
            <TableCell>{process.date}</TableCell>
            <TableCell align="right">
                <ProcessDetailsCell vehicleId={vehicleId} process={process} />
            </TableCell>
            <TableCell align="right">
                {process.state == 'NEW' ? (
                    <ButtonGroup variant="contained">
                        <Button>ACCEPT</Button>
                        <Button>REJECT</Button>
                    </ButtonGroup>
                ) : (
                    <Chip label={process.state} />
                )}
            </TableCell>
        </TableRow>
    );
};

const ProcessDetailsCell = ({ vehicleId, process }) => {
    const createPdfAndDownload = () => {
        (async () => {
            try {
                await ProcessService.generateProcessStatusPDF(
                    vehicleId,
                    process._id
                );
            } catch (err) {
                console.error(err);
            }
        })();
    };

    return (
        <IconButton onClick={createPdfAndDownload}>
            <PrintIcon />
        </IconButton>
    );
};

export default function VehiclesTable({ vehicles }) {
    return (
        <div>
            <h2>Vehicles</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>VIN</TableCell>
                            <TableCell align="right">Owner</TableCell>
                            <TableCell align="right">Make</TableCell>
                            <TableCell align="right">Model</TableCell>
                            <TableCell align="right">
                                Registration State
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vehicles.map((vehicle) => (
                            <VehiclesTableRow
                                key={vehicle.vin}
                                vehicle={vehicle}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
