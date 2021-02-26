import React, { useState } from 'react';
import common_style from '../widget/common_style';

export type AlertMessagerProps = {
    msg: string
    display: boolean
    level?: 0 | 1 | 2 | 3
}

const styles = {
    root: {
        position: 'absolute' as const,
        top: '0',
        height: '20px',
        width: '100%',
        fontSize: '14px',
        color: 'white',
        background: 'gray',
        textAlign: 'center' as const,
        padding: '5px',
        marginBottom: '10px',
    },
    close_btn: {
        cursor: 'pointer',
        marginLeft: '20px',
        background: common_style.main_color.color,
        padding: '0px 10px',
    }
}

const AlertMessager = (props: AlertMessagerProps) => {
    const { msg, display } = props;

    const [open, setOpen] = useState(true);
    
    const close = () => {
        setOpen(false);
    }

    const diplay = open && display ? {
        display: 'block'
    } : {
        display: 'none'
    }    

    return(
        <div style={{...diplay, ...styles.root}}>
            {msg}
            <span style={styles.close_btn} onClick={close}> ok </span>
        </div>
    )
}

export default AlertMessager;