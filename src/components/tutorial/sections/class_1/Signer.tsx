import React, { useState, useRef } from 'react';
import FreshButton from '../../../widget/fresh_button';
import Api from '../../../../api/blockchain';
import { notify } from '../../../widget/notify';

const styles = {
    input: {
        width: '100%',
        padding: '10px',
        margin: '10px'
    }
}

export default function Signer(){

    const [isLoading, setIsLoading] = useState(false);
    const [signature, setSignature] = useState('');
    const msg_ref = useRef<HTMLInputElement>(null);
    const key_ref = useRef<HTMLInputElement>(null);

    const sign_message = async () => {
        setIsLoading(true);
        const msg = msg_ref.current?.value || '';
        const key = key_ref.current?.value || '';
        const api = new Api();
        const sig = await api.getSignature(msg, key);
        if(sig.status === "ok")
            setSignature(sig.data);
        else notify(sig.data);
        
        setIsLoading(false);
    }

    return(
        <div>
            <input style={styles.input} ref={msg_ref} placeholder={'message'} type="text"/>
            <input style={styles.input} ref={key_ref} placeholder={'private key'} type="text"/>
            <FreshButton isLoading={isLoading} onClick={sign_message} text={'签名'}></FreshButton>
            <div>
                <p>result:  {signature} </p>
            </div>
        </div>
    )
}