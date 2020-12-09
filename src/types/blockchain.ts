export type Wallet = {
    mainnet: string
    testnet: string
    lock_arg: string
    lock_hash: string
    keystore: string
    password: string
    private_key: string
}

export type Block = {
    header: Header
    proposals: []
    transactions: Transaction[]
    uncles: []
}
  
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

/**
 * HexString represents string starts with "0x" and followed by even number(including empty) of [0-9a-fA-F] characters.
 */
export type HexString = string;
/**
 * Hexadecimal represents string starts with "0x" and followed by any number(excluding empty) of [0-9a-fA-F] characters.
 */
export type Hexadecimal = string;
export type Hash = HexString;
export type HexNumber = Hexadecimal;
export type PackedSince = string;
export type PackedDao = string;

export type Address = string;

export interface Header {
  timestamp: HexString;
  number: HexString;
  epoch: HexString;
  compact_target: HexString;
  dao: Hash;
  hash: Hash;
  nonce: HexString;
  parent_hash: Hash;
  proposals_hash: Hash;
  transactions_root: Hash;
  uncles_hash: Hash;
  version: HexString;
}

export type HashType = "type" | "data";
export interface Script {
  code_hash: Hash;
  hash_type: HashType;
  args: HexString;
}

export interface OutPoint {
  tx_hash: Hash;
  index: HexString;
}

export type DepType = "dep_group" | "code";
export interface CellDep {
  out_point: OutPoint;
  dep_type: DepType;
}

export interface Input {
  previous_output: OutPoint;
  since: PackedSince;
}

export interface Output {
  capacity: HexString;
  lock: Script;
  type?: Script;
}

export interface WitnessArgs {
  lock?: HexString;
  input_type?: HexString;
  output_type?: HexString;
}
export interface RawTransaction {
  cell_deps: CellDep[];
  hash?: Hash;
  header_deps: Hash[];
  inputs: Input[];
  outputs: Output[];
  outputs_data: HexString[];
  version: HexString;
}
export interface Transaction {
  cell_deps: CellDep[];
  hash?: Hash;
  header_deps: Hash[];
  inputs: Input[];
  outputs: Output[];
  outputs_data: HexString[];
  version: HexString;
  witnesses: HexString[];
}

export interface TxStatus {
  block_hash?: Hash;
  status: string;
}

export interface TransactionWithStatus {
  transaction: Transaction;
  tx_status: TxStatus;
}

export interface Cell {
  cell_output: {
    capacity: HexString;
    lock: Script;
    type?: Script;
  };
  data: HexString;
  out_point?: OutPoint;
  block_hash?: Hash;
  block_number?: HexString;
}

/**
 * argsLen: if argsLen = 20, it means collected cells cell.cell_output.lock.args should be 20-byte length, and prefix match to lock.args.
 * And if argsLen = -1 (default), means cell.cell_output.lock.args should equals to lock.args.
 */
export interface QueryOptions {
  lock?: Script | ScriptWrapper;
  type?: Script | ScriptWrapper | "empty";
  // data = any means any data content is ok
  data?: string | "any";
  argsLen?: number | "any";
  /** `fromBlock` itself is included in range query. */
  fromBlock?: Hexadecimal;
  /** `toBlock` itself is included in range query. */
  toBlock?: Hexadecimal;
  skip?: number;
  order?: "asc" | "desc";
}

export interface ScriptWrapper {
  script: Script;
  ioType?: "input" | "output" | "both";
  argsLen?: number | "any";
}

export interface CellCollectorResults {
  [Symbol.asyncIterator](): AsyncIterator<Cell>;
}

export interface CellCollector {
  collect(): CellCollectorResults;
}

export interface CellProvider {
  uri?: string;
  collector(queryOptions: QueryOptions): CellCollector;
}

export interface Message {
  index: number;
  message: HexString;
  lock: Script;
}