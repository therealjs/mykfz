'use strict';
const path = require('path');

import VehicleService from './VehicleService';
import UserService from './UserService';
import DistrictService from './DistrictService';
//import pdfmake
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';

import { base64MyKfzLogo, base64SebisLogo, base64TUMLogo } from '../../resources/base64Images';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const labelsForPdf = {
    processType: 'Process',
    date: 'Date',
    state: 'Process state',
    secCodeI: 'Security Code I',
    plateCode: 'Plate Code',
    eVB: 'EVB',
    secCodeII: 'Security Code II',
    iban: 'IBAN',
    firstName: 'First name',
    lastName: 'Last name',
    street: 'Street',
    houseNumber: 'House No.',
    zipCode: 'Zip code',
    city: 'City',
    districtName: 'District',
    idId: 'Identity card number',
    processState: "Process state"
};

const dataNotToPrint = [
    '_id',
    'username',
    'password',
    'licensePlateReservations',
    'picture',
    'areaCode',
    'district'
];

export default class ProcessService {
    static async generateProcessStatusPDF(vehicleId, processId) {
        // get data for document
        let processData = await VehicleService.getVehicleProcess(
            vehicleId,
            processId
        );
        let userData = await UserService.getUserDetails();
        let districtData = await DistrictService.getDistrict(
            userData.address.district
        );

        // create doc name
        const dateString = new Date(
            Date.parse(processData.date)
        ).toLocaleString('de-DE', { timeZone: 'UTC' });
        const documentName =
            processData.processType +
            ', ' +
            userData.firstName +
            ' ' +
            userData.lastName +
            ', ' +
            dateString;

        // change key of district name
        districtData['districtName'] = districtData.name;
        delete districtData['name'];

        // create document
        let document = {
            content: [
                {
                    columns: [
                        {
                            image: base64MyKfzLogo,
                            fit: [75, 75]
                        },
                        {
                            image: base64SebisLogo,
                            fit: [200, 250]
                        },
                        {
                            image: base64TUMLogo,
                            width: 75
                        }
                    ]
                    
                },
                {
                    text: processData.processType,
                    fontStyle: 15,
                    lineHeight: 2
                }
            ],
            info: {
                title: documentName,
                author: 'myKFZ'
            }
        };

        // fill doc with data
        [userData, districtData, processData].forEach((data) =>
            this.flattenObject(document, data)
        );

        // download
        pdfMake.createPdf(document).download(documentName + '.pdf');
    }

    static flattenObject(document, objectToFlatten) {
        Object.keys(objectToFlatten).forEach((key) => {
            // skip data, e.g. _ids
            if (!dataNotToPrint.includes(key.toString())) {
                // recursively call method, skip empty data
                if (
                    typeof objectToFlatten[key] === 'object' &&
                    objectToFlatten[key] !== null
                ) {
                    this.flattenObject(document, objectToFlatten[key]);
                } else if (objectToFlatten[key] !== null) {
                    if (key === 'date') {
                        objectToFlatten[key] = new Date(Date.parse(objectToFlatten[key])).toLocaleDateString('de-DE', { timeZone: 'UTC' });
                    }
                    document.content.push({
                        columns: [
                            { text: labelsForPdf[key] || key, width: 120 },
                            { text: ':', width: 10 },
                            { text: objectToFlatten[key], width: 300 }
                        ],
                        lineHeight: 2
                    });
                }
            }
        });
        return document;
    }
}


