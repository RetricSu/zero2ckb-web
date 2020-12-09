import React, { useState } from 'react';
import Api from '../../../../api/blockchain';
import {
    RawTransaction,
} from '../../../../types/blockchain';
import FreshButton from '../../../widget/fresh_button';
import { notify } from '../../../widget/notify';

const styles = {
    result: {
        width: '100%',
        padding: '10px'
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
        <div style={styles.result}>
            <FreshButton text={'生成交易的哈希'} onClick={generateTxHash} />
            <div >
                结果：{hash}
            </div>
        </div>
    )
}