import React, { useState } from 'react';
import { Cell, CellDep, Input } from '../../../../types/blockchain';
import SingleCell from './Cell';
import DragCellToInput from './DragCellToInput';

export type DragCell2InputBallProps = {
    get_contents?: (cells: Cell[], cell_deps: CellDep[], inputs: Input[]) => void
}

export default function DragCellToInputBall(props: DragCell2InputBallProps){

    const {get_contents} = props;

    const generateInputBall =  (cells: Cell[], cell_deps: CellDep[], inputs: Input[]) => {

        if(get_contents !== undefined){
             get_contents(cells, cell_deps, inputs);
        }

        return(
            <ul>
                {cells.map( (cell: Cell, index: number) => <SingleCell cell={cell} key_id={index} custom_style={{margin: '0'}} /> )}
            </ul>
        )
    }

    return(
        <DragCellToInput onDropShowing={generateInputBall} />
    )
}