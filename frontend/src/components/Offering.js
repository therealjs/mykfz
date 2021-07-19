import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageCard from './ImageCard';
import offers from '../static/offers';

const useStyles = makeStyles((theme) => ({
    root: {
        minheight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column'
        }
    }
}));

function Offering() {
    const classes = useStyles();
    return (
        <div className={classes.root} id="Offering">
            <ImageCard offer={offers[0]} />
            <ImageCard offer={offers[1]} />
            <ImageCard offer={offers[2]} />
            <ImageCard offer={offers[3]} />
        </div>
    );
}

export default Offering;
