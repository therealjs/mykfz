'use strict';

import VehicleService from './VehicleService';
import UserService from './UserService';
import DistrictService from './DistrictService';
//import pdfmake
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const labelsForPdf = {
    processType: "Process",
    date: "Date",
    state: "Process state",
    secCodeI: "Security Code I",
    plateCode: "Plate Code",
    eVB: "EVB",
    secCodeII: "Security Code II",
    iban: "IBAN",
    firstName: "First name",
    lastName: "Last name",
    street: "Street",
    houseNumber: "House No.",
    zipCode: "Zip code",
    city : "City",
    districtName: "District",
    idId: "Identity card number"
};

const dataNotToPrint = ["_id", "username", "password", "licensePlateReservations", "picture", "areaCode", "district"];

export default class ProcessService {
    
    static async generateProcessStatusPDF(vehicleId, processId) {
        let processData = await VehicleService.getVehicleProcess(vehicleId, processId);
        let userData = await UserService.getUserDetails();
        let districtData = await DistrictService.getDistrict(userData.address.district);
        districtData["districtName"] = districtData.name;
        delete districtData["name"];
        let document = { content: [{text: processData.processType, fontStyle: 15, lineHeight: 2}] };
        [userData, districtData, processData].forEach(data => this.flattenObject(document, data));
        pdfMake.createPdf(document).download();
    }

    static flattenObject(document, objectToFlatten) {
        Object.keys(objectToFlatten).forEach(key => {
            if (!dataNotToPrint.includes(key.toString())) {
                if(typeof objectToFlatten[key] === 'object' && objectToFlatten[key] !== null) {
                    this.flattenObject(document, objectToFlatten[key]);
                } else if (objectToFlatten[key] !== null){
                    document.content.push({
                        columns: [
                            { text: labelsForPdf[key] || key, width: 120 },
                            { text: ':', width: 10 },
                            { text: objectToFlatten[key], width: 300 },
                        ],
                        lineHeight: 2
                    });
                }
            }
        });
        return document;
    }
}