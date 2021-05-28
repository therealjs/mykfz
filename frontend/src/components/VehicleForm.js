"use strict";

import React from "react";
import { Card, Button, FontIcon, TextField } from "react-md";
import { withRouter } from "react-router-dom";

import { AlertMessage } from "./AlertMessage";
import Page from "./Page";

const style = { maxWidth: 500 };

class VehicleForm extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.vehicle != undefined) {
      this.state = {
        vin: props.vehicle.vin,
        licensePlate: props.vehicle.year,
        rating: props.vehicle.mpaa_rating,
        synopsis: props.vehicle.synopsis,
      };
    } else {
      this.state = {
        vin: "",
        year: "",
        rating: "",
        synopsis: "",
      };
    }

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleChangeRating = this.handleChangeRating.bind(this);
    this.handleChangeSynopsis = this.handleChangeSynopsis.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeTitle(value) {
    this.setState(Object.assign({}, this.state, { title: value }));
  }

  handleChangeYear(value) {
    this.setState(Object.assign({}, this.state, { year: value }));
  }

  handleChangeRating(value) {
    this.setState(Object.assign({}, this.state, { rating: value }));
  }

  handleChangeSynopsis(value) {
    this.setState(Object.assign({}, this.state, { synopsis: value }));
  }

  handleSubmit(event) {
    event.preventDefault();

    let vehicle = this.props.vehicle;
    if (vehicle == undefined) {
      vehicle = {};
    }

    vehicle.title = this.state.title;
    vehicle.mpaa_rating = this.state.rating;
    vehicle.year = this.state.year;
    vehicle.synopsis = this.state.synopsis;

    this.props.onSubmit(vehicle);
  }

  render() {
    return (
      <Page>
        <Card style={style} className="md-block-centered">
          <form
            className="md-grid"
            onSubmit={this.handleSubmit}
            onReset={() => this.props.history.goBack()}
          >
            <TextField
              label="VIN"
              id="VINField"
              type="text"
              className="md-row"
              required={true}
              value={this.state.vin}
              onChange={this.handleChangeTitle}
              errorText="Title is required"
            />
            <TextField
              label="Year"
              id="YearField"
              type="number"
              className="md-row"
              required={true}
              value={this.state.year}
              onChange={this.handleChangeYear}
              errorText="Year is required"
              maxLength={4}
            />
            <TextField
              label="Rating"
              id="RatingField"
              type="text"
              className="md-row"
              required={false}
              value={this.state.rating}
              onChange={this.handleChangeRating}
            />
            <TextField
              label="Synopsis"
              id="SynopsisField"
              type="text"
              className="md-row"
              rows={5}
              required={true}
              value={this.state.synopsis}
              onChange={this.handleChangeSynopsis}
              errorText="Synopsis is required"
            />

            <Button
              id="submit"
              type="submit"
              disabled={
                this.state.year.toString().length != 4 ||
                this.state.title == undefined ||
                this.state.title == "" ||
                this.state.year == undefined ||
                this.state.year == "" ||
                this.state.synopsis == undefined ||
                this.state.synopsis == ""
              }
              raised
              primary
              className="md-cell md-cell--2"
            >
              Save
            </Button>
            <Button
              id="reset"
              type="reset"
              raised
              secondary
              className="md-cell md-cell--2"
            >
              Dismiss
            </Button>
            <AlertMessage className="md-row md-full-width">
              {this.props.error ? `${this.props.error}` : ""}
            </AlertMessage>
          </form>
        </Card>
      </Page>
    );
  }
}

export default withRouter(VehicleForm);
