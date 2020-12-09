import React, { useState, useEffect } from 'react';
import Api from '../../../../api/blockchain';
import { QueryOption } from '../../../../types/blockchain';
import FreshButton from "../../../widget/fresh_button";
import commonStyles from "../../../widget/common_style";
import {
    TransactionWithStatus
} from "../../../../types/blockchain";
import CodePiece from '../../../widget/code';

const styles = {...commonStyles, ...{
    list_panel: {
        margin: '20px',
    },
    tx_panel: {
        width: "600px",
        border: "1px solid white",
        float: "left" as const,
        marginRight: "20px",
        padding: "10px",
        listStyleType: "none",
        overflow: "scroll",
        fontSize: "10px",
        display: "block",
        textAlign: 'left' as const
    },
}};

export type Props = {
    query: QueryOption,
    render_dep?: any,
    length?: number
}

export default function WalletTransaction(props: Props){
    
    const [txs, setTxs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    async function fetchTransactions() {
        setIsLoading(true);
        const api = new Api();
        const length = props.length || 10;
        var txs = await api.getTransactions(props.query);
        txs = txs.slice(0, length);
        setTxs(txs.map((tx:TransactionWithStatus, index:number) => <li key={index} style={styles.tx_panel}>
            <CodePiece code={JSON.stringify(tx, null, 2)} />
        </li>));
        setIsLoading(false);
    }

    useEffect(()=>{
        if(props.render_dep)
            fetchTransactions();
    }, [props.render_dep])

    return(
        <div style={styles.list_panel}>
            <p>
               <FreshButton isLoading={isLoading} onClick={fetchTransactions} text='刷新'></FreshButton>
            </p>
           {txs}
           <p style={{clear: "both"}} />
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