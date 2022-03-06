import React from 'react';
import { Transaction, TransactionWithStatus } from '../../../../types/blockchain';
import Tx from './Tx';

const styles = {
    panel: {
        padding: '0',
        margin: '0',
        width: '100%',
        overflowX: 'hidden' as const
    }
}

export type TxsProps = {
    txs: Transaction[] | TransactionWithStatus[]
}

export default function Txs(props: TxsProps){
    const { txs } = props;

    const is_TransactionWithStatus_type = (toBeDetermined: Transaction | TransactionWithStatus): toBeDetermined is TransactionWithStatus => {
        if((toBeDetermined as TransactionWithStatus).transaction !== undefined){
            return true;
        }else{
            return false;
        }
    }
      
    const mytxs = (txs as Array<Transaction | TransactionWithStatus>).map( (tx: Transaction | TransactionWithStatus, index: string | number | undefined) => {
        if(is_TransactionWithStatus_type(tx)){
            return(
                <Tx tx={tx.transaction} key_id={index} />
            )
        }else{
            return(
                <Tx tx={tx} key_id={index} />
            )
        }
    })
    return(
        <ul style={styles.panel}>
            {mytxs}
        </ul>
    )
}
