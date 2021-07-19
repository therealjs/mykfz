'use strict';

import React, { useRef, useState, useCallback, createRef } from 'react';
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
    Typography
} from '@material-ui/core';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';

const WebcamCapture = () => {
    const webcamRef = React.useRef(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [imageBuffer, setImageBuffer] = useState(null);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        let imageSrcNoPrefix = imageSrc.replace(
            /^data:image\/[a-z]+;base64,/,
            ''
        );
        const imageBuffer = Buffer.from(imageSrcNoPrefix, 'base64');
        setImageSrc(imageSrc);
        setImageBuffer(imageSrc);
    }, [webcamRef]);

    const log = React.useCallback(() => {
        console.log(imageSrc);
    });

    function recognize() {
        Tesseract.recognize(imageBuffer, 'eng', {
            logger: (m) => console.log(m)
        }).then((data) => {
            console.log(data);
        });
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
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1280}
                //videoConstraints={videoConstraints}
            />
            <Button onClick={capture}>Capture photo</Button>
            <Button onClick={log}>Log</Button>
            <Button onClick={recognize}>Recognize</Button>
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
