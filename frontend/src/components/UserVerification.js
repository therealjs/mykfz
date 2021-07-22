'use strict';

import React, { useRef, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Button,
    Typography,
    Fab,
    CircularProgress,
    Slider
} from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import PhotoIcon from '@material-ui/icons/PhotoCamera';
import LoopIcon from '@material-ui/icons/Loop';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import UserService from '../services/UserService';

const useStyles = makeStyles((theme) => ({
    buttonSuccess: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
    buttonFailure: {
        backgroundColor: red[500],
        '&:hover': {
          backgroundColor: red[700],
        },
      },
    slider: {
        width: 200,
      },
  }));


const WebcamCapture = () => {
    const classes = useStyles();
    const webcamRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [monochrome, setMonochrome] = useState(null);
    const [running, setRunning] = useState(false);
    const [dropOff, setValue] = useState(320);
    const [verified, setVerified] = useState(0);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserProfileData = async () => {
            const userResult = await UserService.getUserDetails();
            setUser(userResult);
            console.log(userResult);
        };
        fetchUserProfileData();
    }, []);

    // verified states
    // -1: verification failed
    // 0: initial
    // 1: started webcam
    // 2: verification
    // 3: verification successful

    function updateMonochrome(src) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;

            var context = canvas.getContext('2d');
            context.drawImage(image, 0, 0);

            var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

            for (var i = 0; i < imageData.data.length; i += 4) {
                // var grayscale = imageData.data[i] * .3 + imageData.data[i+1] * .59 + imageData.data[i+2] * .11;
                //     imageData.data[i  ] = grayscale;
                //     imageData.data[i+1] = grayscale;
                //     imageData.data[i+2] = grayscale;

                    let count = imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2];
                    let colour = 0;
                    if (count > dropOff) colour = 255;
                    
                    imageData.data[i] = colour;
                    imageData.data[i + 1] = colour;
                    imageData.data[i + 2] = colour;
                }
            
            context.putImageData(imageData, 0, 0);
            var newbase64 = canvas.toDataURL("image/jpeg");
            setMonochrome(newbase64);
          };
        image.src = src;
    }

    function matchesUser(text) {
        text = text.replace(/\s/g, '');
        text = text.toUpperCase();
        console.log(user)
        const lastName = user.lastName.toUpperCase();
        const firstName = user.firstName.toUpperCase();
        const id = user.identityDocument.idId;

        if (text.includes(firstName) || text.includes(lastName) || text.includes(id)) {
            return true;
        } else {
            return false;
        }
    }

    const capture = React.useCallback(() => {
        setVerified(0);
        const imageSrc = webcamRef.current.getScreenshot({width: 1000, height: 500});
        setImageSrc(imageSrc);
        updateMonochrome(imageSrc);
        console.log(user);
    }, [webcamRef]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        updateMonochrome(imageSrc);
      };

    function recognize() {
        console.log("Start recognize")
        setRunning(true);
        Tesseract.recognize(monochrome, 'eng', {
            logger: (m) => console.log(m)
        }).then((data) => {
            console.log(data);
            let decision = 0;

            if (matchesUser(data.text)) {
                setVerified(3);
            } else {
                setVerified(-1);
            }
            setRunning(false);
        });
    }

    function Decision() {
        switch (verified) {
            case 0:
                return [];
            case -1:
                return (
                    <div>
                        <Fab
                            color="primary"
                            className={classes.buttonFailure}
                            >
                            <ClearIcon />
                        </Fab>
                        <Button
                        color="primary"
                        className={classes.buttonFailure}
                        variant="contained"
                            
                        onClick={console.log("Verification failed")}>Failed, try new capture</Button>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <Fab
                            color="primary"
                            className={classes.buttonSuccess}
                            >
                            <CheckIcon />
                        </Fab>
                        <Button
                        color="primary"
                        className={classes.buttonSuccess}
                        variant="contained"
                            
                        onClick={console.log("Go to Dashboard")}>Continue to Dashboard</Button>
                    </div>
                );
        }
      }

    return (
        <Grid container spacing={2} alignItems="center" justify="center">
            <Grid item xs={12} lg={6}>
                <Grid container direction="column" spacing={2} justifyContent="center" alignItems="center">
                    <Grid item>
                        <Webcam
                            imageSmoothing={false}
                            audio={false}
                            height={300}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width={600}
                            screenshotQuality={1}
                        />

                    </Grid>
                    <Grid item>
                    <Button onClick={capture} variant="contained"
                            color="primary" startIcon={<PhotoIcon />}>Capture</Button>
                </Grid>
                </Grid>
            </Grid>

            {
                monochrome != null ?
                <Grid item xs={12} lg={6}>
                    <Grid container direction="column" spacing={2} justifyContent="center" alignItems="center">
                        <Grid item>
                            <img style={{width: "500px"}} src={monochrome} alt="Image" />
                        </Grid>
                        <Grid item>
                            <div className={classes.slider}>
                                <Typography id="continuous-slider" gutterBottom>
                                    Brightness
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item>
                                    <RemoveIcon />
                                    </Grid>
                                    <Grid item xs>
                                    <Slider
                                        step={5}
                                        value={dropOff}
                                        onChange={handleChange}
                                        min={200}
                                        max={450}
                                    />
                                    </Grid>
                                    <Grid item>
                                    <AddIcon />
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item>
                            <Button onClick={recognize} variant="contained"
                                    color="primary" startIcon={<LoopIcon />}>Recognize</Button>
                        </Grid>

                    </Grid>
                </Grid>

                 : []
            }
            {
                running ? 
                <Grid item >
                    {<CircularProgress size={56}/>}
                    
                </Grid> 
                :[]
            }
            <Grid item >
                <Decision/>
                    
            </Grid> 
        </Grid>
    );
};

export default function UserVerification() {
    return (
        <div>
            <WebcamCapture />
        </div>
    );
}
