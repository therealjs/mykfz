"use strict";

import React from "react";

import { VehicleDetail } from "../components/VehicleDetail";

import VehicleService from "../services/VehicleService";

export class VehicleDetailView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(props) {
    this.setState({
      loading: true,
    });

    let id = this.props.match.params.id;

    (async () => {
      try {
        let vehicle = await VehicleService.getVehicle(id);
        this.setState({
          vehicle: vehicle,
          loading: false,
        });
      } catch (err) {
        console.error(err);
      }
    })();

    // VehicleService.getVehicle(id).then((data) => {
    //     this.setState({
    //         vehicle: data,
    //         loading: false
    //     });
    // }).catch((e) => {
    //     console.error(e);
    // });
  }

  async deleteVehicle(id) {
    try {
      let ret = await VehicleService.deleteVehicle(id);
      this.props.history.push("/");
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    if (this.state.loading) {
      return <h2>Loading...</h2>;
    }

    return (
      <VehicleDetail
        vehicle={this.state.vehicle}
        onDelete={(id) => this.deleteVehicle(id)}
      />
    );
  }
}
