import React, {useState} from 'react';
import {
    HexString,
    WitnessArgs,
    RawTransaction,
    Cell,
    Message
} from '../../../../types/blockchain';
import FreshButton from '../../../widget/fresh_button';
import Api from '../../../../api/blockchain';
import {notify} from '../../../widget/notify';
import commonStyle from '../../../widget/common_style';

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
}};

export type Props = {
    raw_tx: RawTransaction | undefined,
    witnessArgs: WitnessArgs[],
}

export default function FetchToSignMessage(props: Props){
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const generateMessage = async () => {
        setIsLoading(true);
        if(props.raw_tx){
            const api = new Api();
            const result = await api.getToSignMessage(props.raw_tx, props.witnessArgs);
            console.log(result, typeof result);
            if(result.status === "ok"){
                const msgs = result.data.map( (m: Message) => <li>{m.message}</li>);
                setMessage(msgs);
            }else{
                notify(result.data);
            }
        }else{
            notify('raw_tx is undefind.')
        }
        setIsLoading(false);
    }
    return(
        <div style={styles.root}>
            <FreshButton isLoading={isLoading} text={'生成 message'} onClick={generateMessage} custom_style={{width:'100%', fontSize: '16px'}} />
            <div style={styles.result}>
                <p>{message}</p>
            </div>
        </div>
    )
}
