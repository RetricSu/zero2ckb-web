import React, { useState } from 'react';
import Api from '../../../../api/blockchain';
import {
    RawTransaction,
} from '../../../../types/blockchain';
import FreshButton from '../../../widget/fresh_button';
import { notify } from '../../../widget/notify';
import CodePiece from '../../../widget/code';

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
    const [serializeTx, setSerializeTx] = useState('');

    const generateSerializeTx = async () => {
        const api = new Api();
        if(props.raw_tx){
            const res = await api.generateSerializeTx(props.raw_tx);
            console.log(res);
            if(res.status == 'ok'){
                setSerializeTx(res.data);
            }
            else{
                notify(res.data);
            }
        }else{
            notify('raw transaction is undefined. 请补充完上面的交易表格，然后点击保存按钮。');
        }
    }

    const generateTxHash = async () => {
        await generateSerializeTx();

        const api = new Api();
        if(props.raw_tx){
            const res = await api.generateTxHash(props.raw_tx);
            console.log(res);
            if(res.status == 'ok'){
                setHash(res.data);
            }
            else{
                notify(res.data);
            }
        }else{
            notify('raw transaction is undefined. 请补充完上面的交易表格，然后点击保存按钮。');
        }
    }

    return(
        <div style={styles.root}>
            <div style={styles.result}>
                the serialized Transaction before hash function:
                <CodePiece code={serializeTx || ''} custom_style={{border: '0'}} />
            </div>
            <FreshButton text={'生成 tx_hash'} onClick={generateTxHash} custom_style={{width:'100%', fontSize: '16px'}}/>
            <div style={styles.result}>
                <p>tx_hash: {hash}</p>
            </div>
        </div>
    )
}