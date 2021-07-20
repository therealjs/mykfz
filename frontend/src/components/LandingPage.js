import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Offering from './Offering';
import Welcome from './Welcome';


import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Container,
    Grid,
    Typography
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        height: '110%',
        width: '100%',
        backgroundImage: `url(${'https://media.istockphoto.com/photos/the-gray-and-silver-are-light-black-with-white-the-gradient-is-the-picture-id1257367584?b=1&k=6&m=1257367584&s=170667a&w=0&h=xCJhP9RRYYYx-d2yX0HhFvnsGAuTAQA4EI-LfN9OcQc='})`,
        backgroundRepeat: 'no_repeat',
        backgroundSize: 'cover'
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6)
    }
}));

const tiers = [
    {
        title: 'Registration & Deregistration',
        price: 'xy',
        description: [
            '10 users included',
            '2 GB of storage',
            'Help center access',
            'Email support'
        ],
        buttonText: 'Sign up for free',
        buttonVariant: 'outlined'
    },
    {
        title: 'myKFZ services',
        subheader: 'Most popular',
        price: 'Free',
        description: [
            'Additional services:',
            'Vehicle administration',
            'Process overview',
            'License plate monitoring'
        ],
        buttonText: 'Get started',
        buttonVariant: 'contained'
    },
    {
        title: 'License plate reservation',
        price: 'Free',
        description: [
            '50 users included',
            '30 GB of storage',
            'Help center access',
            'If used 1.5'
        ],
        buttonText: 'Contact us',
        buttonVariant: 'outlined'
    }
];


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
            <div id="pricing">
                <Container
                    maxWidth="sm"
                    component="main"
                    className={classes.heroContent}
                >
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="textPrimary"
                        gutterBottom
                    >
                        Pricing
                    </Typography>
                    <Typography
                        variant="h6"
                        align="center"
                        color="textSecondary"
                        component="p"
                    >
                        All myKFZ-specific services are provided for free.
                        Processes offered together with the respective districts
                        cost the same amount as if you would do them at the
                        district office.
                    </Typography>
                </Container>
                <Container maxWidth="md" component="main">
                    <Grid container spacing={5} alignItems="flex-end">
                        {tiers.map((tier) => (
                            // Enterprise card is full width at sm breakpoint
                            <Grid
                                item
                                key={tier.title}
                                xs={12}
                                sm={tier.title === 'Enterprise' ? 12 : 6}
                                md={4}
                            >
                                <Card>
                                    <CardHeader
                                        title={tier.title}
                                        subheader={tier.subheader}
                                        titleTypographyProps={{
                                            align: 'center'
                                        }}
                                        subheaderTypographyProps={{
                                            align: 'center'
                                        }}
                                        action={
                                            tier.title === 'Pro' ? (
                                                <StarIcon />
                                            ) : null
                                        }
                                        className={classes.cardHeader}
                                    />
                                    <CardContent>
                                        <div className={classes.cardPricing}>
                                            <Typography
                                                component="h2"
                                                variant="h3"
                                                color="textPrimary"
                                            >
                                                ${tier.price}
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                color="textSecondary"
                                            ></Typography>
                                        </div>
                                        <ul>
                                            {tier.description.map((line) => (
                                                <Typography
                                                    component="li"
                                                    variant="subtitle1"
                                                    align="center"
                                                    key={line}
                                                >
                                                    {line}
                                                </Typography>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            fullWidth
                                            variant={tier.buttonVariant}
                                            color="primary"
                                        >
                                            {tier.buttonText}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </div>
        </div>
    );
}
