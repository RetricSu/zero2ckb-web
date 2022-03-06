import React, { useState, useEffect, CSSProperties } from 'react';
import Api from '../../../../api/blockchain';
import type {
    Wallet
} from '../../../../types/blockchain';
import commonStyles from '../../../widget/common_style';
import CopyText from '../../../widget/copy_text';
import CodePiece from '../../../widget/code';
import { Typography, Container } from "@material-ui/core";
import { I18nComponentsProps } from '../../../../types/i18n';


const wallet_arcii = `
___________________________________
|#######====================#######|
|#(1)*     BANK of CKB *          #|
|#**          /===\\   ********  **#|
|*# {G}      | (") |             #*|
|#*  ******  | /v\\ |    O N E    *#|
|#(1)         \\===/            (1)#|
|##=========ONE WALLET===========##|
------------------------------------
                    `
const wallet_arcii_2 = `
+----------+
|          |
|   CKB    |
|  Wallet  |
|          |
+----------+
                       `
const wallet_bottom = `
+                               +
+-------------------------------+
`
const wallet_top= `
+-------------------------------+
+                               +
`

const styles = {...commonStyles, ...{
    wallet_section: {
        border: '1px solid',
        marginTop: '2em',
        marginBottom: '2em'
    },
    wallets: {
        marginTop: '20px',
        marginBottom: '20px',
    },
    wallet_panel: {
        maxWidth: '300px',
        float: 'left' as const,
        marginRight: '20px',
        padding: '10px',
        listStyleType: 'none',
        overflow: 'hidden',
        fontSize: '10px',
        display: 'block',
        textAlign: 'center' as const,
        marginBottom: '5px'
    },
    alert_text: {
        color:'red', 
        fontSize: '12px',
        textAlign: 'center' as const
    },
    wallet_info: {
        textAlign: 'center' as const
    },
    wallet_info_text: {
        fontSize: '12px'
    }
  }
};

export type WalletInfoProps = {
    wallet: Wallet
}

export function WalletInfo(props: WalletInfoProps){
    const { wallet } = props;
    const [isShowing, setIsShowing] = useState(false);

    const toggle = () => {
        setIsShowing(!isShowing);
    }

    const info = () => {
        if(isShowing){
            return (
                <div style={styles.wallet_info}>
                    <CodePiece custom_style={{border:'0px', marginTop:'0px', marginBottom:'0px', overflow: 'hidden'}} code={wallet_top}></CodePiece>
                    <div style={styles.wallet_info_text}>
                        <p><strong style={styles.main_color}>mainet: &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;</strong>
                            { wallet.mainnet.slice(0, 8) }..{ wallet.mainnet.slice(wallet.mainnet.length-5) }   <CopyText text={wallet.mainnet} icon={true} /></p>
                        <p><strong style={styles.main_color}>testnet: &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;</strong>
                            { wallet.testnet.slice(0, 8) }..{ wallet.testnet.slice(wallet.testnet.length-5) }   <CopyText text={wallet.testnet} icon={true} /></p>
                        <p><strong style={styles.main_color}>lock_arg: &#160;&#160;&#160;&#160;&#160;</strong>
                            { wallet.lock_arg.slice(0, 8) }..{ wallet.lock_arg.slice(wallet.lock_arg.length-5) }   <CopyText text={wallet.lock_arg} icon={true} /></p>
                        <p><strong style={styles.main_color}>private_key: </strong>
                            { wallet.private_key.slice(0, 8) }..{ wallet.private_key.slice(wallet.private_key.length-5) }   <CopyText text={wallet.private_key} icon={true} /></p>
                    </div>
                    <CodePiece custom_style={{border:'0px', marginTop:'0px', marginBottom:'0px', overflow: 'hidden'}} code={wallet_bottom}></CodePiece>
                </div>
            )
        }else{
            return(
                <CodePiece custom_style={{border:'0px', marginTop:'0px'}} code={wallet_arcii_2}></CodePiece>
            )
        }
    }
    return(
        <div onMouseEnter={toggle} onMouseLeave={toggle}>
            { info() }
        </div>
    )
}

export interface Props extends I18nComponentsProps {
    wallet_id?: number
    custom_style?: CSSProperties
    onFetchWallets?: (wallets: Wallet[]) => void
}

export default function Wallets(props: Props){

    const { t, custom_style } = props;

    const [wallets, setWallets] = useState([]);

    useEffect(() => {   
        fetchWallets();
    }, []);
    
    async function fetchWallets() {
        const api = new Api();
        const myWallets = await api.getWallets();
        setWallets( myWallets.map((wallet:Wallet, index:number) => {
            return(
            <li key={index} style={styles.wallet_panel}>
                <Typography style={styles.main_color}> {t("tutorial.widget.wallets.wallet")} {index + 1} </Typography>
                <WalletInfo wallet={wallet}></WalletInfo>
            </li>
            )
        }) );
        if(props.onFetchWallets)
            props.onFetchWallets(myWallets);
    }

    return (
        <Container style={ custom_style != undefined ? {...styles.wallet_section, ...custom_style} : styles.wallet_section}>
            <div style={styles.content}>
                 <p style={styles.alert_text}> 
                 ☠️ &#160; {t("tutorial.widget.wallets.securityAlertMsg")}
                </p>
            </div>
            <div style={styles.wallets}>
                { props.wallet_id ?
                    wallets[props.wallet_id-1] : wallets
                } 
            </div>
            <p style={{clear: "both"}} />
            <br/>
        </Container>
    )
}