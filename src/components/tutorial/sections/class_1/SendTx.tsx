import React, {useState} from 'react';
import FreshButton from '../../../widget/fresh_button';
import { notify } from '../../../widget/notify';
import Api from '../../../../api/blockchain';
import commonStyle from '../../../widget/common_style';
import type {
    Transaction
} from '../../../../types/blockchain';

const styles = {...commonStyle, ...{
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
}}

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
            notify('transaction is undefined. 请补充完上面的交易表格，然后点击保存按钮。');
        }
        setIsLoading(false);
    }

    return(
        <div style={styles.root}>
            <FreshButton isLoading={isLoading} text={'发送交易'} onClick={sendTx} custom_style={{width:'100%', fontSize: '16px'}}></FreshButton>
            <div style={styles.result}>
                <p>tx_hash: {tx_hash} </p>
            </div>
        </div>
    )
}