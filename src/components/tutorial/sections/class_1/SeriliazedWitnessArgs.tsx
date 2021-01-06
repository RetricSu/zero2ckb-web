import React, {useRef, useState} from 'react';
import { notify } from '../../../widget/notify';
import Api from '../../../../api/blockchain';
import commonStyle from '../../../widget/common_style';
import FreshButton from '../../../widget/fresh_button';

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

export default function SeriliazedWitnessArgs(){
    const [witness, setWitness] = useState('');
    const lock_ref = useRef<HTMLInputElement>(null);

    const seriliazed_witness = async () => {
        const witnessArgs = {
            lock: lock_ref.current?.value
        };
        const api = new Api();
        const res = await api.getSeriliazedWitness(witnessArgs);
        if(res.status === 'ok'){
            setWitness(res.data);
        }
        else{
            notify(res.data);
        }
    }

    return(
        <div style={styles.root}>
            <span style={styles.input_wrap}>
                <input style={styles.input} ref={lock_ref} placeholder={'lock: witness'} type="text"/>
            </span>
            <FreshButton onClick={seriliazed_witness} text={'序列化 witnessArgs'} custom_style={{width:'100%', fontSize: '16px'}} ></FreshButton>
            <div style={styles.result}>
                <p>{witness} </p>
            </div>
        </div>
    )
}