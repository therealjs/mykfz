'use strict';

import HttpService from './HttpService';

export default class UserService {
    constructor() {}

    static baseURL() {
        return 'http://localhost:3000/auth';
    }

    static register(user) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${UserService.baseURL()}/register`,
                {
                    username: user.username,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    address: user.address,
                    identityDocument: user.identityDocument
                },
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static login(user, pass) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${UserService.baseURL()}/login`,
                {
                    username: user,
                    password: pass
                },
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static logout() {
        window.localStorage.removeItem('jwtToken');
    }

    static getCurrentUser() {
        let token = window.localStorage['jwtToken'];
        if (!token) return {};

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return {
            id: JSON.parse(window.atob(base64)).id,
            username: JSON.parse(window.atob(base64)).username
        };
    }

    static getUserDetails() {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${UserService.baseURL()}/me`,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static updateUser(user) {
        return new Promise((resolve, reject) => {
            HttpService.put(
                `http://localhost:3000/users/${user._id}`,
                user,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }
    
    static createLicensePlateReservation(userId, plateId, days) {
        var expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + days);
        expiryDate.setHours(24,0,0,0);
        return new Promise((resolve, reject) => {
                HttpService.post(
                    `http://localhost:3000/users/${userId}/licensePlateReservations`,
                    {
                        licensePlate: plateId,
                        expiryDate: expiryDate
                    },
                    function (data) {
                        resolve(data);
                    },
                    function (textStatus) {
                        reject(textStatus);
                    }
            );
        });
    }

    static deleteLicensePlateReservation(userId, plateId) {
        return new Promise((resolve, reject) => {
            HttpService.remove(
                `http://localhost:3000/users/${userId}/licensePlateReservations/${plateId}`,
                function (data) {
                    if (data.message != undefined) {
                        resolve(data.message);
                    } else {
                        reject('Error while deleting');
                    }
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static isAuthenticated() {
        return !!window.localStorage['jwtToken'];
    }
}
