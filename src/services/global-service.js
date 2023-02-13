import GlobalStore from '../store/global';

class GlobalService {

    get globalStore(){
        if (!this._store) {
            this._store = new GlobalStore(this);
        }
        return this._store;
    }
    
}

export default GlobalService;