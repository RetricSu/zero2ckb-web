import React, { useEffect, useState } from 'react';
import { Cell } from '../../../../types/blockchain';
import commonStyle from '../../../widget/common_style';
import FreshButton from '../../../widget/fresh_button';
import SingleCell from './Cell';
import utils from '../../../../utils/index';
import JSBI from 'jsbi';

const styles = {...commonStyle, ...{
    root: {
        width: '100%',
        border: '1px solid gray',
        height: '200px',
    },
    capacity: {
        width: '100%',
        height: '80%',
        paddingTop: '5px',
        
    },
    capacity_header: {
        height: '20%',
        overflowY: 'hidden' as const,
    },
    header_number: {
        width: '30%',
        overflowX: 'scroll' as const,
        display: 'inline-block' as const,
        verticalAlign: 'text-bottom' as const,
        background: 'white',
        color: 'black',
        padding: '0 5px',
        marginRight: '5px',
    },
    output_cell: {
        textAlign: 'center' as const,
        height: '80%',
        overflowY: 'scroll' as const,
        background: 'white',
        color: 'black',
    },
    fee: {
        position: 'relative' as const,
        bottom: '0px',
        width: '100%',
        height: '15%',
        borderTop: '1px solid gray',
        paddingTop: '5px',
        background: 'black',
        fontSize: '16px',
    }
}};

export type TotalCapacityProps = {
    cells: Cell[]
}

const caculateCellCapacity = (cells: Cell[]) => {
    var total = JSBI.BigInt(0);
    cells.forEach(cell => total = JSBI.ADD(total, JSBI.BigInt(cell.cell_output.capacity)));
    return '0x' + total.toString(16);
}

export default function TotalCapacity (props: TotalCapacityProps) {
    const {cells} = props;
    const [capacity, setCapacity] = useState('0x0');

    const [mycells, setMycells] = useState<Cell[]>([]);
    
    const default_one_cell = (cap: string) => {
        let c: Cell = {
            cell_output: {
                capacity: cap,
                lock: {
                    code_hash: '',
                    hash_type: 'type',
                    args: '',
                },
            },
            data: '0x'
        }
        mycells.push(c);
    }
    
    useEffect(()=>{
        let sum = caculateCellCapacity(cells);
        if(cells.length !== 0){
            default_one_cell(sum);
            updateCapacity(cells);
        }
        
    }, [cells]);

    const updateCapacity = async (cells: Cell[]) => {
        let sum = caculateCellCapacity(cells);
        await setCapacity(sum);
    }

    const distribute = () => {
        setCapacity('0xff');
    }


    return(
        <div style={styles.capacity}>
           <div style={styles.capacity_header}>
                <div style={{display:'inline-block'}}>总空间：</div> 
                <div style={styles.header_number}>{ utils.shannon2CKB(utils.hex2dec(capacity)) }</div>
                <div style={{display:'inline-block'}}>CKB | </div> 
                <FreshButton text="⚙️ 设置" onClick={distribute} custom_style={{border:'0', padding: '2px', marginLeft: '5px', fontSize: '16px'}} />
           </div>
           <div style={styles.output_cell}>
                { mycells.map( (cell, index) => <SingleCell cell={cell} key_id={index} custom_style={{margin: '0'}} /> )}
           </div>
        </div>
    )
}