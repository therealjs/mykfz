'use strict';

import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import UserService from '../services/UserService';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import { Checkmark } from 'react-checkmark';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Nfc from 'nfc-react-web';
import Copyright from '../components/Copyright';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
    verifiedIcon: {
        margin: theme.spacing(3, 'auto')
    }
}));

function UserVerificationContent({ user, verified, verifyUser }) {
    const classes = useStyles();

    const actionButton = verified ? (
        <Button
            component={Link}
            to="/dashboard"
            fullWidth
            variant="contained"
            className={classes.submit}
            color="primary"
        >
            Continue To Dashboard
        </Button>
    ) : (
        <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={verifyUser}
        >
            Verify
        </Button>
    );

    const verificationForm = verified ? (
        <Checkmark size="96px" className={classes.submit} />
    ) : (
        <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
        </Avatar>
    );

    return (
        <div>
            {verificationForm}
            {actionButton}
        </div>
    );
}

function UserVerificationView(props) {
    const classes = useStyles();
    const [user, setUser] = useState({});
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            let userResult = await UserService.getUserDetails();
            setUser(userResult);
        };

        fetchData();
    }, []);

    const verifyUser = () => {
        UserService.verify();
        setVerified(true);
    };

    const scanNfc = async () => {
        console.log('scanning something');
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Verification
                </Typography>
                <form className={classes.form} noValidate>
                    <UserVerificationContent
                        user={user}
                        verified={verified}
                        verifyUser={verifyUser}
                    />
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default withRouter(UserVerificationView);
