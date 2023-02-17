import GlobalStore from '../store/global';
import Shikimori from './shikimori/index';

class GlobalService {

    get globalStore(){
        if (!this._store) {
            this._store = new GlobalStore(this);
        }
        return this._store;
    }

    get shikimori(){
        if (!this._shikimori) {
            this._shikimori = new Shikimori(this);
        }
        return this._shikimori;
    }
    
}

export default GlobalService;