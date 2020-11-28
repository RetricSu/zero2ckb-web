import axios from 'axios';
import config from '../config/constant.json';
axios.defaults.withCredentials = true;

export interface CellQuery {
    address?: string;
    lock_args?: string;
}

class Api{

    base_url: string;

    constructor(){
        this.base_url = config.production_server_url; //config.development_server_url;//config.production_server_url;
    };

    async getLiveCells(query: CellQuery){
        let res = await axios.get(`${this.base_url}/get_live_cells`, { 
            params:{
                query: query
            }
        });
        return res.data;
    }
}

export default Api;