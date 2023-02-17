import { makeAutoObservable, toJS } from "mobx"

class GlobalStore {
    animeSelected = {
        one: "",
        two: "",
    }

    constructor(service) {
        makeAutoObservable(this);
        this.service = service;
    }

    getSelectedAnime = () => {
        return toJS(this.animeSelected);
    }

    selectAnime = (num, value) => {
        switch (num) {
            case 1:
                this.animeSelected = {...this.animeSelected, one: value}
                break;
            case 2:
                this.animeSelected = {...this.animeSelected, two: value}
                break;
            default:
                console.log("Ошибка выбора аниме!");
                break;
        }
    }
}

export default GlobalStore;