/** 
 * this is a simple hex to decimal reverse converter component
 * to help user figure out the capacity number.
*/

import React, { useState, useRef } from 'react';
import FreshButton from '../../widget/fresh_button';
import common_style from '../../widget/common_style'; 
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import {notify} from '../../widget/notify';

const styles = {
    caculator_box: {
        border: '1px solid white',
        padding: '20px'
    },
    input: {
        outline: common_style.main_color.color,
        padding: '10px',
        background: 'white',
        width: '90%',
        borderRadius: '3px',
        border: '1px solid white',
        fontSize: '16px'
    },
    btn: {
        marginRight: '5px'
    },
    result: {
        border: '1px solid white',
        padding: '10px',
        fontSize: '16px',
        width: '90%',
        height: '100%',
        overflowWrap: 'anywhere' as const,
    }
}

export type Hex2DecProps = {
    custom_style?: CSSProperties
}

export default function Hex2Dec(props: Hex2DecProps){

    const { custom_style } = props;

    const ref = useRef<HTMLInputElement>(null);
    const [isReversed, setIsReversed] = useState(false);
    const [result, setResult] = useState('');

    const reverse = () => {
        setIsReversed(!isReversed);
    }

    const hex2dec = () => {
        if(ref.current){
            const hex_data = ref.current.value;
            if(hex_data.slice(0,2) !== "0x"){
                notify('16进制数字需要以0x开头！');
                return;
            }
            try {
                setResult( ''+BigInt(hex_data).toString(10) );
            } catch (error) {
                notify(error.message);
            }
        }else{
            notify('something went wrong..');
        }
    }

    const dec2hex = () => {
        if(ref.current){
            const dec_data = ref.current.value;
            try {
                setResult( '0x' + BigInt(dec_data).toString(16) );
            } catch (error) {
                notify(error.message);
            }
        }else{
            notify('something went wrong..');
        }
        
    }

    return(
        <div style={ custom_style != undefined ? {...styles.caculator_box, ...custom_style} : styles.caculator_box}>
            <p>Convert {isReversed?'Decimal':'Hex'} to {isReversed?'Hex':'Decimal'} </p>
            <input ref={ref} type="text" style={styles.input} placeholder={isReversed?'十进制':'十六进制，以 0x 开头'} />
            <p>
                <FreshButton onClick={ isReversed ? dec2hex : hex2dec } text={'转换'} />
                &#160;
                <FreshButton onClick={ reverse } text={'对调'} />
            </p>
            <div style={styles.result}>
               结果： {result}
            </div>
        </div>
    )
}