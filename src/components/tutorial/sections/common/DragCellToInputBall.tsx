import React, { useState } from 'react';
import { Cell, CellDep, Input } from '../../../../types/blockchain';
import SingleCell from './Cell';
import DragCellToInput from './DragCellToInput';

export default function DragCellToInputBall(){

    const generateInputBall = (cells: Cell[], cell_deps: CellDep[], inputs: Input[]) => {
        return(
            <ul>
                {cells.map( (cell: Cell, index: number) => <SingleCell cell={cell} key_id={index} /> )}
            </ul>
        )
    }

    return(
        <DragCellToInput onDropShowing={generateInputBall} />
    )
}