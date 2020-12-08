import React, {useState} from 'react';
import {
    HexString,
    WitnessArgs,
    RawTransaction,
    Cell,
    Message
} from '../types/blockchain';
import FreshButton from './widget/fresh_button';
import Api from '../api/blockchain';
import {notify} from './widget/notify';

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
        <div>
            <p>this will show the message generated to sign.</p>
            <p>click the button below to start.</p>
            <FreshButton isLoading={isLoading} text={'generate message'} onClick={generateMessage}></FreshButton>
            <p>
                the message to be signed: {message}
            </p>
        </div>
    )
}
