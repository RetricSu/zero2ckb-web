import axios from 'axios';
import config from '../config/constant.json';
import utils from '../utils/index';
import type {
    Transaction,
    QueryOption, 
    RawTransaction, 
    WitnessArgs,
    HexString,
    Cell
} from '../types/blockchain';

axios.defaults.withCredentials = true;

class Api{

    base_url: string;

    constructor(){
        
        this.base_url = utils.get_env_mode() === 'development' ? config.development_server_url : config.production_server_url;
    };


    async getNewBlocks(limit=10){
        let res = await axios.get(`${this.base_url}/get_new_blocks`, { 
            params:{
                limit: limit
            }
        });
        return res.data;
    };

    async getBlockByTxHash(tx_hash: HexString){
        console.log('tx hash:', tx_hash);
        let res = await axios.get(`${this.base_url}/get_block_by_tx_hash`, {
            params:{
                tx_hash: tx_hash
            }
        });
        return res.data;
    }

    async getLiveCells(query: QueryOption, limit:number = 10){
        let res = await axios.get(`${this.base_url}/get_live_cells`, { 
            params:{
                query: query,
                limit: limit
            }
        });
        return res.data;
    };

    async getWallets(){
        let res = await axios.get(`${this.base_url}/wallets`);
        return res.data;
    };

    async getBalance(lock_args: HexString){
        let res = await axios.get(`${this.base_url}/get_balance`, { 
            params:{
                lock_args: lock_args
            }
        });
        return res.data;
    }

    async getTransactions(query: QueryOption, limit:number = 10){
        let res = await axios.get(`${this.base_url}/get_txs`, { 
            params:{
                query: query,
                limit: limit
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

    async generateSerializeTx(raw_tx: RawTransaction){
        let res = await axios.get(`${this.base_url}/get_serialize_tx`, { 
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

    async getSeriliazedWitness(witnessArgs: WitnessArgs){
        let res = await axios.get(`${this.base_url}/get_seriliazed_witness`, { 
            params:{
                witnessArgs: witnessArgs
            }
        });
        return res.data;
    }

    async getMinimalCellCapacity(cell: Cell){
        let res = await axios.get(`${this.base_url}/get_minimal_cell_capacity`, { 
            params:{
                cell: cell
            }
        });
        return res.data;
    }
}

export default Api;
