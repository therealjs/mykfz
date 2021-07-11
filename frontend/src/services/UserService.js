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

    static async isDistrictUser() {
        return await this.getUserDetails().isDistrictUser;
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

    static isAuthenticated() {
        return !!window.localStorage['jwtToken'];
    }
}
