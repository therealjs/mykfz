import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Offering from './Offering';
import Welcome from './Welcome';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '110%',
        width: '100%',
        backgroundImage: `url(${'https://media.istockphoto.com/photos/the-gray-and-silver-are-light-black-with-white-the-gradient-is-the-picture-id1257367584?b=1&k=6&m=1257367584&s=170667a&w=0&h=xCJhP9RRYYYx-d2yX0HhFvnsGAuTAQA4EI-LfN9OcQc='})`,
        backgroundRepeat: 'no_repeat',
        backgroundSize: 'cover'
    }
}));

export default function LandingPage({ offer }) {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    }, []);

    return (
        <div className={classes.root}>
            <CssBaseline></CssBaseline>
            <Welcome></Welcome>
            <Offering></Offering>
        </div>
    );
}
