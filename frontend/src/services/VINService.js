"use strict";

import HttpService from "./HttpService";

export default class VehicleService {
  constructor() {}

  static baseURL() {
    return "https://vpic.nhtsa.dot.gov/api/vehicles";
  }

  static getAllMakes() {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${this.baseURL()}/GetAllMakes?format=json`,
        function (data) {
          const makesList = VehicleService.parseMakesData(data);
          resolve(makesList);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getVehicleInfo(vin) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${this.baseURL()}/decodevinextended/${vin}?format=json`,
        function (data) {
          const vehicleInfo = VehicleService.parseVehicleData(data);
          resolve(vehicleInfo);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  // parse raw data returned by gov API into a more structured JSON Object
  static parseVehicleData(rawData) {
    let vehicle = {};
    for (const property in rawData.Results) {
      const field = rawData.Results[property];
      const key = field.Variable;
      const val = field.Value;
      vehicle[key] = val;
    }
    return vehicle;
  }

  static parseMakesData(rawData) {
    let makes = [];
    for (const property in rawData.Results) {
      const field = rawData.Results[property];
      const makeName = field.Make_Name;
      makes.push(makeName);
    }
    return makes;
  }
}
