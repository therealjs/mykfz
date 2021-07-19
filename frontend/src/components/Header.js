'use strict';

import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import UserService from '../services/UserService';
import KebabMenu from './KebabMenu';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'myKFZ',
            user: UserService.isAuthenticated()
                ? UserService.getCurrentUser()
                : undefined,
            open: false,
            anchorEl: null
        };
    }

    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Grid
                        justify="space-between"
                        container
                        direction="row"
                        alignItems="center"
                    >
                        <Grid item>
                            <div>
                                <a
                                    href={window.location.origin}
                                    style={{
                                        fontFamily: 'Nunito',
                                        color: 'white',
                                        fontSize: '1.5rem',
                                        fontWeight: '900'
                                    }}
                                >
                                    myKFZ
                                </a>
                            </div>
                        </Grid>
                        <Grid item>
                            {UserService.isAuthenticated() ? (
                                <div>
                                    <Button
                                        onClick={(event) => {
                                            this.setState({
                                                anchorEl: event.currentTarget
                                            });
                                            this.setState({
                                                open: !this.state.open
                                            });
                                        }}
                                        color="inherit"
                                        startIcon={<AccountCircle />}
                                    >
                                        Mike A. Effzett
                                    </Button>
                                    <Menu
                                        anchorEl={this.state.anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right'
                                        }}
                                        transition
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right'
                                        }}
                                        open={this.state.open}
                                        onClose={() => {
                                            this.state.anchorEl = null;
                                            this.setState({
                                                open: !this.state.open
                                            });
                                        }}
                                    >
                                        <MenuItem>Profile</MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                UserService.logout(),
                                                    window.location.reload();
                                            }}
                                        >
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </div>
                            ) : (
                                <Button
                                    onClick={() => {
                                        this.props.history.push('/login');
                                    }}
                                    color="inherit"
                                    aria-label="menu"
                                >
                                    Login
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            //<Toolbar
            //    colored
            //    nav={<Button onClick={() => this.props.history.push('/')} icon>home</Button>}
            //   title={this.props.title}
            //    actions={<KebabMenu id="toolbar-colored-kebab-menu" />}>
            //</Toolbar>
        );
    }
}

export default withRouter(Header);
