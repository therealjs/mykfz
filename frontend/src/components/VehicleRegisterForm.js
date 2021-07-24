import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import React, { useState, useEffect } from 'react';
import { withRouter, Link, useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import PaymentForm from './PaymentForm';
import ProcessDetailsForm from './ProcessDetailsForm';
import Review from './Review';
import VehicleService from '../services/VehicleService';
import UserService from '../services/UserService';
import LicensePlateService from '../services/LicensePlateService';

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
    },
    alert: {
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(1)
    }
}));

const steps = [
    'Process details',
    'Payment details',
    'Review your registration'
];

function isNumLet(input) {
    var re = /^[0-9a-zA-Z]+$/;
    return re.test(input);
}

/*
 * Returns 1 if the IBAN is valid
 * Returns FALSE if the IBAN's length is not as should be (for CY the IBAN Should be 28 chars long starting with CY )
 * Returns any other number (checksum) when the IBAN is invalid (check digits do not match)
 */
function isValidIBAN(input) {
    var CODE_LENGTHS = {
        AD: 24,
        AE: 23,
        AT: 20,
        AZ: 28,
        BA: 20,
        BE: 16,
        BG: 22,
        BH: 22,
        BR: 29,
        CH: 21,
        CR: 21,
        CY: 28,
        CZ: 24,
        DE: 22,
        DK: 18,
        DO: 28,
        EE: 20,
        ES: 24,
        FI: 18,
        FO: 18,
        FR: 27,
        GB: 22,
        GI: 23,
        GL: 18,
        GR: 27,
        GT: 28,
        HR: 21,
        HU: 28,
        IE: 22,
        IL: 23,
        IS: 26,
        IT: 27,
        JO: 30,
        KW: 30,
        KZ: 20,
        LB: 28,
        LI: 21,
        LT: 20,
        LU: 20,
        LV: 21,
        MC: 27,
        MD: 24,
        ME: 22,
        MK: 19,
        MR: 27,
        MT: 31,
        MU: 30,
        NL: 18,
        NO: 15,
        PK: 24,
        PL: 28,
        PS: 29,
        PT: 25,
        QA: 29,
        RO: 24,
        RS: 22,
        SA: 24,
        SE: 24,
        SI: 19,
        SK: 24,
        SM: 27,
        TN: 24,
        TR: 26,
        AL: 28,
        BY: 28,
        CR: 22,
        EG: 29,
        GE: 22,
        IQ: 23,
        LC: 32,
        SC: 31,
        ST: 25,
        SV: 28,
        TL: 23,
        UA: 29,
        VA: 22,
        VG: 24,
        XK: 20
    };
    var iban = String(input)
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, ''), // keep only alphanumeric characters
        code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/), // match and capture (1) the country code, (2) the check digits, and (3) the rest
        digits;
    // check syntax and length
    if (!code || iban.length !== CODE_LENGTHS[code[1]]) {
        return false;
    }
    // rearrange country code and check digits, and convert chars to ints
    digits = (code[3] + code[1] + code[2]).replace(/[A-Z]/g, function (letter) {
        return letter.charCodeAt(0) - 55;
    });
    // final check
    return mod97(digits);
}

function mod97(string) {
    var checksum = string.slice(0, 2),
        fragment;
    for (var offset = 2; offset < string.length; offset += 7) {
        fragment = String(checksum) + string.substring(offset, offset + 7);
        checksum = parseInt(fragment, 10) % 97;
    }
    return checksum;
}

