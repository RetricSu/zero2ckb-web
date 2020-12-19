import React, { useState } from 'react';
import type {
    Transaction
} from '../../../../types/blockchain';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import CodePiece from '../../../widget/code';

export type TxProps = {
    tx: Transaction
}

const styles = {
    box_content_link: {
        textDecoration: 'underline',
        cursor: 'pointer'
    },
    modal: {
      maxWidth: '700px',
      maxHeight: '80%',
      overflowY: 'scroll' as const,
      padding: '20px',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto'
    },
    paper: {
      backgroundColor: 'gray',
      border: '2px solid #000',
      boxShadow: '10px',
      padding: '10px',
      width: '100%',
      outline: 'none'
    },
}

export default function ShowTxInfo (props: TxProps) {
    const { tx } = props;
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleClose = () => {
      setOpen(!open);
    };
    
    return (
        <li style={styles.box_content_link} key={tx.hash} onClick={handleOpen}>
                        { tx.hash?.slice(0,16) }.. 
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
                      <CodePiece code={ JSON.stringify(tx, null, 2) } custom_style={{border: '0'}}></CodePiece>
                      <button onClick={handleClose}>close</button>
                    </div>
                  </Fade>
                </Modal>
        </li>
    )
}