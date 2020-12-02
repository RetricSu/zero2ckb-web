import axios from 'axios';
import config from '../config/constant.json';
import type {
    QueryOption
} from '../types/blockchain';

axios.defaults.withCredentials = true;

class Api{

    base_url: string;

    constructor(){
        this.base_url = config.production_server_url; //config.development_server_url;//config.production_server_url;
    };

    async getLiveCells(query: QueryOption){
        let res = await axios.get(`${this.base_url}/get_live_cells`, { 
            params:{
                query: query
            }
        });
        return res.data;
    };

    async getWallets(){
        let res = await axios.get(`${this.base_url}/wallets`);
        return res.data;
    };

    async getTransactions(query: QueryOption){
        let res = await axios.get(`${this.base_url}/get_tx`, { 
            params:{
                query: query
            }
        });
        return res.data;
    }
}

export default Api;