function VehicleRegisterForm({ user }) {
    const classes = useStyles();
    let { vehicleId } = useParams();
    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeStep, setActiveStep] = useState(2);
    const [process, setProcess] = useState({
        processType: 'REGISTRATION',
        date: Date(),
        state: 'PENDING',
        info: {
            licensePlate: '',
            iban: '',
            evb: '',
            secCodeII: ''
        },
        isPaid: false,
        paymentDetails: {
            id: '4BC812161J077382N',
            intent: 'CAPTURE',
            status: 'COMPLETED',
            purchase_units: [
                {
                    reference_id: 'default',
                    amount: {
                        currency_code: 'EUR',
                        value: '27.00'
                    },
                    payee: {
                        email_address: 'sb-jl047v6558609@business.example.com',
                        merchant_id: '7C4HRZENSW7AN'
                    },
                    shipping: {
                        name: {
                            full_name: 'John Doe'
                        },
                        address: {
                            address_line_1: 'ESpachstr. 1',
                            admin_area_2: 'Freiburg',
                            admin_area_1: 'Baden-Württemberg',
                            postal_code: '79111',
                            country_code: 'DE'
                        }
                    },
                    payments: {
                        captures: [
                            {
                                id: '1TT40090DD055522X',
                                status: 'COMPLETED',
                                amount: {
                                    currency_code: 'EUR',
                                    value: '27.00'
                                },
                                final_capture: true,
                                seller_protection: {
                                    status: 'ELIGIBLE',
                                    dispute_categories: [
                                        'ITEM_NOT_RECEIVED',
                                        'UNAUTHORIZED_TRANSACTION'
                                    ]
                                },
                                create_time: '2021-07-24T15:50:12Z',
                                update_time: '2021-07-24T15:50:12Z'
                            }
                        ]
                    }
                }
            ],
            payer: {
                name: {
                    given_name: 'John',
                    surname: 'Doe'
                },
                email_address: 'sb-blx2y6554970@personal.example.com',
                payer_id: 'MKYQFMGSKQ2J8',
                address: {
                    country_code: 'DE'
                }
            },
            create_time: '2021-07-24T15:50:02Z',
            update_time: '2021-07-24T15:50:12Z',
            links: [
                {
                    href: 'https://api.sandbox.paypal.com/v2/checkout/orders/4BC812161J077382N',
                    rel: 'self',
                    method: 'GET'
                }
            ]
        }
    });

    const [vehicle, setVehicle] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const vehicleResult = await VehicleService.getVehicle(vehicleId);
            setVehicle(vehicleResult);
            setLoading(false);
        };

        fetchData();
    }, []);

    const onProcessPaid = (details, data) => {
        console.log(details, data);
        setProcess((prevState) => ({
            ...prevState,
            isPaid: true,
            paymentDetails: details
        }));
    };

    const onProcessChange = (e) => {
        const { name, value } = e.target;
        const processInfo = process.info;
        processInfo[name] = value;
        setProcess((prevState) => ({
            ...prevState,
            ['info']: processInfo
        }));
    };

    const handleNext = () => {
        console.log(process.info.licenseplate);
        if (
            process.info.secCodeII.length != 12 ||
            !isNumLet(process.info.secCodeII)
        ) {
            setErrorMessage('Provide a valid security code.');
            return;
        } else if (
            process.info.evb.length != 7 ||
            !isNumLet(process.info.evb)
        ) {
            setErrorMessage('Provide a valid eVB number.');
            return;
        } else if (!isValidIBAN(process.info.iban)) {
            setErrorMessage('Provide a valid IBAN.');
            return;
        } else {
            setActiveStep(activeStep + 1);
            setErrorMessage('');
        }
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
        if (!isSubmitting) {
            setIsSubmitting(true);
            await VehicleService.createProcess(vehicleId, process);

            // delete plate reservation
            await UserService.deleteLicensePlateReservationByPlate(
                user._id,
                process.info.licensePlate
            );
            // update ttl of licenseplate, increase to 10 years
            let newExpireAt = new Date();
            newExpireAt.setFullYear(newExpireAt.getFullYear() + 10);
            let chosenPlate = await LicensePlateService.getLicensePlate(
                process.info.licensePlate
            );
            chosenPlate.expireAt = newExpireAt;
            await LicensePlateService.updateLicensePlate(chosenPlate);
            setIsSubmitting(false);
            setActiveStep(activeStep + 1);
            // timer.current = window.setTimeout(() => {
            //     setSuccess(true);
            //     setLoading(false);
            // }, 2000);
        }
    };

    const isProcessComplete = (process) => {
        return (
            (process.processType == 'REGISTRATION' &&
                process.info.licensePlate &&
                process.info.evb &&
                process.info.iban &&
                process.info.secCodeII) ||
            (process.processType == 'DEREGISTRATION' &&
                process.info.secCodeI &&
                process.info.plateCode)
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
                        disabled={isSubmitting}
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
                                    Thank you for your request.
                                </Typography>
                                <Typography variant="subtitle1">
                                    An employee will review your information.
                                    You can see the state of your process on the
                                    dashboard.
                                </Typography>
                                <Button
                                    style={{ marginTop: '1em' }}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        history.push('/dashboard');
                                    }}
                                >
                                    Return To Dashboard
                                </Button>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <div className={classes.buttons}>
                                    {errorMessage && (
                                        <Grid
                                            className={classes.alert}
                                            item
                                            xs={12}
                                        >
                                            <Alert severity="error">
                                                {errorMessage}
                                            </Alert>
                                        </Grid>
                                    )}
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
