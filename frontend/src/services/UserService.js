'use strict';

import HttpService from './HttpService';

export default class UserService {
    constructor() {}

    static baseURL() {
        return `http://${location.hostname}:3000/auth`;
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
                    identityDocument: user.identityDocument,
                    isDistrictUser: user.isDistrictUser
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

    static districtLogin(user, pass) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${UserService.baseURL()}/districtLogin`,
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
        this.unverify();
        console.log(window.localStorage.verified);
        window.localStorage.removeItem('jwtToken');
    }

    static verify() {
        window.localStorage.verified = true;
    }

    static unverify() {
        window.localStorage.removeItem('verified');
    }

    static isVerified() {
        return !!window.localStorage.verified;
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

    static getUser(userId) {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `http://localhost:3000/users/${userId}`,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
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

    static async isDistrictUser() {
        const user = await this.getUserDetails();
        console.log(user);
        return user.isDistrictUser;
    }

    static updateUser(user) {
        return new Promise((resolve, reject) => {
            HttpService.put(
                `http://${location.hostname}:3000/users/${user._id}`,
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
        expiryDate.setHours(24, 0, 0, 0);
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
                    resolve(data);
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
