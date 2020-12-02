export type Wallet = {
    mainnet: string
    testnet: string
    lock_arg: string
    lock_hash: string
    keystore: string
    password: string
}

export type Cell = {
  cell_output: {
    capacity: string
    lock: {
      code_hash: string
      hash_type: 'type' | 'data'
      args: string
    }
    type?: {
      code_hash: string
      hash_type: 'type' | 'data'
      args: string
    }
  }
  out_point?: {
    tx_hash: string
    index: string
  }
  block_hash?: string
  block_number?: string
  data: string
};
  
export type QueryOption = {
    lock?: {
        code_hash: string
        hash_type: 'type' | 'data'
        args: string
    },
    type?: {
        code_hash: string
        hash_type: 'type' | 'data'
        args: string
    },
    argsLen?: number, // default option is -1
    fromBlock?: string, // "0x" + 2440000n.toString(16)
    toBlock?: string, // "0x" + 2441000n.toString(16)
    order?: "desc" | "asc", // default option is "asc" order by block
    skip?: number,
}   