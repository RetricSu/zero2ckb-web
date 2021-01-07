import React, {useState} from 'react';
import FreshButton from '../../../widget/fresh_button';
import { notify } from '../../../widget/notify';
import Api from '../../../../api/blockchain';
import commonStyle from '../../../widget/common_style';
import type {
    Block,
    Transaction
} from '../../../../types/blockchain';
import BlockBox from '../common/Block';
import Firework from '../../../widget/fireworks/firework';
import PopFirework from '../../../widget/fireworks/animate';

const styles = {...commonStyle, ...{
    root: {
        width: '100%',
        padding: '10px 0px',
        clear: 'both' as const,
    },
    result: {
        padding: '10px',
        border: '1px solid gray',
        marginTop: '5px',
        overflowWrap: 'break-word' as const,
    },
    block_panel: {
        padding: '10px',
        border: '1px solid gray',
        marginTop: '5px',
        textAlign: 'center' as const,
        clear: 'both' as const,
    }
}}

export type Props = {
    tx: Transaction | undefined
}

export default function SendTx(props: Props){
    const [tx_hash, setTxHash] = useState('');
    const [block, setBlock] = useState<Block>();
    
    const sendTx = async () => {
        const api = new Api();
        if(props.tx){
            const res = await api.sendTx(props.tx);
            if(res.status == 'ok'){
                setTxHash(res.data);
                PopFirework();
            }
            else{
                notify(res.data);
            }
        }else{
            notify('tx is undefined. 请补充完上面的交易表格，然后点击保存按钮。');
        }
    }

    const fetchBlock = async () => {
        
        if(!tx_hash){
            notify('tx hash is empty.');
            return;
        }

        const api = new Api();
        const res2 = await api.getBlockByTxHash(tx_hash);
        console.log(res2);
        if(res2.status === 'ok'){
            setBlock(res2.data)
        }else{
            notify(res2.data);
        }
    }

    return(
        <div style={styles.root}>
            <FreshButton text={'发送交易'} onClick={sendTx} custom_style={{width:'100%', fontSize: '16px'}}></FreshButton>
            <div style={styles.result}>
                <p>tx_hash: {tx_hash} </p>
            </div>
            <div style={styles.explain_text}>
                <p>注意看下，交易成功上链后返回的 tx_hash，是不是和之前事先生成的那个 tx_hash 一模一样？</p>
                <p>CKB 的确定性诚不欺我。</p>
                <p>现在，你可以通过下面的按钮，看看刚才我们发送的交易是不是真的在链上了。如果提示 <span style={styles.single_line_code}>tx_status: pending</span> , 则表明交易还在pending，稍后重试就可以了。</p>
            </div>
            
            <FreshButton text={'查看打包了该交易的区块'} onClick={fetchBlock} custom_style={{width:'100%', fontSize: '16px'}}></FreshButton>
            <div style={styles.block_panel}>
                <p>
                    { block &&
                        <BlockBox block={block} custom_style={{float: 'none', margin:'0 auto'}} />
                    }
                </p>
            </div>
            <Firework />
        </div>
    )
}