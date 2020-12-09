import React, { useState, useRef, useEffect } from 'react';
import Cells from '../common/Cells';
import WalletTxs from './WalletTransaction';
import type {
    Wallet
} from '../../../../types/blockchain'
import Select, { ActionMeta, OptionTypeBase, ValueType } from 'react-select';


export type Props = {
    wallets: Wallet[]
}

export type SelectWallet = {
    value: string
    label: string
}

const styles = {
    selection_area: {
        color: 'black'
    }
}

export default function WalletCells( props: Props ){
    const [wallets, setWallets] = useState<Wallet[]>([]);

    useEffect(() => {
        setWallets(props.wallets);
    }, [props.wallets]);

    const [selectedWallet, setSelectedWallet] = useState<string>();
    const options = wallets.map((w) => {
        return {
            value: w.lock_arg,
            label: w.lock_arg
        }
    });

    const handlerSelectWallet = (value: ValueType<{
        value: string;
        label: string;
    }, false>, actionMeta: ActionMeta<{
        value: string;
        label: string;
    }>) => {
        setSelectedWallet(value?.value);
    }

    return(
        <div>
            <p>请选择钱包</p>
            <div style={styles.selection_area}>
                <Select options={options} onChange={handlerSelectWallet} />
            </div>
            <p> {selectedWallet} 钱包对应的 live cell：</p>
            <Cells query={{lock: {
                code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
                args: selectedWallet || '',
                hash_type: 'type'
            }}} render_dep={selectedWallet}></Cells>
            <div>
                <p>这是钱包对应的交易: </p>
                <WalletTxs query={{lock: {
                    code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
                    args: selectedWallet || '',
                    hash_type: 'type'
                }}} render_dep={selectedWallet}></WalletTxs>
            </div>
        </div>
    )
}
