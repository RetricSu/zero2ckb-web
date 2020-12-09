import axios from 'axios';
import config from '../config/constant.json';
import type {
    Transaction,
    QueryOption, 
    RawTransaction, 
    WitnessArgs
} from '../types/blockchain';

axios.defaults.withCredentials = true;

class Api{

    base_url: string;

    constructor(){
        this.base_url = config.production_server_url; //config.development_server_url;//config.production_server_url;
    };


    async getNewBlocks(limit=10){
        let res = await axios.get(`${this.base_url}/get_new_blocks`, { 
            params:{
                limit: limit
            }
        });
        return res.data;
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

    async getChainConfig(){
        let res = await axios.get(`${this.base_url}/chain_config`);
        return res.data;
    };

    async getSignature(message: string,  private_key: string){
        let res = await axios.get(`${this.base_url}/get_signature`, { 
            params:{
                message: message,
                private_key: private_key
            }
        });
        return res.data;
    }
    
    async getToSignMessage(raw_tx: RawTransaction, witnessArgs: WitnessArgs[]){
        let res = await axios.get(`${this.base_url}/get_sign_message`, { 
            params:{
                raw_tx: raw_tx,
                witnessArgs: JSON.stringify(witnessArgs)
            }
        });
        return res.data;
    }

    async generateTxHash(raw_tx: RawTransaction){
        let res = await axios.get(`${this.base_url}/get_tx_hash`, { 
            params:{
                raw_tx: raw_tx
            }
        });
        return res.data; 
    }

    async sendTx(tx: Transaction){
        let res = await axios.get(`${this.base_url}/send_tx`, { 
            params:{
                tx: tx
            }
        });
        return res.data; 
    }

    async getSeriliazedWitness(witnessArgs: string){
        let res = await axios.get(`${this.base_url}/get_seriliazed_witness`, { 
            params:{
                witnessArgs: witnessArgs
            }
        });
        return res.data;
    }
}

export default Api;
