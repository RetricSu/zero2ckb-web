import React, { useState } from 'react';
import Api from '../../../../api/blockchain';
import {
    RawTransaction,
} from '../../../../types/blockchain';
import FreshButton from '../../../widget/fresh_button';
import { notify } from '../../../widget/notify';

const styles = {
    root: {
        width: '100%',
        padding: '10px 0px',
    },
    result: {
        padding: '10px',
        border: '1px solid gray',
        marginTop: '5px',
        overflowWrap: 'break-word' as const,
    }
}

export type Props = {
    raw_tx: RawTransaction | undefined
}

export default function ToTxHash(props: Props){
    const [hash, setHash] = useState('');

    const generateTxHash = async () => {
        const api = new Api();
        if(props.raw_tx){
            const res = await api.generateTxHash(props.raw_tx);
            if(res.status == 'ok'){
                setHash(res.data);
            }
            else{
                notify(res.data);
            }
        }else{
            notify('raw transaction is undefined');
        }
    }

    return(
        <div style={styles.root}>
            <FreshButton text={'生成 tx_hash'} onClick={generateTxHash} custom_style={{width:'100%', fontSize: '16px'}}/>
            <div style={styles.result}>
                <p>{hash}</p>
            </div>
        </div>
    )
}