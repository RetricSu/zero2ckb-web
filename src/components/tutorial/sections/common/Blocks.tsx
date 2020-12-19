import React, { useState, useEffect } from 'react';
import type {
    Block
} from '../../../../types/blockchain';
import common_style from '../../../widget/common_style';
import BlockBox from './Block';

export type Props = {
    blocks: Block[]
}

function Blocks(props: Props){

    const [blocks, setBlocks] = useState(props.blocks);

    useEffect( () => {
        setBlocks(props.blocks);
    }, [props.blocks]);
    
    const blocks_box = blocks.map( (block: Block) => <BlockBox block={block} /> );

    return(
        <div style={common_style.clear_path}>
            {blocks_box}
        </div>
    )
}

export default Blocks;

/****
 * 
 BLOCK JSON structure:

 {
    "header": {
      "compact_target": "0x1e083126",
      "dao": "0xb5a3e047474401001bc476b9ee573000c0c387962a38000000febffacf030000",
      "epoch": "0x7080018000001",
      "hash": "0xa5f5c85987a15de25661e5a214f2c1449cd803f071acc7999820f25246471f40",
      "nonce": "0x0",
      "number": "0x400",
      "parent_hash": "0xae003585fa15309b30b31aed3dcf385e9472c3c3e93746a6c4540629a6a1ed2d",
      "proposals_hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "timestamp": "0x5cd2b117",
      "transactions_root": "0xc47d5b78b3c4c4c853e2a32810818940d0ee403423bea9ec7b8e566d9595206c",
      "uncles_hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "version": "0x0"
    },
    "proposals": [],
    "transactions": [
      {
        "cell_deps": [],
        "hash": "0x365698b50ca0da75dca2c87f9e7b563811d3b5813736b8cc62cc3b106faceb17",
        "header_deps": [],
        "inputs": [
          {
            "previous_output": {
              "index": "0xffffffff",
              "tx_hash": "0x0000000000000000000000000000000000000000000000000000000000000000"
            },
            "since": "0x400"
          }
        ],
        "outputs": [
          {
            "capacity": "0x18e64b61cf",
            "lock": {
              "args": "0x",
              "code_hash": "0x28e83a1277d48add8e72fadaa9248559e1b632bab2bd60b27955ebc4c03800a5",
              "hash_type": "data"
            },
            "type": null
          }
        ],
        "outputs_data": [
          "0x"
        ],
        "version": "0x0",
        "witnesses": [
          "0x450000000c000000410000003500000010000000300000003100000028e83a1277d48add8e72fadaa9248559e1b632bab2bd60b27955ebc4c03800a5000000000000000000"
        ]
      }
    ],
    "uncles": []
  }
 * 
 * 
 */