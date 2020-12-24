import React, { CSSProperties, useState } from 'react';
import { Cell } from '../../../../types/blockchain';
import commonStyle from '../../../widget/common_style';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import CodePiece from '../../../widget/code';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import {ItemTypes} from './ItemTypes';

const styles = {...commonStyle, ...{
        cell_panel: {
            width: '108px',
            height: '108px',
            listStyle: 'none',
            float: 'left' as const,
            marginRight: '10px',
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
            overflowY: 'scroll' as const,
            overflowX: 'hidden' as const,
            justifyContent: 'center' as const,
            fontSize: '10px',
            alignItems: 'center' as const,
            cursor: 'pointer'
        },
        ball_hover: {
            background: 'gray'
        },
        cell_content: {
            margin: '30% auto',
        }
    }
}

export type SingleCellProps = {
    cell: Cell
    key_id?: string | number
    custom_style?: CSSProperties
    isDraggable?: boolean //default is draggable.
}

export default function SingleCell (props: SingleCellProps){
    const { cell, key_id, isDraggable } = props;
    const [isHidden, setIsHidden] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const hovering = () => {setIsHover(true);}
    const unhover = () => {setIsHover(false);}

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleClose = () => {
      setOpen(!open);
    };

    /*** 
     * make cell dragable
    */
    const [{ isDragging }, drag] = useDrag({
      item: {cell, type: ItemTypes.CELL},
      end: (item, monitor: DragSourceMonitor) => {
        const dropResult = monitor.getDropResult()
        if (item && dropResult) {
          console.log(`You dropped ${item.cell.cell_output.capacity} into ${dropResult.name}!`);
          setIsHidden(dropResult.isOriginHidden);
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    })
    const opacity = isDragging ? 0.4 : 1;
    const display = isHidden ? 'none' : 'inline-block';

    return(
        <li key={ key_id === undefined ? cell.block_hash : key_id} style={{...{...styles.cell_panel, opacity, display}, ...props.custom_style}} onMouseEnter={hovering} onMouseLeave={unhover} onClick={handleOpen}>          
            <div style={ isHover ? {...styles.ball, ...styles.ball_hover} : styles.ball } ref={ isDraggable !== undefined ? isDraggable ? drag : null : drag}>
                <div style={styles.cell_content}>
                    capacity <br/><br/>
                    {cell.cell_output.capacity}
                </div>
            </div>


            <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  style={styles.modal}
                  closeAfterTransition
                  disableBackdropClick={true}
                >
                  <Fade in={open}>
                    <div style={styles.paper}>
                      <CodePiece code={ JSON.stringify(cell, null, 2) } custom_style={{border: '0'}}></CodePiece>
                      <button onClick={handleClose}>close</button>
                    </div>
                  </Fade>
            </Modal>
        </li>
    )
}