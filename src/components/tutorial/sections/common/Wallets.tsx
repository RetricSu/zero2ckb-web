import React, { useState, useEffect } from 'react';
import Api from '../../../../api/blockchain';
import type {
    Wallet
} from '../../../../types/blockchain';
import commonStyles from '../../../widget/common_style';
import CopyText from '../../../widget/copy_text';

const styles = {...commonStyles, ...{
    wallets: {
        marginTop: '20px',
        marginBottom: '20px',
    },
    wallet_panel: {
        width: '400px',
        border: '1px solid white',
        float: 'left' as const,
        marginRight: '20px',
        padding: '10px',
        listStyleType: 'none',
        overflow: 'hidden',
        fontSize: '10px',
        display: 'block',
        textAlign: 'left' as const
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

    useEffect(() => {   
        fetchWallets();
    }, []);
    
    async function fetchWallets() {
        const api = new Api();
        const myWallets = await api.getWallets();
        setWallets( myWallets.map((wallet:Wallet, index:number) => {
            return(
            <li key={index} style={styles.wallet_panel}>
                <p style={styles.main_color}>钱包 {index + 1} : </p>
                <p>mainet: { wallet.mainnet }   <CopyText text={wallet.mainnet} icon={true} /></p>
                <p>testnet: { wallet.testnet }   <CopyText text={wallet.testnet} icon={true} /></p>
                <p>lock_arg: { wallet.lock_arg }   <CopyText text={wallet.lock_arg} icon={true} /></p>
                <p>lock_hash: { wallet.lock_hash }   <CopyText text={wallet.lock_hash} icon={true} /></p>
                <p>private_key: { wallet.private_key }   <CopyText text={wallet.private_key} icon={true} /></p>
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