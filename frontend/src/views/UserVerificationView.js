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
import { useHistory } from 'react-router-dom';
import Nfc from 'nfc-react-web';
import Copyright from '../components/Copyright';
import UserVerification from '../components/UserVerification';

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
    return (
        <div>
            {verificationForm}
            {actionButton}
        </div>
    );
}

function UserVerificationView(props) {
    let history = useHistory()
    const classes = useStyles();
    const [user, setUser] = useState({});
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            let userResult = await UserService.getUserDetails();
            setUser(userResult);
            if(userResult.isDistrictUser) {
                UserService.verify();
                setVerified(true);
                history.push('/')
            }
        };
        fetchData();
    }, []);

    const verifyUser = () => {
        UserService.verify();
        setVerified(true);
    };

    const cancel = () => {
        UserService.logout();
        history.push('/');
    };

    function Action() {
        //if (videoScan) {
        return (
            <UserVerification /> 
        );
        // }
        // else {
        //     return(
        //         <Button
        //             fullWidth
        //             variant="contained"
        //             color="primary"
        //             //className={classes.submit}
        //             //onClick={updateVideoScan()}
        //         >
        //             Start Verification
        //         </Button>
        //     );
        // }
    }

    function VerifyButton() {
        return(
            <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={verifyUser}
                >
                Verify x
            </Button>
        )
    }

    function CancelButton() {
        return(
            <Button
                fullWidth
                variant="contained"
                className={classes.submit}
                onClick={cancel}
                >
                Cancel
            </Button>
        )
    }

    const scanNfc = async () => {
        console.log('scanning something');
    };

    return (
        <Grid container direction="column" spacing={2} justifyContent="center" alignItems="center">
            <CssBaseline />
            <Grid item>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                </div>
            </Grid>
            <Grid item>
                <Typography component="h1" variant="h5">
                    Verification
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography
                            variant="subtitle2"
                            align="center"
                            display="block"
                            color="textSecondary"
                        >
                    Since our myKFZ processes are legally binding procedures, 
                    we first ask you to verify your identity.
                    Hold your ID card or passport in front of the camera. 
                    Your name and id number must be clearly visible.
                    After capturing, you can still adjust the brightness of the image on the right side.
                    Start the verification process by clicking on "Recognize".

                </Typography>
            </Grid>
            <Grid item>
                <Action />
            </Grid>
            <Grid item>
                <VerifyButton />
            </Grid>
            <Grid item>
                <CancelButton />
            </Grid>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Grid>
    );
}

export default withRouter(UserVerificationView);
