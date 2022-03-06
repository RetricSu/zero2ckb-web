import React from 'react';
import { Cell, TxOutput } from '../../../../types/blockchain';
import { I18nComponentsProps } from '../../../../types/i18n';
import TotalCapacity from './TotalCapacity';

export interface OutputCreatorProps extends I18nComponentsProps {
    input_cells: Cell[]
    get_tx_output?: (txo: TxOutput) => void
    onClearCall?: boolean
}

export default function OutputCreator(props: OutputCreatorProps){
    const {t, input_cells, get_tx_output, onClearCall} = props;
    return(
        <TotalCapacity t={t} cells={input_cells} get_tx_output={get_tx_output} onClearCall={onClearCall}/>
    )
}
