import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import ProcessService from '../services/ProcessService';

const addresses = [
    '1 Material-UI Drive',
    'Reactville',
    'Anytown',
    '99999',
    'USA'
];
const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: 'Mr John Smith' },
    { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Expiry date', detail: '04/2024' }
];

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0)
    },
    total: {
        fontWeight: 700
    },
    title: {
        marginTop: theme.spacing(2)
    }
}));

export default function Review({ vehicle, process }) {
    const classes = useStyles();

    console.log(process);

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Process summary
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Alert severity="info">
                        You are about to{' '}
                        <strong>
                            {process.processType == 'REGISTRATION'
                                ? 'register'
                                : 'deregister'}
                        </strong>{' '}
                        vehicle {vehicle.vin} with the following information:
                    </Alert>
                </Grid>
                <Grid item xs={12}>
                    <List disablePadding>
                        <ListItem className={classes.listItem}>
                            <ListItemText primary="Process Type" />
                            <Typography variant="body2">
                                {process.processType}
                            </Typography>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                            <ListItemText primary="License Plate" />
                            <Typography variant="body2">
                                {process.info.licensePlate}
                            </Typography>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                            <ListItemText primary="EVB" />
                            <Typography variant="body2">
                                {process.info.evb}
                            </Typography>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                            <ListItemText primary="Security Code 2" />
                            <Typography variant="body2">
                                {process.info.secCodeII}
                            </Typography>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                            <ListItemText primary="IBAN for vehicle tax" />
                            <Typography variant="body2">
                                {process.info.iban}
                            </Typography>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                            <ListItemText primary="Total" />
                            <Typography
                                variant="subtitle1"
                                className={classes.total}
                            >
                                €
                                {ProcessService.calculatePrice(process).toFixed(
                                    2
                                )}
                            </Typography>
                        </ListItem>
                    </List>
                </Grid>

                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        className={classes.title}
                    >
                        Payment details
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>
                                        {payment.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>
                                        {payment.detail}
                                    </Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography gutterBottom>Payer</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom>
                                {process.paymentDetails.payer.given_name}
                            </Typography>
                        </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
