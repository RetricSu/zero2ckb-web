import React, { useState, useEffect } from 'react';
import Api from '../api/blockchain';
import { QueryOption } from '../types/blockchain';

const styles = {
    list_panel: {
        margin: '20px'
    }
};

export type Props = {
    query: QueryOption,
    length?: number
}

export default function Transaction(props: Props){
    
    const [txs, setTxs] = useState([]);

    useEffect(() => {   
        fetchTransactions();
    }, []);
    
    async function fetchTransactions() {
        const api = new Api();
        const length = props.length || 10;
        var txs = await api.getTransactions(props.query);
        txs = txs.slice(0, length);
        setTxs(txs.map((tx:string, index:number) => <li key={index}>{JSON.stringify(tx)}</li>));
    }

    return(
        <div style={styles.list_panel}>
           {txs}
        </div>
    )
}


/**   
 * 
 * {
[1]     transaction: {
[1]       cell_deps: [],
[1]       hash: '0xac10b54d29cb66c0484faf1e6b1eb1cea4a481c21f1758e82ed6040db1cacfac',
[1]       header_deps: [],
[1]       inputs: [Array],
[1]       outputs: [Array],
[1]       outputs_data: [Array],
[1]       version: '0x0',
[1]       witnesses: [Array]
[1]     },
[1]     tx_status: {
[1]       block_hash: '0x21822a9bc055a6223f45c3311a5802b837e7b441f0e9497d0758d8b29a8e8d9e',
[1]       status: 'committed'
[1]     }
[1]   },
 * 
 * 
 */