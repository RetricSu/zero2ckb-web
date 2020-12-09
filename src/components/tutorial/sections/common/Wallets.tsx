import React, { useState, useEffect } from 'react';
import Api from '../../../../api/blockchain';
import type {
    Wallet
} from '../../../../types/blockchain';
import commonStyles from '../../../widget/common_style';
import CopyText from '../../../widget/copy_text';
import CodePiece from '../../../widget/code';
import { Typography } from "@material-ui/core";

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

const styles = {...commonStyles, ...{
    wallets: {
        marginTop: '20px',
        marginBottom: '20px',
    },
    wallet_panel: {
        maxWidth: '300px',
        border: '1px dotted white',
        float: 'left' as const,
        marginRight: '20px',
        padding: '10px',
        listStyleType: 'none',
        overflow: 'hidden',
        fontSize: '10px',
        display: 'block',
        textAlign: 'left' as const,
        marginBottom: '5px'
    },
    alert_text: {
        color:'red', 
        textAlign: 'center' as const
    }
  }
};

export type Props = {
    wallet_id?: number
    onFetchWallets?: (wallets: Wallet[]) => void
}

export default function Wallets(props: Props){
    const [wallets, setWallets] = useState([]);
    const [isDisplay, setIsDisplay] = useState('None');

    useEffect(() => {   
        fetchWallets();
    }, []);

    const showWalletInfo = (wallet: Wallet) => {
        //console.log(wallet);
        setIsDisplay('block');
    }
    
    async function fetchWallets() {
        const api = new Api();
        const myWallets = await api.getWallets();
        setWallets( myWallets.map((wallet:Wallet, index:number) => {
            return(
            <li key={index} style={styles.wallet_panel} onMouseOver={() => showWalletInfo(wallet)}>
                <div style={{display: isDisplay }}>
                    <Typography style={styles.main_color}> 钱包 {index + 1} : </Typography>
                    <Typography>mainet: { wallet.mainnet.slice(0, 8) }..   <CopyText text={wallet.mainnet} icon={true} /></Typography>
                    <Typography>testnet: { wallet.testnet.slice(0, 8) }..   <CopyText text={wallet.testnet} icon={true} /></Typography>
                    <Typography>lock_arg: { wallet.lock_arg.slice(0, 8) }..   <CopyText text={wallet.lock_arg} icon={true} /></Typography>
                    <Typography>private_key: { wallet.private_key.slice(0, 8) }..   <CopyText text={wallet.private_key} icon={true} /></Typography>
                </div>
                <CodePiece custom_style={{border:'0px', marginTop:'0px'}} code={wallet_arcii_2}></CodePiece>
            </li>
            )
        }) );
        if(props.onFetchWallets)
            props.onFetchWallets(myWallets);
    }

    return (
        <div>
            <div style={styles.wallets}>
                { props.wallet_id ?
                    wallets[props.wallet_id-1] : wallets
                } 
            </div>
            <p style={{clear: "both"}} />
            <br/>
            <div style={styles.content}>
                 <p style={styles.alert_text}> 
                    为了教学方便，我们把地址的私钥全部导出了，所以千万不要在正式场合下使用这几个钱包，
                    否则你的钱可能会丢失、或被盗。
                </p>
            </div>
        </div>
    )
}