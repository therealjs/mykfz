import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { useParams } from 'react-router-dom';
import PaymentForm from './PaymentForm';
import ProcessDetailsForm from './ProcessDetailsForm';
import Review from './Review';
import VehicleService from '../services/VehicleService';
import UserService from '../services/UserService';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative'
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3)
        }
    },
    stepper: {
        padding: theme.spacing(3, 0, 5)
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1)
    }
}));

const steps = [
    'Process details',
    'Payment details',
    'Review your registration'
];

function VehicleRegisterForm() {
    const classes = useStyles();
    let { vehicleId } = useParams();

    const [loading, setLoading] = useState(true);
    const [activeStep, setActiveStep] = useState(0);
    const [process, setProcess] = useState({
        processType: 'REGISTRATION',
        licensePlate: '',
        iban: '',
        evb: '',
        secCodeII: '',
        isPaid: false
    });

    const [vehicle, setVehicle] = useState({});
    const [user, setUser] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const vehicleResult = await VehicleService.getVehicle(vehicleId);
            const userResult = await UserService.getUserDetails();
            setUser(userResult);
            setVehicle(vehicleResult);
            setLoading(false);
        };

        fetchData();
    }, []);

    const onProcessPaid = () => {
        setProcess((prevState) => ({
            ...prevState,
            ['isPaid']: true
        }));
    };

    const onProcessChange = (e) => {
        const { name, value } = e.target;
        setProcess((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <ProcessDetailsForm
                        user={user}
                        process={process}
                        onProcessChange={onProcessChange}
                        vehicle={vehicle}
                    />
                );
            case 1:
                return (
                    <PaymentForm
                        process={process}
                        onProcessPaid={onProcessPaid}
                    />
                );
            case 2:
                return <Review vehicle={vehicle} process={process} />;
            default:
                throw new Error('Unknown step');
        }
    };

    const handleSubmit = async () => {
        // delete used plate
        // TODO what to do if process is rejected?
        const deletedPlateReservation =
            await LicensePlateService.deleteLicensePlateReservation(
                user._id,
                process.licensePlate
            );
    };

    const isProcessComplete = (process) => {
        return (
            process.processType &&
            process.licensePlate &&
            process.evb &&
            process.iban &&
            process.secCodeII
        );
    };

    const getStepButton = (step) => {
        switch (step) {
            case 0:
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!isProcessComplete(process)}
                        onClick={handleNext}
                        className={classes.button}
                    >
                        Next
                    </Button>
                );
            case 1:
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!process.isPaid}
                        onClick={handleNext}
                        className={classes.button}
                    >
                        Next
                    </Button>
                );
            case 2:
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        className={classes.button}
                    >
                        Complete Registration
                    </Button>
                );
            default:
                throw new Error('Unknown step');
        }
    };

    if (loading) {
        return <h2>Loading</h2>;
    }

    return (
        <React.Fragment>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Register Vehicle
                    </Typography>
                    <Stepper
                        activeStep={activeStep}
                        className={classes.stepper}
                    >
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thank you for your order.
                                </Typography>
                                <Typography variant="subtitle1">
                                    Your process number is #2001539. An employee
                                    will review your information. You can see
                                    the state of your process on the dashboard.
                                </Typography>
                                <Button>Return To Dashboard</Button>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <div className={classes.buttons}>
                                    {activeStep !== 0 && (
                                        <Button
                                            onClick={handleBack}
                                            className={classes.button}
                                        >
                                            Back
                                        </Button>
                                    )}
                                    {getStepButton(activeStep)}
                                    {/* <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1
                                            ? 'Complete Registration'
                                            : 'Next'}
                                    </Button> */}
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}

export default withRouter(VehicleRegisterForm);
