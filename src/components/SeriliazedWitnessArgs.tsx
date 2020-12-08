import React, {useState} from 'react';
import { notify } from './widget/notify';
import Api from '../api/blockchain';
import Form from './widget/form';

export default function SeriliazedWitnessArgs(){
    const [witness, setWitness] = useState('');

    const form_template = `{
        lock: "..."
    }`

    const seriliazed_witness = async (witnessArgs: string) => {
        const api = new Api();
        const res = await api.getSeriliazedWitness(witnessArgs);
        console.log(res);
        if(res.status == 'ok'){
            setWitness(res.data);
        }
        else{
            notify(res.data);
        }
    }

    return(
        <div>
            <Form form_template={form_template} onSubmit={seriliazed_witness} btn_text={'序列化witnessArgs'}></Form>
            <p> witness: {witness}</p>
        </div>
    )
}