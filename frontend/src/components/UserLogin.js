"use strict";

import React from 'react';
import { Grid, Card, TextField,  Button,  Typography} from "@material-ui/core";
import { withRouter, Link } from 'react-router-dom';

import { AlertMessage } from './AlertMessage';
import Page from './Page';


const style = { maxWidth: 500 };


class UserLogin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username : '',
            password : ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        let user = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.onSubmit(user);
    }

    render() {
        return (
            <Page>
            <Card style={{padding: "20px", maxWidth: "500px"}}>
          <form
            onSubmit={this.handleSubmit}
            onReset={() => this.props.history.goBack()}
          >
            <Typography style={{marginBottom: "10px"}} component="h5" variant="h5">
              Login
            </Typography>
            <Grid
              justify="space-between"
              container
              direction="row"
              alignItems="center"
              justify="center"
              spacing={3}
            >
            <Grid item xs = {12}>
                        <TextField
                            label="Username"
                            name="username"
                            fullWidth
                            required={true}
                            value={this.state.username}
                            onChange={this.handleChange}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            name="password"
                            fullWidth
                            type="password"
                            required={true}
                            value={this.state.password}
                            onChange={this.handleChange}/>
                    </Grid>
                    
                    
                    
                    
                    
                        <Grid item xs={12}>
                        <Button
                        style={{float: "right", marginLeft: "15px"}}
                        variant="contained"
                        type="submit"
                        color="primary"
                        disabled={this.state.username.toString().length < 1 || 
                                    this.state.password.toString().length < 1}
                        >
                        Login
                        </Button>
                        <Button component={ Link } to={'/register'}
                            style={{float: "right"}}
                            variant="contained"
                            color="secondary"
                            >
                            Register
                        </Button>
                        </Grid>
                      </Grid>
                    </form>
                </Card>
            </Page>
        );
    }
};

export default withRouter(UserLogin);