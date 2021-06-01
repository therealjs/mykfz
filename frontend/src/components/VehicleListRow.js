"use strict";

import React from "react";
import { TableRow, TableColumn, FontIcon, Button } from "react-md";
import { Link } from "react-router-dom";

import { SimpleLink } from "./SimpleLink";

import UserService from "../services/UserService";

export class VehicleListRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TableRow key={this.props.key}>
        <TableColumn>
          <Link to={`/show/${this.props.vehicle._id}`}>
            <FontIcon>directions_car</FontIcon>
          </Link>
        </TableColumn>
        <TableColumn>
            {this.props.vehicle.vin}
        </TableColumn>
        <TableColumn>
            {this.props.vehicle.licensePlate}
        </TableColumn>
        <TableColumn>
            {this.props.vehicle.state}
        </TableColumn>
        {this.renderProcess(this.props.vehicle.state)}
        {UserService.isAuthenticated() ? (
          <TableColumn>
            <Link to={`/edit/${this.props.vehicle._id}`}>
              <FontIcon>mode_edit</FontIcon>
            </Link>
          </TableColumn>
        ) : (
          <TableColumn>
            <Link to={"/login"}>
              <FontIcon>mode_edit</FontIcon>
            </Link>
          </TableColumn>
        )}
        {UserService.isAuthenticated() ? (
          <TableColumn>
            <Button
              onClick={() => this.props.onDelete(this.props.vehicle._id)}
              icon
            >
              delete
            </Button>
          </TableColumn>
        ) : (
          <TableColumn>
            <Link to={"/login"}>
              <FontIcon>delete</FontIcon>
            </Link>
          </TableColumn>
        )}
      </TableRow>
    );
  }

  renderProcess(state) {
    switch (state) {
      case "NEW":
        return(
          <TableColumn>
          <Link to={`/register/${this.props.vehicle._id}`}>
            <Button>
              Register
            </Button>
          </Link>
          </TableColumn>
        )
      case "REGISTERED":
        return(
          <TableColumn>
          <Link to={`/deregister/${this.props.vehicle._id}`}>
            <Button>
              Deregister
            </Button>
          </Link>
          </TableColumn>
        )
      case "DEREGISTERED":
        return(
          <TableColumn>
          <Link to={`/register/${this.props.vehicle._id}`}>
            <Button>
              Reregister
            </Button>
          </Link>
          </TableColumn>
        )
    }
  }
}
