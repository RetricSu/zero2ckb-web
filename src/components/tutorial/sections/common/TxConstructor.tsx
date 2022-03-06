import React, { useEffect, useRef, useState } from 'react';
import commonStyle from '../../../widget/common_style';
import { Grid } from '@material-ui/core';
import DragCell2InputBall from './DragCellToInputBall';
import OutputCreator from './OutputCreator';
import FreshButton from '../../../widget/fresh_button';
import CodePiece from '../../../widget/code';
import { Cell, Input, CellDep, RawTransaction, TxOutput } from '../../../../types/blockchain';
import NeonText from '../../../widget/neon_text';
import { I18nComponentsProps } from '../../../../types/i18n';

const styles = {...commonStyle, ...{
    root: {
        marginTop: '1em',
    },
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
    },
    subtitle: {
        width: '100%',
    },
    neon_text_style: {
        brand_style: {
            width: 'fit-content' as const,
            margin: '0 auto',
            padding: '5px',
            borderBottom: '0',
        }
    }
}};

export default function TxConstructor(props: I18nComponentsProps){
    const {t} = props;
    const [input_cells, setInputCells] = useState<Cell[]>([]);
    const [input_cell_deps, setInputCellDeps] = useState<CellDep[]>([]);
    const [input_cell_inputs, setInputCellInputs] = useState<Input[]>([]);
    const [tx_output, setTxOutput] = useState<TxOutput>();
    const [raw_tx, setRawTx] = useState<RawTransaction>();

    const [isClear, setIsClear] = useState(false);

    const generateJSON = () => {
        const data: RawTransaction = {...{
            version: "0x0",
            header_deps: [],
            cell_deps: input_cell_deps,
            inputs: input_cell_inputs,
            outputs: [],
            outputs_data: [],
            witnesses: Array(input_cell_inputs.length).fill('0x'),
        }, ...tx_output};
        setRawTx(data);
    }

    const clearAll = () => {
        setIsClear(true);
        setInputCells([]);
        setTxOutput({outputs:[],outputs_data:[]});
        setRawTx(undefined);

        setTimeout(() => {
            setIsClear(false);
        }, 1000);
    }


    const handleInputCellChange = (cells: Cell[], cell_deps: CellDep[], inputs: Input[]) => {
        setInputCells(cells.map(cell=>cell)); // todo: why have to init a new instance? if not, won't work.
        setInputCellDeps(cell_deps.map(c=>c));
        setInputCellInputs(inputs.map(i=>i));
    };

    const handleOutputChange = (tx_output: TxOutput) => {
        setTxOutput(tx_output);
    }

    return(
        <div style={styles.root}>
            <div style={{textAlign:'center'}}> </div>
            <Grid container spacing={1}>
                <Grid item xs={5}>
                    <div style={styles.input_box}>
                        <div style={styles.subtitle}>
                        <NeonText text={'input'.toUpperCase()} custom_style={styles.neon_text_style}/>
                        </div>
                        <DragCell2InputBall t={t} get_contents={handleInputCellChange} onClearCall={isClear} makeOriginCellHidden={false} />
                    </div>
                </Grid>
                <Grid item xs={2} style={styles.covert_label}>
                    <h4> </h4>
                ➪
                </Grid>
                <Grid item xs={5}>
                    <div style={styles.output_box}>
                        <div style={styles.subtitle}>
                            <NeonText text={'output'.toUpperCase()} custom_style={styles.neon_text_style}/>
                        </div>
                        <OutputCreator t={t} onClearCall={isClear} input_cells={input_cells} get_tx_output={handleOutputChange} />
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <FreshButton text={t("tutorial.widget.txConstructor.btnTextGen")} onClick={generateJSON} custom_style={{width:'100%', fontSize: '20px', marginTop: '10px'}} />
                </Grid>
                <Grid item xs={6}>
                    <FreshButton text={t("tutorial.widget.txConstructor.btnTextClear")} onClick={clearAll} custom_style={{width:'100%', fontSize: '20px', marginTop: '10px'}} />
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <div style={styles.json_result}>
                        <CodePiece code={raw_tx || ''} custom_style={{border: '0'}} />
                    </div> 
                </Grid>
            </Grid>
        </div>
    )
}
