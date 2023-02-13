import { makeAutoObservable } from "mobx"

class GlobalStore {
    count = 0;

    constructor(service) {
        makeAutoObservable(this);
        this.service = service;
    }

    getCount(){
        return this.count;
    }

    increment(){
        this.count++;
    }

    decrement(){
        this.count--;
    }

    reset(){
        this.count = 0;
    }
}

export default GlobalStore;