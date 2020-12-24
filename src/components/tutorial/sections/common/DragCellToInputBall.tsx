import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import commonStyle from '../../../widget/common_style';
import { Cell, CellDep, Input, Script } from '../../../../types/blockchain';
import Api from '../../../../api/blockchain';
import utils from '../../../../utils/index';
import SingleCell from './Cell';

const styles = {...commonStyle, ...{
    drop_place: {
        height: '200px',
        border: '1px solid gray',
        textAlign: 'left' as const,
        overflowY: 'scroll' as const,
    },
    header: {
        height:'20%',
        fontSize: '16px',
        textAlign: 'center' as const,
        borderBottom: '1px solid gray',
    },
    hint_text: {
        marginTop: '10px',
        display: 'inline-block' as const,
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
    get_contents?: (cells: Cell[], cell_deps: CellDep[], inputs: Input[]) => void
    onClearCall?: boolean
    makeOriginCellHidden?: boolean
}

export default function DragCellToInputBall(props: Props){

    const {get_contents, onClearCall, makeOriginCellHidden} = props;

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
            const isOriginHidden = makeOriginCellHidden !== undefined ? makeOriginCellHidden : true; // default mode is hidden origin after success drag.
            return { name: 'tx-input(json)', isOriginHidden: isOriginHidden};
        } catch (error) {
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
            const input_cell = {
                previous_output: cell.out_point,
                since: '0x0'
            };
            if( !utils.isObjectInArray(input_cell, inputs) ){
                inputs.push(input_cell);

                //make canva display the same cell
                cells.push(cell);
            }else{
                throw new Error("cell already exits!");
            }
        }else{
            // todo: should try another way to get outpoint. 
            throw new Error("failed to add input cell! can not find outpoint.");
        }

        const recognize_dep = getCellDepByScript(cell.cell_output.lock);
        if( recognize_dep !== 'un-recognize cell dep' && typeof recognize_dep !== 'string'){
            if(!utils.isObjectInArray(recognize_dep, cell_deps))
                cell_deps.push(recognize_dep);
        }

        if(get_contents){
            get_contents(cells, cell_deps, inputs);
        }
    };

    const getCellDepByScript = (script: Script): CellDep | string => {
        const scripts = config?.SCRIPTS;
        const secp160 = scripts?.SECP256K1_BLAKE160;
        const secp160mult = scripts?.SECP256K1_BLAKE160_MULTISIG;
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
            
            case secp160mult?.CODE_HASH:
                if(script.hash_type === secp160mult?.HASH_TYPE){
                    return {
                        out_point: {
                            tx_hash: secp160mult.TX_HASH,
                            index: secp160mult.INDEX
                        },
                        dep_type: secp160mult.DEP_TYPE
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

    const clear = () => {
        setCells([]);
        setCellDeps([]);
        setInputs([]);
    }

    async function fetchChainConfig() {
        const api = new Api();
        var config: ChainConfig = await api.getChainConfig();
        setConfig(config);
    }

    useEffect(()=>{
        if(onClearCall)
            clear();
    }, [onClearCall]);

    useEffect(()=>{
        fetchChainConfig();
    }, []);
    
    const isActive = canDrop && isOver;
    const border = isActive ? '1px solid ' + commonStyle.main_color.color : '1px solid gray';
    const color = isActive ? commonStyle.main_color.color : 'white';
    const borderBottom = isActive ? '1px solid ' + commonStyle.main_color.color : '1px solid gray';
    return(
        <div ref={drop} style={{...styles.drop_place, border}}>
            <div style={{...styles.header, color, borderBottom}}>
                <span style={styles.hint_text}>把 Cell 拖进这里</span>
            </div>
            {cells.map( (cell: Cell, index: number) => <SingleCell cell={cell} key_id={index} isDraggable={false} custom_style={{margin: '0'}} /> )}
        </div>
    )
}


/***   
{
  "cell_deps": [
    {
        "dep_type": "dep_group",
        "out_point": {
          "index": "0x0",
          "tx_hash": "0xace5ea83c478bb866edf122ff862085789158f5cbff155b7bb5f13058555b708"
        }
    }
  ],
  "inputs": [
    {
      "previous_output": {
        "index": "0xffffffff",
        "tx_hash": "0x0000000000000000000000000000000000000000000000000000000000000000"
      },
      "since": "0x11"
    }
  ],
}
 */


//{cells.map( (cell: Cell, index: number) => <SingleCell cell={cell} key_id={index} custom_style={{margin: '0'}} /> )}