import React, { useState, useEffect, useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Tooltip, InputAdornment } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import UserService from '../services/UserService';
import { useHistory } from 'react-router-dom';
import Copyright from './Copyright';
import DistrictService from '../services/DistrictService';
import SecurityIcon from '@material-ui/icons/Security';
import InfoIcon from '@material-ui/icons/Info';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Checkmark } from 'react-checkmark';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh'
    },
    image: {
        backgroundImage:
            'url(https://www.anytimeholidays.com.my/wp-content/uploads/2019/01/rental-car-facebook.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light'
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'right'
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    buttonSuccess: {
        backgroundColor: '#7ac142',
        '&:hover': {
            backgroundColor: '#7ac142'
        }
    }
}));

const LightTooltip = withStyles(() => ({
    tooltip: {
        backgroundColor: '#175B8E',
        color: 'white',
        fontSize: 14,
        fontFamily: 'Nunito'
    }
}))(Tooltip);

function validateEmail(email) {
    var re =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(email);
}

function isnum(input) {
    var re = /^\d+$/;
    return re.test(input);
}

function isletter(input) {
    var re = /^[a-zA-ZäöüÄÖÜ -]+$/i;
    return re.test(input);
}

function isNumLet(input) {
    var re = /^[0-9a-zA-Z]+$/;
    return re.test(input);
}

