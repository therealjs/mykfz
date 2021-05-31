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
          <SimpleLink to={`/show/${this.props.vehicle._id}`}>
            {this.props.vehicle.vin}
          </SimpleLink>
        </TableColumn>
        <TableColumn>
          <SimpleLink to={`/show/${this.props.vehicle._id}`}>
            {this.props.vehicle.licensePlate}
          </SimpleLink>
        </TableColumn>
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
            <Link to={`/vehicle/${this.props.vehicle._id}`}>
              <FontIcon>add</FontIcon>
            </Link>
          </TableColumn>
        ) : (
          <TableColumn>
            <Link to={"/login"}>
              <FontIcon>add</FontIcon>
            </Link>
          </TableColumn>
        )}
        {UserService.isAuthenticated() ? (
          <TableColumn>
            <Link to={`/edit/${this.props.vehicle._id}`}>
              <FontIcon>remove</FontIcon>
            </Link>
          </TableColumn>
        ) : (
          <TableColumn>
            <Link to={"/login"}>
              <FontIcon>remove</FontIcon>
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
}
