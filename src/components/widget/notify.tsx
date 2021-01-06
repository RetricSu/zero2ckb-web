import React, { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import commomStyle from '../widget/common_style';

const styles = {...commomStyle, ...{
    panel: {
        maxWidth: "700px",
    },
    toast: {
        padding: '10px',
    }
}};

export default function NotifyPlace(){
    return(
        <div>
            <ToastContainer style={styles.panel} toastStyle={styles.toast} />
        </div>
    )
}

export type MsgType = 'error' | 'success' | 'info' | 'warning' | 'dark';

const notify = (message: string, type?: MsgType) => {
    switch (type) {
        case 'error':
            toast.error(message);
            break;
        
        case 'success':
            toast.success(message);
            break;
        
        case 'warning':
            toast.warn(message);
            break;
        
        case 'info':
            toast.info(message);
            break;

        case 'dark':
            toast.dark(message);
            break;

        default:
            toast.error(message);
            break;
    }
}

export { notify }