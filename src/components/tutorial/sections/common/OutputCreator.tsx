import React, { useEffect, useState } from 'react';
import { Cell } from '../../../../types/blockchain';
import commonStyle from '../../../widget/common_style';
import TotalCapacity from './TotalCapacity';

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


const TxFee = () => {
    return(
        <div style={styles.fee}>
            矿工手续费：
        </div>
    )
}

export type OutputCreatorProps = {
    input_cells: Cell[]
}

export default function OutputCreator(props: OutputCreatorProps){
    const {input_cells} = props;
    return(
        <div style={styles.root}>
            <TotalCapacity cells={input_cells} />
            <TxFee />
        </div>
    )
}