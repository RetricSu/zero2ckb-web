import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import commonStyle from '../../../widget/common_style';
import { Cell, CellDep, Input, Script } from '../../../../types/blockchain';
import Api from '../../../../api/blockchain';
import utils from '../../../../utils/index';

const styles = {...commonStyle, ...{
    drop_place: {
        height: '200px',
        border: '1px solid gray',
        textAlign: 'left' as const,
        padding: '0 10px',
        overflowY: 'scroll' as const,
    }
}};

export type DragItem = {
    cell: Cell
    type: string
}

export type ChainConfig = {
    PREFIX: string
    SCRIPTS: {
        SECP256K1_BLAKE160: {
            CODE_HASH: string
            HASH_TYPE: 'type' | 'data'
            TX_HASH: string
            INDEX: string
            DEP_TYPE: 'dep_group' | 'code'
            SHORT_ID: number
        },
        SECP256K1_BLAKE160_MULTISIG: {
            CODE_HASH: string
            HASH_TYPE: 'type' | 'data'
            TX_HASH: string
            INDEX: string
            DEP_TYPE: 'dep_group' | 'code'
            SHORT_ID: number
        },
        DAO: {
            CODE_HASH: string
            HASH_TYPE: 'type' | 'data'
            TX_HASH: string
            INDEX: string
            DEP_TYPE: 'dep_group' | 'code'
            SHORT_ID: number
        }
    }
}

export type Props = {
    onDropShowing: (
        cells: Cell[],
        cell_deps: CellDep[],
        inputs: Input[]
    ) => JSX.Element
    onCallbackData?: (
        cells: Cell[],
        cell_deps: CellDep[],
        inputs: Input[]
    ) => void
}

export default function DragCellToInput(props: Props){

    const [config, setConfig] = useState<ChainConfig>();

    const [cells, setCells] = useState<Cell[]>([]);
    const [cell_deps, setCellDeps] = useState<CellDep[]>([]);
    const [inputs, setInputs] = useState<Input[]>([]);

    // make place droppable
    const [{ canDrop, isOver }, drop] = useDrop({
      accept: ItemTypes.CELL,
      drop(item: DragItem, monitor) {
        try {
            prepareJsonData(item.cell);
            return { name: 'tx-input(json)', isOriginHidden: true};
        } catch (error: any) {
            alert(error);
            return { name: 'tx-input(json)', isOriginHidden: false};
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    });

    const prepareJsonData = (cell: Cell) => {
        if(cell.out_point){
            inputs.push({
                previous_output: cell.out_point,
                since: '0x0'
            })
        }else{
            // todo: should try another way to get outpoint. 
            throw new Error("failed to add input cell! can not find outpoint.");
        }

        const recognize_dep = getCellDepByScript(cell.cell_output.lock);
        if( recognize_dep !== 'un-recognize cell dep' && typeof recognize_dep !== 'string'){
            if(!utils.isObjectInArray(recognize_dep, cell_deps))
                cell_deps.push(recognize_dep);
        }

        cells.push(cell);
    };

    const getCellDepByScript = (script: Script): CellDep | string => {
        const scripts = config?.SCRIPTS;
        const secp160 = scripts?.SECP256K1_BLAKE160;
        const secp160Multi = scripts?.SECP256K1_BLAKE160_MULTISIG;
        const dao = scripts?.DAO;

        switch (script.code_hash) {
            case secp160?.CODE_HASH:
                if(script.hash_type === secp160?.HASH_TYPE){
                    return {
                        out_point: {
                            tx_hash: secp160.TX_HASH,
                            index: secp160.INDEX
                        },
                        dep_type: secp160.DEP_TYPE
                    }
                }
                break;
            
            case secp160Multi?.CODE_HASH:
                if(script.hash_type === secp160Multi?.HASH_TYPE){
                    return {
                        out_point: {
                            tx_hash: secp160Multi.TX_HASH,
                            index: secp160Multi.INDEX
                        },
                        dep_type: secp160Multi.DEP_TYPE
                    }
                }
                break;
            
            case dao?.CODE_HASH:
                if(script.hash_type === dao?.HASH_TYPE){
                    return {
                        out_point: {
                            tx_hash: dao.TX_HASH,
                            index: dao.INDEX
                        },
                        dep_type: dao.DEP_TYPE
                    }
                }
                break;

            default:
                break;
        }

        return 'un-recognize cell dep';
    }

    async function fetchChainConfig() {
        const api = new Api();
        var config: ChainConfig = await api.getChainConfig();
        setConfig(config);
    }

    useEffect(()=>{
        fetchChainConfig();
    }, []);
    
    const isActive = canDrop && isOver;
    const border = isActive ? '1px solid ' + commonStyle.main_color.color : '1px solid gray';

    return(
        <div ref={drop} style={{...styles.drop_place, border}}>
            {props.onDropShowing(cells, cell_deps, inputs)}
        </div>
    )
}
