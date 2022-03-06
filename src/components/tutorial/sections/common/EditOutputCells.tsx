import React, { useEffect, useRef, useState } from 'react';
import Api from '../../../../api/blockchain';
import { Cell, ChainConfig } from '../../../../types/blockchain';
import commonStyle from '../../../widget/common_style';
import utils from '../../../../utils/index';
import { notify } from '../../../widget/notify';
import { I18nComponentsProps } from '../../../../types/i18n';

const styles = {...commonStyle, ...{
    root: {
        height: '300px',
        clear: 'both' as const,
    },
    op_panel: {
        width: '100%',
        clear: 'both' as const,
        paddingTop: '5px',
    },
    edit_cell: {
        width: '250px',
        height: '178px',
        border: '1px solid white',
        overflow: 'scroll' as const,
        float: 'left' as const,
        marginRight: '5px',
        fontSize: '13px',
        marginBottom: '5px',
        padding: '5px',
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
        margin: '5px',
    },
    final_cell_content: {
        margin: '30% auto',
    },
    right_btn: {
        float: 'right' as const
    },
    edit_cell_save_btn: {
        width: '100%',

    },
    edit_cell_label: {
        margin: '2px 0'
    },
    edit_cell_header: {
        marginBottom: '5px',
        height: '30px',
        borderBottom: '1px solid',
    },
}}

export type SimpleCellJson = {
    capacity: string
    lock_args: string
    data: string
}

export interface PlainCellProps extends I18nComponentsProps {
    cell: SimpleCellJson
    config: ChainConfig | undefined
    total_capacity: string // decimal
    get_final_cell?: (final_cell: SimpleCellJson | undefined) => void;
}

const PlainCell = (props: PlainCellProps) => {
    const { t, cell, config, get_final_cell, total_capacity } = props;
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

    const handleCapacityChange = (value: string) => {
        if(BigInt(value) < BigInt(total_capacity)){
            setCapacity(value);
        }else{
            notify(t("tutorial.widget.editOutputPlainCell.capRuleAlertMsg")+BigInt(total_capacity).toString(10));
        }
    }

    const display = isHidden ? 'none' : 'inline-block';

    const hideDisableInput = {display: 'none'};

    return(
        <div>
            <div style={{...styles.edit_cell, display}}>
                <div style={styles.edit_cell_label}>capacity: </div>
                <span style={styles.input_wrap}>
                    <input onChange={(e)=>{handleCapacityChange(e.currentTarget.value)}} max={Number(total_capacity)} style={styles.input} type="number" placeholder={t("tutorial.common.decimalInputPlaceHolder")} />
                </span>
                
                <div style={styles.edit_cell_label}>lock-args: </div>
                <span style={{...styles.input_wrap, ...hideDisableInput}}>
                    <input style={styles.input} value={'code_hash: '+config?.SCRIPTS.SECP256K1_BLAKE160.CODE_HASH} disabled/>
                </span>
                <span style={styles.input_wrap}>
                    <input onChange={(e)=>{setArgs(e.currentTarget.value)}} style={styles.input} type="text" placeholder={t("tutorial.common.hexInputPlaceHolder")} />
                </span>
                <span style={{...styles.input_wrap, ...hideDisableInput}}>
                    <input style={styles.input} value={'hash_type: ' + config?.SCRIPTS.SECP256K1_BLAKE160.HASH_TYPE} disabled />
                </span>

                <hr/>
                <div style={{...styles.input_wrap, ...hideDisableInput}}>data: </div>
                <span style={{...styles.input_wrap, ...hideDisableInput}}>
                    <input style={styles.input} value={config?.SCRIPTS.SECP256K1_BLAKE160.CODE_HASH} disabled/>
                </span>
                
                <p>
                    <button style={styles.edit_cell_save_btn} onClick={save_cell}>{t("tutorial.common.saveBtnText")}</button>
                </p>
            </div>
            <div style={{...styles.final_cell, ...{display: isFinalCellOpen ? 'inline-block':'none'}}}>
                <div style={styles.final_cell_content}>
                    capacity <br/><br/>
                    {final_cell?.capacity}
                </div>
            </div>
        </div>
    )
}

export interface EditOutputCellsProps extends I18nComponentsProps {
    capacity: string
    get_distribute_cells?: (cells: Cell[]) => void
    trigger_modal_close?: () => void
}

export default function EditOutputCells(props: EditOutputCellsProps){
    const { t, capacity, get_distribute_cells, trigger_modal_close } = props;
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
            let sum = 0;
            for( let fc of final_cells){
                sum = sum + Number(fc.capacity);
            }
            sum = sum + Number(cell.capacity);
            if(sum < Number(utils.shannon2CKB(utils.hex2dec(capacity)))){
                setFinalCells([...final_cells, cell]);
            }else{
                notify(t("tutorial.widget.editOutputCells.capRuleAlertMsg"));
            }
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
        };

        if(trigger_modal_close)
            trigger_modal_close();

    }

    useEffect(()=>{
        fetchChainConfig();
    }, []);

    return(
        <div style={styles.root}>
            <div style={styles.edit_cell_header}>
                Total Capacity: { utils.shannon2CKB(utils.hex2dec(capacity)) } CKB 
                <span style={styles.right_btn}>
                    <button onClick={add_cell}> {t("tutorial.widget.editOutputCells.addNewCellBtnText")} </button> <button onClick={apply}> {t("tutorial.widget.editOutputCells.saveExitBtnText")} </button>
                </span>
            </div>
    
            <div style={styles.op_panel}>
                {new_cells.map((cell: SimpleCellJson) => {
                    return (
                        <PlainCell t={t} total_capacity={utils.shannon2CKB(utils.hex2dec(capacity))} cell={cell} config={config} get_final_cell={onSaveCell}/>
                    )
                })}
            </div>
            <div style={{clear:'both'}}></div>
        </div>
    )
}
