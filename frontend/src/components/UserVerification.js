'use strict';

import React, { useRef, useState, useCallback, createRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Card,
    TextField,
    InputLabel,
    Select,
    MenuItem,
    Button,
    FormControlLabel,
    RadioGroup,
    Radio,
    Switch,
    Typography,
    Fab,
    CircularProgress
} from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import PhotoIcon from '@material-ui/icons/PhotoCamera';
import LoopIcon from '@material-ui/icons/Loop';
import fx from "glfx";

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
  }));


const WebcamCapture = () => {
    const classes = useStyles();
    const webcamRef = React.useRef(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [imageBuffer, setImageBuffer] = useState(null);
    const [running, setRunning] = useState(false);
    const [verified, setVerified] = useState(0);

    // verified states
    // -1: verification failed
    // 0: initial
    // 1: started webcam
    // 2: verification
    // 3: verification successful

    const capture = React.useCallback(() => {
        setVerified(0);
        const imageSrc = webcamRef.current.getScreenshot({width: 1000, height: 500});

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

            //console.log(imageData.data);
            for (var i = 0; i < imageData.data.length; i += 4) {
                //console.log(imageData.data[i], imageData.data[i+1], imageData.data[i+2])
                // var grayscale = imageData.data[i] * .3 + imageData.data[i+1] * .59 + imageData.data[i+2] * .11;
                //     imageData.data[i  ] = grayscale;
                //     imageData.data[i+1] = grayscale;
                //     imageData.data[i+2] = grayscale;

                    let count = imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2];
                    let colour = 0;
                    if (count > 325) colour = 255;
                    
                    imageData.data[i] = colour;
                    imageData.data[i + 1] = colour;
                    imageData.data[i + 2] = colour;
                }
            
            context.putImageData(imageData, 0, 0);
            //console.log(context.getImageData(0, 0, canvas.width, canvas.height));
            var newbase64 = canvas.toDataURL("image/jpeg");
            //console.log(newbase64);
            setImageSrc(newbase64);
            setImageBuffer(newbase64);
          };
        image.src = imageSrc;
          
        // ctx.putImageData(imageData, 0, 0);
        // var newbase64 = canvas.toDataURL("image/jpeg");
        // // var newbase64 = canvas.toDataURL("image/jpeg");
        // console.log(newbase64);

        // console.log("texture created")
        // let imageSrcNoPrefix = imageSrc.replace(
        //     /^data:image\/[a-z]+;base64,/,
        //     ''
        // );
        // const imageBuffer = Buffer.from(imageSrcNoPrefix, 'base64');
        // //setImageSrc(imageSrc);
        // setImageSrc(newbase64);
        // setImageBuffer(imageSrc);
        console.log("New Image captured")
    }, [webcamRef]);

    const log = React.useCallback(() => {
        console.log(imageSrc);
    });

    function recognize() {
        console.log("Start recognize")
        setRunning(true);
        Tesseract.recognize(imageBuffer, 'eng', {
            logger: (m) => console.log(m)
        }).then((data) => {
            console.log(data);
            let decision = 0;

            if (data.text.includes("22.10.97") || data.text.includes("Janik")) {
                decision = 1;
            }
            if (decision > 0.5) {
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
    // function recognize() {
    //     (async () => {
    //         await worker.load();
    //         await worker.loadLanguage('eng');
    //         await worker.initialize('eng');
    //         const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
    //         console.log(text);
    //         await worker.terminate();
    //       })();
    // };

    return (
        <div>
            <Webcam
                imageSmoothing={false}
                audio={false}
                height={500}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1000}
                screenshotQuality={1}
                //videoConstraints={videoConstraints}
            />
            {
                imageSrc != null ?
                <div>
                <img style={{width: "200px"}} src={imageSrc} alt="Red dot" />
                </div> : []
            }
            <Grid container alignItems="center">
                <Grid item xs={3}>
                    <Button onClick={capture} variant="contained"
                            color="primary" startIcon={<PhotoIcon />}>Capture</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button onClick={recognize} variant="contained"
                            color="primary" startIcon={<LoopIcon />}>Recognize</Button>
                </Grid>
                <Grid item xs={3}>
                    {
                        running ? 
                        <div>
                            {<CircularProgress size={56}/>}
                        </div> :[]
                    }
                    <Decision/>
                </Grid>
            </Grid>
            
        </div>
    );
};

export default function UserVerification() {
    return (
        <div>
            <WebcamCapture />
        </div>
    );
}
