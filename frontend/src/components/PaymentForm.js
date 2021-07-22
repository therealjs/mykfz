import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { PayPalButton } from 'react-paypal-button-v2';
import ProcessService from '../services/ProcessService';
import { Checkmark } from 'react-checkmark';

export default function PaymentForm({ process }) {
    const clientId =
        'ATuI28VIncLCJuX7OGrZeGvMtje-hZnJMvYWnUcr_TF89oEoN0wO0D1oMz3cGq9ShUt-sEZhFXuA2lvN';

    const price = ProcessService.calculatePrice(process);

    const [isPaid, setIsPaid] = useState(false);

    const paymentButtons = (
        <PayPalButton
            amount={price}
            // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
            onSuccess={(details, data) => {
                setIsPaid(true);
            }}
            options={{
                clientId: clientId,
                currency: 'EUR'
            }}
        />
    );

    const paymentConfirmedMessage = <Checkmark size="xxLarge" />;

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Payment method
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {isPaid ? paymentConfirmedMessage : paymentButtons}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
