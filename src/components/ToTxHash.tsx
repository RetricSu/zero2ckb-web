import React, { useState } from 'react';
import Api from '../api/blockchain';
import {
    RawTransaction,
} from '../types/blockchain';
import FreshButton from './widget/fresh_button';
import { notify } from './widget/notify';

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
    const [isLoading, setIsLoading] = useState(false);
    const [hash, setHash] = useState('');

    const generateTxHash = async () => {
        setIsLoading(true);
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
            notify('raw transaction is undefined');
        }
        setIsLoading(false);
    }

    return(
        <div style={styles.result}>
            <FreshButton isLoading={isLoading} text={'生成交易的哈希'} onClick={generateTxHash} />
            <div >
                结果：{hash}
            </div>
        </div>
    )
}