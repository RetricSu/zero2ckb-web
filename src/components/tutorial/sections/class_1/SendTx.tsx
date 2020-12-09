import React, {useState} from 'react';
import FreshButton from '../../../widget/fresh_button';
import { notify } from '../../../widget/notify';
import Api from '../../../../api/blockchain';

import type {
    Transaction
} from '../../../../types/blockchain';

export type Props = {
    tx: Transaction | undefined
}

export default function SendTx(props: Props){
    const [isLoading, setIsLoading] = useState(false);
    const [tx_hash, setTxHash] = useState('');

    const sendTx = async () => {
        setIsLoading(true);
        const api = new Api();
        if(props.tx){
            const res = await api.sendTx(props.tx);
            console.log(res);
            if(res.status == 'ok'){
                setTxHash(res.data);
            }
            else{
                notify(res.data);
            }
        }else{
            notify('transaction is undefined');
        }
        setIsLoading(false);
    }

    return(
        <div>
            <FreshButton isLoading={isLoading} text={'发送交易上链'} onClick={sendTx} ></FreshButton>
            <p> tx_hash: {tx_hash}</p>
        </div>
    )
}