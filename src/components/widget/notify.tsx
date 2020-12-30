import React, { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NotifyPlace(){
    return(
        <div>
            <ToastContainer style={{ width: "100%" }} />
        </div>
    )
}

const notify = (message: string) => {
    toast(message);
}

export { notify }