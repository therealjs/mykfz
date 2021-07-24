'use strict';

import React from 'react';
import LandingPage from '../components/landingPage/LandingPage';

export class LandingPageView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (this.state.loading) {
            return <h2>Loading...</h2>;
        }
        return (
            <LandingPage/>
        );
    }
}
