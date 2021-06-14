'use strict';

import React from 'react';

export class PlateReservationView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {}

    render() {
        if (this.state.loading) {
            return <h2>Loading...</h2>;
        }

        return (
            <PlateReservation
                user={this.state.user}
                onSubmit={(plateReservation) =>
                    this.createPlateReservation(plateReservation)
                }
                error={this.state.error}
            />
        );
    }
}
