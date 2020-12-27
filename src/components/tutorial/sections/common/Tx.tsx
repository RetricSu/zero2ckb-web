import React, { useState } from 'react';
import type {
    Transaction,
    TransactionWithStatus
} from '../../../../types/blockchain';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import CodePiece from '../../../widget/code';

export type TxProps = {
    tx: Transaction
    key_id?: number | string
}

const styles = {
    box_content_link: {
        cursor: 'pointer',
        listStyleType: 'none',
        marginLeft: '0',
        marginBottom: '10px',
        padding: '5px'
    },
    modal: {
      maxWidth: '700px',
      overflowY: 'scroll' as const,
      padding: '20px',
      height: '90%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '2em auto'
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
    const { tx, key_id } = props;
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleClose = () => {
      setOpen(!open);
    };
    
    return (
        <li key={ key_id != undefined ? key_id : tx.hash } style={styles.box_content_link} onClick={handleOpen}>
                        { tx.hash }
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  style={styles.modal}
                  closeAfterTransition
                  disableBackdropClick={true}
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