export default function SignUpSide(props) {
    let history = useHistory();
    const classes = useStyles();
    const [account, setAccount] = useState({
        username: '',
        password: '',
        passwordRepeat: '',
        firstName: '',
        lastName: '',
        district: '',
        zipCode: '',
        city: '',
        street: '',
        houseNumber: '',
        idId: ''
    });
    const [districtLogo, setDistrictLogo] = useState(null);
    const [districtOptions, setDistrictOptions] = useState([]);
    const [open, setOpen] = useState(false);
    const [accepted, setAccepted] = useState(false);
    const descriptionElementRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const districtData = await DistrictService.getDistricts();
            setDistrictOptions(districtData);
            console.log(districtData);
        };

        fetchData();
        console.log(districtOptions);
    }, []);

    const handleClickOpen = () => {
        setAccepted(false);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAccept = () => {
        setAccepted(true);
        setOpen(false);
    };

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        account[name] = value;
        setAccount(account);
    };

    const handleDistrictChange = (e, value) => {
        account.district = value._id;
        setDistrictLogo(value.picture);
    };

    const register = (e) => {
        e.preventDefault();
        console.log(validateEmail(account.username));

        if (!validateEmail(account.username) || account.username.length < 5) {
            setErrorMessage('Please provide a valid email address.');
            return;
        }
        if (account.password.length < 4) {
            setErrorMessage(
                'Your password is not valid. It requires at least 4 characters.'
            );
            return;
        } else {
            {
                if (account.password != account.passwordRepeat) {
                    setErrorMessage(
                        'Your passwords do not match. Please correct your repeat password.'
                    );
                    return;
                }
            }
        }
        if (account.firstName.length < 2 || !isletter(account.firstName)) {
            setErrorMessage('Please fill in your first name.');
            return;
        }
        if (account.lastName.length < 2 || !isletter(account.lastName)) {
            setErrorMessage('Please fill in your last name');
            return;
        }
        if (account.district === '') {
            setErrorMessage('Please select your district.');
            return;
        }
        if (account.city.length < 2 || !isletter(account.city)) {
            setErrorMessage('Please provide your city.');
            return;
        }
        if (account.idId === '' || !isNumLet(account.idId)) {
            setErrorMessage(
                'Please type in your identity document information.'
            );
            return;
        }
        if (
            account.houseNumber > 999 ||
            account.houseNumber < 0 ||
            account.houseNumber.length == 0 ||
            !isnum(account.houseNumber)
        ) {
            setErrorMessage('Please provide your correct housenumber.');
            return;
        }
        if (account.zipCode.length != 5 || !isnum(account.zipCode)) {
            setErrorMessage(
                'Please provide your correct zip code. It consists of 5 digits.'
            );
            return;
        }
        if (account.street.length < 3) {
            setErrorMessage(
                'Please provide your correct street. It consists of at least 3 characters.'
            );
            return;
        }
        if (account.idId < 4) {
            setErrorMessage(
                'Please type in your identity document information.'
            );
            return;
        }

        let user = {
            username: account.username,
            password: account.password,
            firstName: account.firstName,
            lastName: account.lastName,
            address: {
                district: account.district,
                zipCode: account.zipCode,
                city: account.city,
                street: account.street,
                houseNumber: account.houseNumber
            },
            identityDocument: {
                idId: account.idId
            },
            isDistrictUser: false
        };

        try {
            UserService.register(user)
                .then(() => {
                    history.push('/');
                })
                .catch((error) => {
                    if (error == 'Failed to fetch') {
                        setErrorMessage(
                            'Login is currently not possible due to a server error, we are working on a solution.'
                        );
                    } else {
                        if (error == 'User exists') {
                            setErrorMessage(
                                'This user already exits, if it is your account please log in via the login form, if not contact the customer service.'
                            );
                        } else {
                            console.log(error);
                            setErrorMessage(
                                'There is an issue with the register process, please contact the customer service.'
                            );
                        }
                    }
                });
        } catch (err) {
            console.error(err);
        }
    };

    const PrivacyDialog = () => {
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">
                    Privacy Statement
                </DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {[...new Array(40)]
                            .map(
                                () => `Lorem Ipsum Datenschutzus, , consetetur sadipscing elitr, sed diam nonumy eirmod 
                    tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos 
                    et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata 
                    sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing 
                    elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
                    sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita 
                    kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`
                            )
                            .join('\n')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAccept} color="primary">
                        Accept
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    const PrivacyButton = () => {
        if (accepted)
            return (
                <Grid
                    container
                    alignItems="center"
                    spacing={1}
                    justify="center"
                >
                    <Grid item>
                        <Checkmark size="48px" className={classes.submit} />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.buttonSuccess}
                            onClick={handleClickOpen}
                        >
                            Accepted
                        </Button>
                    </Grid>
                </Grid>
            );
        else
            return (
                <Grid
                    container
                    alignItems="center"
                    spacing={1}
                    justify="center"
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick={handleClickOpen}
                        startIcon={<SecurityIcon />}
                    >
                        Read Privacy
                    </Button>
                </Grid>
            );
    };
    const tooltipImgTxt = (
        <div>
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                spacing={1}
            >
                <Grid item>
                    <label>
                        To check your identity we need your identity document
                        number. You can find it on the top right of your id.
                    </label>
                </Grid>
                <Grid item>
                    <img
                        width="282"
                        height="200"
                        src="http://www.kartenlesegeraet-personalausweis.de/bilder/ausweisnummer-neuer-personalausweis.jpg"
                        alt=""
                    ></img>
                </Grid>
            </Grid>
        </div>
    );

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item sm={false} md={7} className={classes.image} />
            <Grid item sm={12} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={1} alignItems="center">
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Email Address"
                                    name="username"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="passwordRepeat"
                                    label="Repeat Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    name="firstName"
                                    autoComplete="given-name"
                                    autoFocus
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    autoFocus
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={9}>
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={districtOptions}
                                    getOptionLabel={(option) => option.name}
                                    name="district"
                                    required={true}
                                    fullWidth
                                    onChange={handleDistrictChange}
                                    renderOption={(option) => (
                                        <React.Fragment>
                                            <Avatar
                                                variant="square"
                                                alt={'D'}
                                                src={option.picture}
                                            />
                                            <span>&nbsp;{option.name}</span>
                                        </React.Fragment>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            required={true}
                                            label="District"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                        />
                                    )}
                                />
                            </Grid>
                            {account.district ? (
                                <Grid item xs={3}>
                                    <Grid
                                        container
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Grid item>
                                            <Avatar
                                                variant="square"
                                                alt={'District'}
                                                src={districtLogo}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ) : (
                                <Grid item xs={3}></Grid>
                            )}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="city"
                                    label="City"
                                    name="city"
                                    autoComplete="city"
                                    autoFocus
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="zipCode"
                                    label="Zip Code"
                                    name="zipCode"
                                    autoComplete="postal-code"
                                    autoFocus
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="street"
                                    label="Street"
                                    name="street"
                                    autoComplete="street-address"
                                    autoFocus
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="houseNumber"
                                    label="House Number"
                                    name="houseNumber"
                                    autoComplete="houseNumber"
                                    autoFocus
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="idId"
                                    label="Identity Document"
                                    name="idId"
                                    autoFocus
                                    onChange={handleChange}
                                    InputProps={{
                                        endAdornment: (
                                            <LightTooltip
                                                title={tooltipImgTxt}
                                                placement="right"
                                            >
                                                <InputAdornment position="end">
                                                    <InfoOutlinedIcon color="inherit" />
                                                </InputAdornment>
                                            </LightTooltip>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <PrivacyButton />
                            </Grid>
                        </Grid>

                        <PrivacyDialog />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={register}
                            disabled={!accepted}
                        >
                            Register
                        </Button>
                        <div>
                            {errorMessage && (
                                <Grid item xs={12}>
                                    <Alert severity="error">
                                        {errorMessage}
                                    </Alert>
                                </Grid>
                            )}
                        </div>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
