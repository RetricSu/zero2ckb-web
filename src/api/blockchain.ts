import axios, { Method } from "axios";
import config from "../config/constant.json";
import utils from "../utils/index";
import type {
  Transaction,
  QueryOption,
  RawTransaction,
  WitnessArgs,
  HexString,
  Cell,
  Block,
  Wallet,
  HexNumber,
  ChainConfig,
  Hash,
  Message,
} from "../types/blockchain";

//axios.defaults.withCredentials = true;

export enum ApiRequestResponseStatus {
  ok = "ok",
  failed = "failed",
}
export interface ApiRequestResponse {
  status: ApiRequestResponseStatus;
  data?: any;
  error?: string;
}

export enum ApiRequestType {
  get,
  post,
}

class Api {
  base_url: string;

  constructor() {
    this.base_url =
      utils.get_env_mode() === "development"
        ? config.development_server_url
        : config.production_server_url;
  }

  private async httpRequest(
    target: string,
    params: any = {},
    type: ApiRequestType = ApiRequestType.get
  ): Promise<any> {
    const callRequest = async (method: Method) => {
      const url = `${this.base_url}/${target}`;
      const res = await axios({ url, method, params });
      const response = res.data as ApiRequestResponse;
      if (response.status === ApiRequestResponseStatus.failed) {
        throw new Error("[ApiRequestError]: " + response.error);
      }

      return response.data;
    };

    switch (type) {
      case ApiRequestType.get:
        return await callRequest("GET");

      case ApiRequestType.post:
        return await callRequest("POST");

      default:
        throw new Error(`unknown ApiRequestType, expect: {get, post}`);
    }
  }

  async getNewBlocks(limit = 10): Promise<Block[]> {
    return await this.httpRequest("get_new_blocks", { limit });
  }

  async getBlockByTxHash(tx_hash: HexString): Promise<Block> {
    return await this.httpRequest("get_block_by_tx_hash", { tx_hash });
  }

  async getLiveCells(query: QueryOption, limit: number = 10): Promise<Cell[]> {
    return await this.httpRequest("get_live_cells", {
      query,
      limit,
    });
  }

  async getWallets(): Promise<Wallet[]> {
    return await this.httpRequest("wallets");
  }

  async getBalance(lock_args: HexString): Promise<HexNumber> {
    return await this.httpRequest("get_balance", {
      lock_args,
    });
  }

  async getTransactions(
    query: QueryOption,
    limit: number = 10
  ): Promise<Transaction[]> {
    return await this.httpRequest("get_txs", {
      query,
      limit,
    });
  }

  async getChainConfig(): Promise<ChainConfig> {
    return await this.httpRequest("chain_config");
  }

  async getSignature(message: string, private_key: string): Promise<HexString> {
    return await this.httpRequest("get_signature", {
      message,
      private_key,
    });
  }

  async getToSignMessage(
    raw_tx: RawTransaction,
    witnessArgs: WitnessArgs[]
  ): Promise<Message[]> {
    return await this.httpRequest("get_sign_message", {
      raw_tx,
      witnessArgs: JSON.stringify(witnessArgs),
    });
  }

  async generateTxHash(raw_tx: RawTransaction): Promise<Hash> {
    return await this.httpRequest("get_tx_hash", {
      raw_tx,
    });
  }

  async generateSerializeTx(raw_tx: RawTransaction): Promise<HexString> {
    return await this.httpRequest("get_serialize_tx", {
      raw_tx,
    });
  }

  async sendTx(tx: Transaction): Promise<Hash> {
    return await this.httpRequest("send_tx", {
      tx,
    });
  }

  async getSerializedWitness(witnessArgs: WitnessArgs): Promise<HexString> {
    return await this.httpRequest("get_serialized_witness", {
      witnessArgs,
    });
  }

  async getMinimalCellCapacity(cell: Cell): Promise<HexNumber> {
    return await this.httpRequest("get_minimal_cell_capacity", {
      cell,
    });
  }
}

export default Api;
