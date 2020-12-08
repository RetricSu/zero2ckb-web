/** 
 * this is a simple hex to decimal reverse converter component
 * to help user figure out the capacity number.
*/

import React, { useState, useRef } from 'react';

const styles = {
    caculator_box: {
        border: '1px solid white',
        padding: '20px'
    }
}

export default function Hex2Dec(){

    const ref = useRef<HTMLInputElement>(null);
    const [isReversed, setIsReversed] = useState(false);
    const [result, setResult] = useState('');

    const reverse = () => {
        setIsReversed(!isReversed);
    }

    const hex2dec = () => {
        if(ref.current){
            const hex_data = ref.current.value;
            setResult( BigInt(hex_data).toString(10) );
        }else{
            console.log('something went wrong..');
        }
    }

    const dec2hex = () => {
        if(ref.current){
            const dec_data = ref.current.value;
            console.log(dec_data);
            setResult( '0x' + BigInt(dec_data).toString(16) );
        }else{
            console.log('something went wrong..');
        }
        
    }

    return(
        <div style={styles.caculator_box}>
            <span>
                <p>Convert  <input ref={ref} type="text"/> {isReversed?'Decimal':'Hex'} to {isReversed?'Hex':'Decimal'} -- <button onClick={reverse}>对调</button></p>
                <p>=》 result: {result} </p>
                <p>
                  <button onClick={isReversed?dec2hex:hex2dec}>转换</button>
                </p>
            </span>
            
        </div>
    )
}