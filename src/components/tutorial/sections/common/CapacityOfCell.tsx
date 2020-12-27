import React, { CSSProperties, useEffect, useState } from 'react';
import { Cell } from '../../../../types/blockchain';
import commonStyle from '../../../widget/common_style';
import CodePiece from '../../../widget/code';
import Api from '../../../../api/blockchain';
import {notify} from '../../../widget/notify';
import utils from '../../../../utils/index';

const styles = {...commonStyle, ...{
        root: {
            width: '100%',
            clear: 'both' as const,
            textAlign: 'center' as const,
            margin: '2em 0',
            border: '1px solid gray',
            padding: '10px',
        },
        cell_panel: {
            width: '108px',
            height: '108px',
            listStyle: 'none',
            margin: '0 auto',
            marginBottom: '10px',
            padding: '10px',
            borderRadius: '100%',
        },
        ball: {
            width: '100%',
            height: '100%',
            borderRadius: '100%',
            border: '1px solid ' + commonStyle.main_color.color,
            textAlign: 'center' as const,
            overflowY: 'scroll' as const,
            overflowX: 'hidden' as const,
            justifyContent: 'center' as const,
            fontSize: '10px',
            alignItems: 'center' as const,
        },
        ball_hover: {
            background: 'gray'
        },
        cell_content: {
            margin: '30% auto',
        },
        space_result: {
            textAlign: 'left' as const,
        }
    }
}

export type CapacityOfCellProps = {
    cell: Cell
    custom_style?: CSSProperties
}

// todo: make input only accept chinese word or caculate the english text as well.

export default function CapacityOfCell (props: CapacityOfCellProps){
    const { cell } = props;
    const [myCell, setMyCell] = useState<Cell>(cell);
    const [totalbyteLength, setTotalByteLength] = useState('61');

    const [isHover, setIsHover] = useState(false);
    const hovering = () => {setIsHover(true);}
    const unhover = () => {setIsHover(false);}
    
    const handleInputChange = (text: string) => {
        const data = '0x' + toHex(text);
        setMyCell({...myCell, ...{data: data}});

        const datalength = getByteLengthOfHexString(data);
        setTotalByteLength((61+datalength).toString());
    }

    const getByteLengthOfCell = async () => {
        const api = new Api();
        const result = await api.getMinimalCellCapacity(myCell);
        if(result.status === 'ok'){
            setTotalByteLength(utils.shannon2CKB(result.data));
        }else{
            notify(result.data);
        }
           
    }

    const getByteLengthOfHexString = (str: string) => {
        var s = str.length - 2; //remove 0x
        return s / 2;
    }

    const getCellPropertyByteLength = () => {
        const b2 = getByteLengthOfHexString(myCell.cell_output.lock.args);
        const b5 = getByteLengthOfHexString(myCell.data);
        return {
            capacity: '8 Bytes',
            lock: {
                args: b2 + ' Bytes',
                code_hash: '32 Bytes',
                hash_type: '1 Bytes',
            },
            data: b5 + ' Bytes'
        }
    }

    function toHex(str: string) {
        var result = '';
        for (var i=0; i<str.length; i++) {
          result += str.charCodeAt(i).toString(16);
        }
        return result;
    }

    // useEffect(()=>{
    //     getByteLengthOfCell();
    // }, [myCell]);

    const isCapacityEnouge = BigInt(utils.shannon2CKB(utils.hex2dec(myCell.cell_output.capacity))) > BigInt(totalbyteLength) ? 
        `capacity: ${myCell.cell_output.capacity} = ${utils.shannon2CKB(utils.hex2dec(myCell.cell_output.capacity))} > 实际占用空间：${totalbyteLength}, ✅`
        :  
        `capacity: ${myCell.cell_output.capacity} = ${utils.shannon2CKB(utils.hex2dec(myCell.cell_output.capacity))} < 实际占用空间：${totalbyteLength}, ❌`;

    return(
        <div style={styles.root}>
            <div style={styles.input_wrap}>
                <input onChange={(e)=>{handleInputChange(e.currentTarget.value)}} placeholder="data：输入汉字.." type="text" style={styles.input}/>
            </div>
            <div style={{...styles.cell_panel, ...props.custom_style}} onMouseEnter={hovering} onMouseLeave={unhover}>          
                <div style={ isHover ? {...styles.ball, ...styles.ball_hover} : styles.ball } >
                    <div style={styles.cell_content}>
                        占用空间 <br/><br/>
                        {totalbyteLength} Bytes
                    </div>
                </div>
            </div>
            <div style={styles.space_result}>
                Cell 的内容：
                <CodePiece code={ JSON.stringify(myCell, null, 2) } custom_style={{padding: '5px', border:'1px solid gray'}}/>
                每个字段占用空间大小：
                <CodePiece code={JSON.stringify({...{total: totalbyteLength + ' Bytes'}, ...getCellPropertyByteLength()}, null, 2)} custom_style={{padding: '5px', border:'1px solid gray'}}/>
                Cell 容量是否足够：
                <CodePiece code={ isCapacityEnouge } custom_style={{padding: '5px', border:'1px solid gray'}}/>
            </div>
        </div>
    )
}