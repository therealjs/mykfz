'use strict';

import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardTitle,
    CardText,
    Media,
    MediaOverlay,
    Grid,
    Cell,
    Button,
    FontIcon
} from 'react-md';

import Page from './Page';

import UserService from '../services/UserService';

const style = { maxWidth: 500 };

export class VehicleDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Page>
                <Card style={style} className="md-block-centered">
                    <Grid className="grid-example">
                        <Cell size={3}>
                            <Media aspectRatio="1-1">
                                <img src="https://i2.wp.com/thinkmarketingmagazine.com/wp-content/uploads/2012/08/bmw-logo.png?ssl=1" />
                            </Media>
                        </Cell>
                        <Cell size={7} />
                        <Cell size={1}>
                            {UserService.isAuthenticated() ? (
                                <Link
                                    to={{
                                        pathname: `/edit/${this.props.vehicle._id}`,
                                        state: { vehicle: this.props.vehicle }
                                    }}
                                >
                                    <Button icon>mode_edit</Button>
                                </Link>
                            ) : (
                                <Link to={'/login'}>
                                    <Button icon>mode_edit</Button>
                                </Link>
                            )}
                        </Cell>
                        <Cell size={1}>
                            {UserService.isAuthenticated() ? (
                                <Button
                                    onClick={() =>
                                        this.props.onDelete(
                                            this.props.vehicle._id
                                        )
                                    }
                                    icon
                                >
                                    delete
                                </Button>
                            ) : (
                                <Link to={'/login'}>
                                    <Button icon>delete</Button>
                                </Link>
                            )}
                        </Cell>
                    </Grid>

                    <CardTitle
                        title={this.props.vehicle.licensePlate}
                        subtitle={this.props.vehicle.vin}
                    />

                    <CardText>
                        <p>some info here maybe?</p>
                        <p>
                            the owner of this vehicle is{' '}
                            {this.props.owner.firstName +
                                ' ' +
                                this.props.owner.lastName}
                        </p>
                    </CardText>
                </Card>
            </Page>
        );
    }
}
