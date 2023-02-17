import React, { useEffect } from 'react';
import { makeAutoObservable, toJS } from 'mobx';
import axios from 'axios';

const HEADER_GET = {
    method: 'GET',
    headers: {
        'User-Agent': 'Api Test',
        Authorization:
            'Bearer ZQQ-uFF3J6n0hX_pVHonZ_rn0aCUP1hQDJhTzP81N_w',
    },
}

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

    searchAnime = async (value,limit) => {
        const response = await axios.get(`https://shikimori.one/api/animes?search=${value}&limit=${limit}`, HEADER_GET);

        this.findedAnimes = response.data;
        this.useFindedAnimeCallback(this.findedAnimes);

        return response.data;
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
