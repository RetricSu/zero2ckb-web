import React, { useState, useEffect } from 'react';
import Api from '../../../../api/blockchain';
import CodePiece from '../../../widget/code';

const styles = {
    root: {
        textAlign: 'center' as const,
    },
    config_panel: {
        textAlign: 'left' as const,
        margin: '0 auto',
        paddingLeft: '20%',
        paddingRight: '20%',
        border: '1px solid gray'
    }
}

export default function ChainConfig(){

    const [config, setConfig] = useState();

    useEffect(()=>{
        fetchChainConfig();
    }, []);

    async function fetchChainConfig() {
        const api = new Api();
        var config = await api.getChainConfig();
        setConfig(config);
    }

    return(
        <div style={styles.root}>
            <h4>测试链的配置信息</h4>
            <div style={styles.config_panel}>
                <CodePiece custom_style={{border:'0'}} code={JSON.stringify(config, null, 2)} />
            </div>
        </div>
    )
}

