import React, { useEffect } from 'react';
import { makeAutoObservable, toJS } from 'mobx';
import axios from 'axios';
import { getCookieParam } from './../../utils/cookieManager/index';
import szhRequest from '../../utils/szh-request';

const HEADER_GET = {
    method: 'GET',
    headers: {
        'User-Agent': 'Relation Anime',
        Authorization: 'Bearer NONE',
    },
};

class Shikimori {
    oneAnime = undefined;
    twoAnime = undefined;

    findedAnimes = [];

    useCompleteCallback = undefined;
    useFindedAnimeCallback = undefined;

    constructor(service) {
        this.service = service;
    }

    useComplete = (callback) => {
        if (callback) {
            this.useCompleteCallback = callback;
        } else if (this.oneAnime && this.twoAnime) {
            if (this.useCompleteCallback) {
                this.useCompleteCallback();
            }
        }
    };

    useFindedAnime = (callback) => {
        this.useFindedAnimeCallback = callback;
    };

    searchAnime = async (value, limit) => {
        const response = await szhRequest.get(`https://shikimori.one/api/animes?search=${value}&limit=${limit}`, {
            header: {
                'User-Agent': 'Relation Anime',
                'Authorization': `Bearer ${getCookieParam("access_token")}`,
            },
        });

        this.findedAnimes = await response.json();
        this.useFindedAnimeCallback(this.findedAnimes);
    };

    setAnime = (num, obj) => {
        switch (num) {
            case 1:
                this.oneAnime = obj;
                this.useComplete();
                break;
            case 2:
                this.twoAnime = obj;
                this.useComplete();
                break;
            default:
                break;
        }
    };

    getToken = async (code) => {
        const response = await szhRequest.post('https://shikimori.one/oauth/token', {
            header: {
                'User-Agent': 'Relation Anime',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: {
                grant_type: 'authorization_code',
                client_id: '3ejSu5YHMfo_mN5h7O2_dBvWaWDRYbEjyDZFn02G09Y',
                client_secret: '9LmOTk8FeO2l7o_rGyHMQFOJTZajDfmVlvWPjmDUXQU',
                'code': code,
                'redirect_uri': 'https://localhost:3000/auth'
            },
        });

        return await response.json();
    };

    checkTokenActuality = async (token) => {
        // POSTMAN CODE SNIPPET

        const response = await szhRequest.get('https://shikimori.one/api/users/whoami', {
            header: {
                'User-Agent': 'Relation Anime',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    };

    debug = (name) => {
        switch (name) {
            case 'addOneAnime':
                this.oneAnime = 'debug';
                this.useComplete();
                break;
            case 'addTwoAnime':
                this.twoAnime = 'debug';
                this.useComplete();
                break;
            default:
                break;
        }
    };
}

export default Shikimori;
