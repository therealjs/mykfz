"use strict";

import HttpService from "./HttpService";

export default class VehicleService {
  constructor() {}

  static baseURL() {
    return "https://vpic.nhtsa.dot.gov/api/vehicles/decodevinextended";
  }

  static getVehicleInfo(vin) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${this.baseURL()}/${vin}?format=json`,
        function (data) {
          const vehicleInfo = VehicleService.parseRawData(data);
          resolve(vehicleInfo);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  // parse raw data returned by gov API into a more structured JSON Object
  static parseRawData(rawData) {
    let vehicle = {};
    for (const property in rawData.Results) {
      const field = rawData.Results[property];
      const key = field.Variable;
      const val = field.Value;
      vehicle[key] = val;
    }
    return vehicle;
  }
}
