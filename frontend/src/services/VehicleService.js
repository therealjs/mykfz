"use strict";

import HttpService from "./HttpService";

export default class VehicleService {
  constructor() {}

  static baseURL() {
    return "http://localhost:3000/vehicles";
  }

  static getVehicles() {
    return new Promise((resolve, reject) => {
      HttpService.get(
        this.baseURL(),
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  // TODO
  static getVehiclesForUser(user_id) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${VehicleService.baseURL()}?owner=${user_id}`,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getVehicle(id) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${VehicleService.baseURL()}/${id}`,
        function (data) {
          if (data != undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject("Error while retrieving vehicle");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static deleteVehicle(id) {
    return new Promise((resolve, reject) => {
      HttpService.remove(
        `${VehicleService.baseURL()}/${id}`,
        function (data) {
          if (data.message != undefined) {
            resolve(data.message);
          } else {
            reject("Error while deleting");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static updateVehicle(vehicle) {
    return new Promise((resolve, reject) => {
      HttpService.put(
        `${this.baseURL()}/${vehicle._id}`,
        vehicle,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static createVehicle(vehicle) {
    vehicle.id = Math.floor(Math.random() * 100000000 + 1).toString();
    vehicle.posters = {
      thumbnail:
        "http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/27/63/11276344_ori.jpg",
      profile:
        "http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/27/63/11276344_ori.jpg",
      detailed:
        "http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/27/63/11276344_ori.jpg",
      original:
        "http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/27/63/11276344_ori.jpg",
    };
    return new Promise((resolve, reject) => {
      HttpService.post(
        VehicleService.baseURL(),
        vehicle,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }
}
