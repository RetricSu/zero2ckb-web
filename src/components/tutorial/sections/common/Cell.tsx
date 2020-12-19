import React, { useState } from 'react';
import { Cell } from '../../../../types/blockchain';
import commonStyle from '../../../widget/common_style';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import CodePiece from '../../../widget/code';

const styles = {...commonStyle, ...{
        cell_panel: {
            width: '108px',
            height: '108px',
            listStyle: 'none',
            float: 'left' as const,
            marginRight: '10px',
            marginBottom: '10px',
            padding: '10px',
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
    cell: Cell,
    key_id?: string | number
}

export default function SingleCell (props: SingleCellProps){
    const { cell, key_id } = props;
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

    return(
        <li key={ key_id === undefined ? cell.block_hash : key_id} style={styles.cell_panel} onMouseEnter={hovering} onMouseLeave={unhover} onClick={handleOpen} >
            <div style={ isHover ? {...styles.ball, ...styles.ball_hover} : styles.ball }>
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
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
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