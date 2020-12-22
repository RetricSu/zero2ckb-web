import { TextField } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import Api from '../../../../api/blockchain';
import { Cell, ChainConfig } from '../../../../types/blockchain';
import commonStyle from '../../../widget/common_style';
import utils from '../../../../utils/index';

const styles = {...commonStyle, ...{
    root: {
        height: '300px',
        clear: 'both' as const,
    },
    op_panel: {
        width: '100%',
        clear: 'both' as const,
    },
    edit_cell: {
        width: '250px',
        height: '168px',
        border: '1px solid white',
        overflow: 'scroll' as const,
        float: 'left' as const,
        marginRight: '5px',
        fontSize: '13px',
        marginBottom: '5px'
    },
    final_cell: {
        width: '108px',
        height: '108px',
        borderRadius: '100%',
        border: '1px solid ' + commonStyle.main_color.color,
        textAlign: 'center' as const,
        overflowY: 'scroll' as const,
        overflowX: 'hidden' as const,
        justifyContent: 'center' as const,
        fontSize: '10px',
        alignItems: 'center' as const,
        float: 'left' as const,
    },
    input: {
        width: '100%',
        overflowX: 'scroll' as const,
        verticalAlign: 'text-bottom',
    }
}}

export type SimpleCellJson = {
    capacity: string
    lock_args: string
    data: string
}

export type PlainCellProps = {
    cell: SimpleCellJson
    config: ChainConfig | undefined
    get_final_cell?: (final_cell: SimpleCellJson | undefined) => void;
}

const PlainCell = (props: PlainCellProps) => {
    const { cell, config, get_final_cell } = props;
    const [isHidden, setIsHidden] = useState(false);
    const [final_cell, setFinalCell] = useState<SimpleCellJson>();
    const [isFinalCellOpen, setIsFinalCellOpen] = useState(false);

    const [capacity, setCapacity] = useState(cell.capacity);
    const [args, setArgs] = useState(cell.lock_args);
    const [data, setData] = useState(cell.data);

    const save_cell = () => {
        setFinalCell({
            capacity: capacity,
            lock_args: args,
            data: data
        });
        setIsHidden(true);
        setIsFinalCellOpen(true);

        if(get_final_cell){
            get_final_cell({
                capacity: capacity,
                lock_args: args,
                data: data
            });
        }
    }

    const display = isHidden ? 'none' : 'inline-block';

    return(
        <div>
            <div style={{...styles.edit_cell, display}}>
                <h3>capacity: </h3>
                <TextField onChange={(e)=>{setCapacity(e.currentTarget.value)}} style={styles.input} id="standard-basic" type="number"/>
                <hr/>
                <h3>lock: </h3>
                <TextField style={styles.input} id="standard-basic" label="code_hash" value={config?.SCRIPTS.SECP256K1_BLAKE160.CODE_HASH} disabled/>
                <TextField onChange={(e)=>{setArgs(e.currentTarget.value)}} style={styles.input} id="standard-basic" label="args" type="text" />
                <TextField style={styles.input} id="standard-basic" label="hash_type" value={config?.SCRIPTS.SECP256K1_BLAKE160.HASH_TYPE} disabled />
                <hr/>
                <h3>data:</h3>
                <TextField onChange={(e)=>setData(e.currentTarget.value)} style={styles.input} id="standard-basic" value={data} disabled />
                <p>
                    <button onClick={save_cell}>save</button> <button>cancel</button>
                </p>
            </div>
            <div style={{...styles.final_cell, ...{display: isFinalCellOpen ? 'inline-block':'none'}}}>
                capacity <br/><br/>
                {final_cell?.capacity}
            </div>
        </div>
    )
}

export type EditOutputCellsProps = {
    capacity: string
    get_distribute_cells?: (cells: Cell[]) => void
}

export default function EditOutputCells(props: EditOutputCellsProps){
    const { capacity, get_distribute_cells } = props;
    const [config, setConfig] = useState<ChainConfig>();
    const [new_cells, setNewCells] = useState<SimpleCellJson[]>([]);
    const [final_cells, setFinalCells] = useState<SimpleCellJson[]>([]);

    const add_cell = () => {
        const c: SimpleCellJson = {
            capacity: '0',
            lock_args: '0x',
            data: '0x'
        }
        setNewCells([...new_cells, c]);
    }

    async function fetchChainConfig() {
        const api = new Api();
        var config: ChainConfig = await api.getChainConfig();
        setConfig(config);
    }

    const onSaveCell = (cell: SimpleCellJson | undefined) => {
        if(cell){
            setFinalCells([...final_cells, cell]);
            console.log(cell);
        }
    }

    const apply = () => {
        if(get_distribute_cells){
            get_distribute_cells(
                final_cells.map(cell => {
                    return {
                        cell_output: {
                            capacity: '0x'+utils.dec2hex(utils.CKB2shannon(cell.capacity)),
                            lock: {
                                code_hash: config?.SCRIPTS.SECP256K1_BLAKE160.CODE_HASH || '',
                                hash_type: config?.SCRIPTS.SECP256K1_BLAKE160.HASH_TYPE || 'type',
                                args: cell.lock_args
                            }
                        },
                        data: cell.data
                    }
                })
            );
        }

    }

    useEffect(()=>{
        fetchChainConfig();
    }, []);

    return(
        <div style={styles.root}>
            <div>total capacity: { utils.shannon2CKB(utils.hex2dec(capacity)) } CKB </div>
            <button onClick={add_cell}>add</button> <button onClick={apply}>apply</button>
            <div style={styles.op_panel}>
                {new_cells.map((cell: SimpleCellJson) => {
                    return (
                        <PlainCell cell={cell} config={config} get_final_cell={onSaveCell}/>
                    )
                })}
            </div>
            <div style={{clear:'both'}}></div>
            <hr/>
            <div>
                {final_cells.length}
            </div>
        </div>
    )
}