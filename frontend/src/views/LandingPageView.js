'use strict';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Page from '../components/Page';
import Offering from '../components/Offering';
import { CssBaseline } from '@material-ui/core';
import LandingPage from '../components/LandingPage';

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
            <Page>
                <LandingPage></LandingPage>
            </Page>
        );
    }
}
