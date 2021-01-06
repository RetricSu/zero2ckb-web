import React, { useEffect, useState } from 'react';
import { Cell, TxOutput } from '../../../../types/blockchain';
import commonStyle from '../../../widget/common_style';
import FreshButton from '../../../widget/fresh_button';
import SingleCell from './Cell';
import utils from '../../../../utils/index';
import { Modal, Fade } from '@material-ui/core';
import EditOutputCells from './EditOutputCells';

const styles = {...commonStyle, ...{
    root: {
        width: '100%',
        border: '1px solid gray',
        height: '200px',
    },
    capacity: {
        width: '100%',
        height: '80%',
        paddingTop: '5px',
        
    },
    capacity_header: {
        height: '20%',
        overflowY: 'hidden' as const,
    },
    header_number: {
        width: '30%',
        overflowX: 'scroll' as const,
        display: 'inline-block' as const,
        verticalAlign: 'text-bottom' as const,
        background: 'white',
        color: 'black',
        padding: '0 5px',
        marginRight: '5px',
    },
    output_cell: {
        textAlign: 'center' as const,
        height: '80%',
        overflowY: 'scroll' as const,
        background: 'white',
        color: 'black',
    },
    fee: {
        position: 'relative' as const,
        bottom: '0px',
        width: '100%',
        height: '15%',
        borderTop: '1px solid gray',
        paddingTop: '5px',
        background: 'black',
        fontSize: '16px',
    }
}};

export type TotalCapacityProps = {
    cells: Cell[]
    get_tx_output?: (txo: TxOutput) => void
    onClearCall?: boolean
}

const caculateCellCapacity = (cells: Cell[]) => {
    var total = BigInt(0);
    cells.map(cell=>{
        total = total + BigInt(cell.cell_output.capacity);
    });
    return '0x' + total.toString(16);
}

export default function TotalCapacity (props: TotalCapacityProps) {
    const {cells, get_tx_output, onClearCall} = props;
    const [capacity, setCapacity] = useState('0x0');
    const [fee, setFee] = useState('0');
    const [mycells, setMycells] = useState<Cell[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalOpen = () => {
        setIsModalOpen(true);
    }
    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const updateMyCells = (cells: Cell[]) => {
        setMycells(cells);
    }
    
    const default_one_cell = async (cells: Cell[]) => {
        let sum = await caculateCellCapacity(cells);
        let c: Cell = {
            cell_output: {
                capacity: sum,
                lock: {
                    code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
                    hash_type: 'type',
                    args: '',
                },
            },
            data: '0x'
        }
        setMycells([c]);
    }
    
    useEffect(()=>{
        if(cells.length !== 0){
            default_one_cell(cells);
            updateCapacity(cells);
        }else{
            updateCapacity(cells); //update the capacity when calling clear from parent componet
        }
    }, [cells]);

    useEffect(() => {
        setFee(caculate_fee());
        if(get_tx_output){
            const tx_output = caculateTxOutPut();
            get_tx_output(tx_output);
        }
    }, [mycells]);

    useEffect(() => {
        if(onClearCall)
            setMycells([]);
    }, [onClearCall]);

    const updateCapacity = async (cells: Cell[]) => {
        let sum = caculateCellCapacity(cells);
        await setCapacity(sum);
    }

    const caculateTxOutPut = (): TxOutput => {
        const outputs = mycells.map(cell=>{
            return {
                capacity: cell.cell_output.capacity,
                lock: cell.cell_output.lock
            }
        });
        const output_datas = mycells.map(cell=>cell.data);
        return {
            outputs: outputs,
            outputs_data: output_datas
        }
    }

    const distribute_cells = () => {
        handleModalOpen();
    }

    const caculate_fee = () => {
        let sum = caculateCellCapacity(mycells);
        const fee = (BigInt(utils.hex2dec(capacity)) - BigInt(utils.hex2dec(sum))).toString(16);
        //const fee = ( BigInt(capacity.slice(2)) - BigInt(sum.slice(2)) ).toString(16);
        console.log(capacity, sum, fee);
        return utils.shannon2CKB( utils.hex2dec('0x' +  fee ) );
        // 200988,3542,3722 
        // 20000,0000,0000
        // 18098835423722
    }

    const isFeeOk = BigInt(fee) > BigInt('0') ? true : false;

    return(
        <div style={styles.root}>
            <div style={styles.capacity}>
               <div style={styles.capacity_header}>
                    <div style={{display:'inline-block'}}>总空间：</div> 
                    <div style={styles.header_number}>{ utils.shannon2CKB(utils.hex2dec(capacity)) }</div>
                    <div style={{display:'inline-block'}}>CKB | </div> 
                    <FreshButton text="⚙️ 设置" onClick={distribute_cells} custom_style={{border:'0', padding: '2px', marginLeft: '5px', fontSize: '16px'}} />
               </div>
               <div style={styles.output_cell}>
                    { mycells.map( (cell, index) => <SingleCell cell={cell} key_id={index} custom_style={{margin: '0'}} /> )}
               </div>
            </div>
            <div style={styles.fee}>
                矿工手续费：{fee} CKB  |   {isFeeOk ? '✅' : '❌'}
            </div>

            <Modal
                  open={isModalOpen}
                  onClose={handleModalClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  style={styles.modal}
                  closeAfterTransition
                  disableBackdropClick={true}
                >
                  <Fade in={isModalOpen}>
                    <div style={styles.paper}>
                      <EditOutputCells get_distribute_cells={updateMyCells} capacity={capacity} trigger_modal_close={handleModalClose} />
                      <div style={{clear: 'both' as const,}}></div>
                    </div>
                  </Fade>
            </Modal>
        </div>
    )
}