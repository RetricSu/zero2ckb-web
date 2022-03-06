import React, { useEffect, useState } from 'react';
import './style.css';
import commonStyle from '../widget/common_style';
import QueryCell from './tools/queryCell';
import QueryTx from './tools/queryTx';
import Hex2Decimal from './tools/hex2decimal';
import Wallets from '../tutorial/sections/common/Wallets';
import ChainConfig from '../tutorial/sections/show_chain_info/ChainConfig';
import Logo from '../widget/logo_svg';
import NewLogo from '../../resource/nervos-token-logo-white.jpg';
import Api from '../../api/blockchain';
import type { ChainConfig as typeChainConfig } from '../../types/blockchain';
import { I18nComponentsProps } from '../../types/i18n';

const styles = {...commonStyle, ...{
    root: {
        position: 'fixed' as const,
        right: '0px',
        top: '20%'
    },
    hr: {
        backgroundColor: commonStyle.main_color.color, 
        height: '1px', 
        border: '0', 
    },
    tool_panel: {
        textAlign: 'left' as const,
        overflowY: 'scroll' as const,
    },
    close_btn: {
        top: '0',
        width: '100%',
        textAlign: 'right' as const,
        fontSize: '15px',
        background: commonStyle.main_color.color,
        outline: 'none',
        border: '0',
    }
}}

/** 
 * todo: add clickable effect on close btn
 */
export default function FloatingBox(props: I18nComponentsProps){
    const {t} = props;
    const [code_hash, setCodeHash] = useState('');
    const [hash_type, setHashType] = useState('');

    async function fetchChainConfig() {
        const api = new Api();
        var config: typeChainConfig = await api.getChainConfig();
        await setCodeHash(config.SCRIPTS.SECP256K1_BLAKE160.CODE_HASH);
        await setHashType(config.SCRIPTS.SECP256K1_BLAKE160.HASH_TYPE);
    }

    useEffect(()=>{
        fetchChainConfig();
    }, [])


    const [isQueryCellOpen, setIsQueryCellOpen] = useState(false);
    const [isQueryTxOpen, setIsQueryTxOpen] = useState(false);
    const [isWalletsOpen, setIsWalletsOpen] = useState(false);
    const [isConfigOpen, setIsConfigOpen] = useState(false);
    const [isCaculatorOpen, setIsCaculatorOpen] = useState(false);

    const [isOpen, setIsOpen] = useState(true);

    const openQueryCell = () => {
        setIsQueryCellOpen(true);
        setIsOpen(false);
    };

    const openQueryTx = () => {
        setIsQueryTxOpen(true);
        setIsOpen(false);
    };

    const openWallets = () => {
        setIsWalletsOpen(true);
        setIsOpen(false);
    };

    const openConfig = () => {
        setIsConfigOpen(true);
        setIsOpen(false);
    };

    const openCaculator = () => {
        setIsCaculatorOpen(true);
        setIsOpen(false);
    };

    const hanlderClose = () => {
        setIsCaculatorOpen(false);
        setIsQueryTxOpen(false);
        setIsWalletsOpen(false);
        setIsConfigOpen(false);
        setIsQueryCellOpen(false);
        setIsOpen(true);
    }

    return(
        <div style={styles.root}>
            <input type="checkbox" name="" id="side-menu-switch" style={{visibility: 'hidden'}}></input>
            <div className="side-menu">
                <div style={{display: isOpen ? 'block' : 'none' }}>
                    <div>
                        <h3 style={styles.main_color}>{t("tutorial.widget.toolBox.title")}</h3>
                        <hr style={styles.hr} />
                    </div>
                    <ul className="nav">
                        <li>
                            <a onClick={openQueryCell}><span className="fa">🔎</span>&#160;  {t("tutorial.widget.toolBox.queryCellBtnText")}</a>
                        </li>
                        <li>
                            <a onClick={openQueryTx}><span className="fa">🔎</span>&#160;  {t("tutorial.widget.toolBox.queryTxBtnText")}</a>
                        </li>
                        <li>
                            <a onClick={openWallets}><span className="fa">💰</span>&#160;  {t("tutorial.widget.toolBox.checkWalletBtnText")}</a>
                        </li>
                        <li>
                            <a onClick={openConfig}><span className="fa">⚙️</span>&#160;  {t("tutorial.widget.toolBox.checkChainConfigBtnText")}</a>
                        </li>
                        <li>
                            <a onClick={openCaculator}><span className="fa">📱</span>&#160;  {t("tutorial.widget.toolBox.hexToDecimalBtnText")}</a>
                        </li>
                    </ul>
                </div>
                <div style={styles.tool_panel}>
                    <button style={{...styles.close_btn, ...{display: !isOpen ? 'block' : 'none' }}} onClick={hanlderClose}>❌</button>
                    <div style={{marginTop: '30px'}}>
                        <div style={{display: isQueryCellOpen ? 'block' : 'none' }}>
                            <QueryCell t={t} code_hash={code_hash} hash_type={hash_type == 'type' ? 'type' : 'data'} />
                        </div>
                        <div style={{display: isQueryTxOpen ? 'block' : 'none' }}>
                            <QueryTx t={t}/>
                        </div>
                        <div style={{display: isWalletsOpen ? 'block' : 'none' }}>
                            <Wallets t={t} custom_style={{border: '0'}} />
                        </div>
                        <div style={{display: isConfigOpen ? 'block' : 'none' }}>
                            <ChainConfig t={t} custom_style={{border:'0'}}/>
                        </div>
                        <div style={{display: isCaculatorOpen ? 'block' : 'none' }}>
                            <Hex2Decimal t={t} custom_style={{border:'0'}} />
                        </div>
                    </div>
                </div>
                <label htmlFor="side-menu-switch">
                    <div className="tool-icon">
                        <img src={NewLogo} style={{width: '50px', height: '50px'}} />
                    </div>
                </label>
            </div>
        </div>
    )
}