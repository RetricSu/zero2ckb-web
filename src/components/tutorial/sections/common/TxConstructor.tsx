import React, { useEffect, useState } from 'react';
import commonStyle from '../../../widget/common_style';
import { Grid } from '@material-ui/core';
import DragCell2InputBall from './DragCellToInputBall';
import OutputCreator from './OutputCreator';
import FreshButton from '../../../widget/fresh_button';
import CodePiece from '../../../widget/code';
import { Cell, Input, CellDep } from '../../../../types/blockchain';

const styles = {...commonStyle, ...{
    input_box: {
        textAlign: 'center' as const,
    },
    output_box: {
        textAlign: 'center' as const,
    },
    covert_label: {
        minHeight: '200px',
        textAlign: 'center' as const,
        fontSize: '50px',
        marginTop: '60px',
    },
    json_result: {
        width: '100%',
        minHeight: '200px',
        border: '1px solid gray',
        marginTop: '10px',
    }
}};

export default function TxConstructor(){
    const [json_tx, setJsonTx] = useState<string>('');
    
    const [input_cells, setInputCells] = useState<Cell[]>([]);

    const generateJSON = () => {
        let c: Cell = {
            cell_output: {
                capacity: '0xffffffffffffff',
                lock: {
                    code_hash: '',
                    hash_type: 'type',
                    args: '',
                },
            },
            data: '0x'
        }
        setInputCells([c]);
    }

    const data: Cell[] = [{
        cell_output: {
            capacity: '0xffffffffffffff',
            lock: {
                code_hash: '',
                hash_type: 'type',
                args: '',
            },
        },
        data: '0x'
    }]

    const handlerInputCellChange = (cells: Cell[], cell_deps: CellDep[], inputs: Input[]) => {
        setInputCells(cells.map(cell=>cell));
        console.log(input_cells);
    };

    return(
        <div>
            {input_cells.length}
            <Grid container spacing={1}>
                <Grid item xs={5}>
                    <div style={styles.input_box}>
                        <h4>{'Input'.toUpperCase()}</h4>
                        <DragCell2InputBall  />
                    </div>
                </Grid>
                <Grid item xs={2} style={styles.covert_label}>
                    <h4> </h4>
                ➪
                </Grid>
                <Grid item xs={5}>
                    <div style={styles.output_box}>
                        <h4>{'Output'.toUpperCase()}</h4>
                        
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <FreshButton text={'生成JSON'} onClick={generateJSON} custom_style={{width:'100%', fontSize: '20px', marginTop: '10px'}} />
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <div style={styles.json_result}>
                        <CodePiece code={json_tx} custom_style={{border: '0'}} />
                    </div> 
                </Grid>
            </Grid>
        </div>
    )
}
/** 
 * <OutputCreator input_cells={input_cells} />
*/