"use strict";

import React from "react";

import { VehicleList } from "../components/VehicleList";

import VehicleService from "../services/VehicleService";

export class VehicleListView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
    };
  }

  componentWillMount() {
    this.setState({
      loading: true,
    });

    VehicleService.getVehicles()
      .then((data) => {
        this.setState({
          data: [...data],
          loading: false,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  async deleteVehicle(id) {
    this.setState({
      data: [...this.state.data],
      loading: true,
    });

    try {
      let ret = await VehicleService.deleteVehicle(id);
      let vehicleIndex = this.state.data
        .map((vehicle) => vehicle["_id"])
        .indexOf(id);
      let vehicles = this.state.data;
      vehicles.splice(vehicleIndex, 1);
      this.setState({
        data: [...vehicles],
        loading: false,
      });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    if (this.state.loading) {
      return <h2>Loading...</h2>;
    }

    return (
      <VehicleList
        data={this.state.data}
        onDelete={(id) => this.deleteVehicle(id)}
      />
    );
  }
}
