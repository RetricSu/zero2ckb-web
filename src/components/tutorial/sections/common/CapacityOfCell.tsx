import React, { CSSProperties, useEffect, useState } from 'react';
import { Cell } from '../../../../types/blockchain';
import commonStyle from '../../../widget/common_style';
import CodePiece from '../../../widget/code';
import Api from '../../../../api/blockchain';
import {notify} from '../../../widget/notify';
import utils from '../../../../utils/index';
import { Modal, Fade } from '@material-ui/core';
import { I18nComponentsProps } from '../../../../types/i18n';

const styles = {...commonStyle, ...{
        root: {
            width: '100%',
            clear: 'both' as const,
            textAlign: 'center' as const,
            margin: '2em 0',
            border: '1px solid gray',
            padding: '10px',
        },
        cell_panel: {
            width: '208px',
            height: '208px',
            listStyle: 'none',
            margin: '0 auto',
            marginBottom: '10px',
            padding: '10px',
            borderRadius: '100%',
        },
        ball: {
            width: '100%',
            height: '100%',
            borderRadius: '100%',
            border: '1px solid ' + commonStyle.main_color.color,
            textAlign: 'center' as const,
            justifyContent: 'center' as const,
            fontSize: '14px',
            alignItems: 'center' as const,
            overflow: 'hidden' as const,
        },
        ball_hover: {
            background: 'gray',
            cursor: 'pointer',
        },
        cell_content: {
            margin: '20% auto',
            overflowWrap: 'break-word' as const,
        },
        space_result: {
            textAlign: 'left' as const,
        },
        hr: {
            display: 'block', 
            height: '1px',
            border: '0', 
            borderTop: '1px solid '+commonStyle.main_color.color,
        }
    }
}

export interface CapacityOfCellProps extends I18nComponentsProps {
    cell: Cell
    custom_style?: CSSProperties
}

// todo: make input only accept chinese word or calculate the english text as well.

export default function CapacityOfCell (props: CapacityOfCellProps){
    const { t, cell } = props;
    const [myCell, setMyCell] = useState<Cell>(cell);
    const [totalByteLength, setTotalByteLength] = useState('61');

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleClose = () => {
      setOpen(!open);
    };

    const [isHover, setIsHover] = useState(false);
    const hovering = () => {setIsHover(true);}
    const unHover = () => {setIsHover(false);}
    
    const handleInputChange = (text: string) => {
        const data = '0x' + toHex(text);
        setMyCell({...myCell, ...{data: data}});

        const dataLength = getByteLengthOfHexString(data);
        setTotalByteLength((61+dataLength).toString());
    }

    const getByteLengthOfHexString = (str: string) => {
        var s = str.length - 2; //remove 0x
        return s / 2;
    }

    const getCellPropertyByteLength = () => {
        const b2 = getByteLengthOfHexString(myCell.cell_output.lock.args);
        const b5 = getByteLengthOfHexString(myCell.data);
        return {
            capacity: '8 Bytes',
            lock: {
                args: b2 + ' Bytes',
                code_hash: '32 Bytes',
                hash_type: '1 Bytes',
            },
            data: b5 + ' Bytes'
        }
    }

    function toHex(str: string) {
        var result = '';
        for (var i=0; i<str.length; i++) {
          result += str.charCodeAt(i).toString(16);
        }
        return result;
    }

    const isCapacityEnouge = BigInt(utils.shannon2CKB(utils.hex2dec(myCell.cell_output.capacity))) > BigInt(totalByteLength) ? 
        `capacity: ${myCell.cell_output.capacity} = ${utils.shannon2CKB(utils.hex2dec(myCell.cell_output.capacity))} > ${t("tutorial.widget.capacityOfCell.actualCapacity")}：${totalByteLength}, ✅`
        :  
        `capacity: ${myCell.cell_output.capacity} = ${utils.shannon2CKB(utils.hex2dec(myCell.cell_output.capacity))} < ${t("tutorial.widget.capacityOfCell.actualCapacity")}：${totalByteLength}, ❌`;

    const ballStatusStyle = BigInt(utils.shannon2CKB(utils.hex2dec(myCell.cell_output.capacity))) > BigInt(totalByteLength) ? 
        {}
        :
        {border: '1px solid red'};

    const hrStatusStyle = BigInt(utils.shannon2CKB(utils.hex2dec(myCell.cell_output.capacity))) > BigInt(totalByteLength) ? 
        styles.hr
        :
        {...styles.hr, ...{ borderTop: '1px solid red'}};

    return(
        <div key={cell.cell_output.lock.args} style={styles.root}>
            <div style={styles.input_wrap}>
                <input onChange={(e)=>{handleInputChange(e.currentTarget.value)}} placeholder={t("tutorial.widget.capacityOfCell.inputPlaceHolder")} type="text" style={styles.input}/>
            </div>
            <div style={{...styles.cell_panel, ...props.custom_style}} onMouseEnter={hovering} onMouseLeave={unHover} onClick={handleOpen}>          
                <div style={ isHover ? {...styles.ball, ...styles.ball_hover, ...ballStatusStyle} : {...styles.ball, ...ballStatusStyle} } >
                    <div style={styles.cell_content}>
                        {t("tutorial.widget.capacityOfCell.capacity")} <br/><br/>
                        {totalByteLength} Bytes <br/><br/>
                        <hr style={hrStatusStyle} />
                        {myCell.data}
                    </div>
                </div>
            </div>
            <div style={styles.space_result}>
                {t("tutorial.widget.capacityOfCell.isCellCapacityEnough")}
                <CodePiece code={ isCapacityEnouge } custom_style={{padding: '5px', border:'1px solid gray'}}/>
            </div>


            <Modal
                  open={open}
                  aria-labelledby={'simple-modal-title' + cell.block_hash}
                  aria-describedby={'simple-modal-description' + cell.block_hash}
                  style={styles.modal}
                  closeAfterTransition
                  disableBackdropClick={true}
                >
                  <Fade in={open}>
                    <div style={styles.paper}>
                      {t("tutorial.widget.capacityOfCell.cellContent")}：
                      <CodePiece code={ JSON.stringify(myCell, null, 2) } custom_style={{padding: '5px', border:'1px solid gray'}}/>
                      {t("tutorial.widget.capacityOfCell.4FieldSumCapacity")}：
                      <CodePiece code={JSON.stringify({...{total: totalByteLength + ' Bytes'}, ...getCellPropertyByteLength()}, null, 2)} custom_style={{padding: '5px', border:'1px solid gray'}}/>
                      <button onClick={handleClose}>close</button>
                    </div>
                  </Fade>
            </Modal>
        </div>
    )
}
