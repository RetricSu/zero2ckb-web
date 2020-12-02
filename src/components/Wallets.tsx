import React, { useState, useEffect } from 'react';
import Api from '../api/blockchain';
import type {
    Wallet
} from '../types/blockchain';

const styles = {
    main: {
        textAlign: 'left' as const
    },
    wallet_panel: {
        width: '600px',
        border: '1px solid white',
        float: 'left' as const,
        marginRight: '20px',
        padding: '10px',
        listStyleType: 'none',
        overflow: 'hidden',
        fontSize: '10px',
        display: 'block'
    }
}

export type Props = {
    wallet_id?: number
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
                <p>钱包 {index + 1} : </p>
                <p>mainet: { wallet.mainnet }</p>
                <p>testnet: { wallet.testnet }</p>
                <p>lock_arg: { wallet.lock_arg }</p>
                <p>lock_hash: { wallet.lock_hash }</p>
                <p>keystore: { wallet.keystore }</p>
                <p>password: { wallet.password }</p>
            </li>
            )
        }) );
    }

    return (
        <div style={styles.main}>
            <p style={{color:'red'}}> this is just for teaching convinect. Please do not use this in production! or your money will be stolen! </p>
            { props.wallet_id ?
                wallets[props.wallet_id-1] : wallets
            } 
            <p style={{clear: "both"}} />
        </div>
    )
}