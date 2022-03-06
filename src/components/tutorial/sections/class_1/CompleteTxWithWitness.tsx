import React, { useRef, useState } from 'react';
import { RawTransaction, Transaction } from '../../../../types/blockchain';
import commonStyle from '../../../widget/common_style';
import CodePiece from '../../../widget/code';
import FreshButton from '../../../widget/fresh_button';
import { I18nComponentsProps } from '../../../../types/i18n';

const styles = {...commonStyle, ...{
    input_wrap: {
        padding: '5px',
        marginBottom: '10px',
        display: 'block',
        background: 'white',
    },
    input: {
        width: '100%',
        outline: 'none',
        lineHeight: '2em',
        fontSize: '16px',
        border: '0',
    },
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

export interface CompleteTxWithWitnessProps extends I18nComponentsProps {
    raw_tx: RawTransaction
    onCallBack?: (tx: Transaction) => void
}

export default function CompleteTxWithWitness(props: CompleteTxWithWitnessProps){
    const {t, raw_tx, onCallBack} = props;
    const [tx, setTx] = useState<Transaction>();
    const ref = useRef<HTMLInputElement>(null);

    const onCompleteTx = () => {
        var rtx = eval('`' + JSON.stringify(raw_tx).substring(1, JSON.stringify(raw_tx).length-1) + '`');
        rtx = JSON.parse(JSON.stringify(rtx));
        const myTx = {...rtx, ...{
            witnesses: [ref.current?.value]
        }}
        setTx(myTx);

        if(onCallBack && myTx)
            onCallBack(myTx);
    }

    return(
        <div style={styles.root}>
            <span style={styles.input_wrap}>
                <input style={styles.input} ref={ref} placeholder={'witnesses'} type="text"/>
            </span>
            <FreshButton onClick={onCompleteTx} text={'witnesses 加入 raw_tx'} custom_style={{width:'100%', fontSize: '16px'}} ></FreshButton>
            <div style={styles.result}>
                <CodePiece code={tx || ''} custom_style={{border: '0', padding: '10px'}} />
            </div>
        </div>
    )
}