import React from 'react';
import { Cell, CellDep, Input } from '../../../../types/blockchain';
import CodePeice from '../../../widget/code';
import DragCellToInput from './DragCellToInput';

export default function DragCellToInputJson(){

    const generateInputJson = (cells: Cell[], cell_deps: CellDep[], inputs: Input[]) => {
        const data = {
            cell_deps: cell_deps,
            inputs: inputs
        }
        return <CodePeice custom_style={{border:'0'}} code={JSON.stringify(data, null, 2)} />
    }

    return(
        <DragCellToInput onDropShowing={generateInputJson} />
    )
}