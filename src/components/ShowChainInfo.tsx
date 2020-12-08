import React, { useState } from 'react';
import Wallets from './Wallets';
import Transaction from './Transaction';
import ChainConfig from './ChainConfig';
import WalletCells from './WalletCells';
import styles from './widget/common_style';
import type {
    Wallet
} from '../types/blockchain';

export default function(){
    const [wallets, setWallets] = useState<Wallet[]>([]);

    return(
        <div>
            <hr/>
            <div style={styles.wide_card}>
                <h1 style={styles.wide_card_title}>第二步：动手实践</h1>
                <blockquote style={styles.blockquote}>
                    我们在云端运行了一条测试链，
                    <br/> 
                    并预先生成了一些账户地址，供你玩耍。
                    <br/>
                    你可以在下面看到这条测试链的一些信息。
                </blockquote>
            </div>
            <hr/>
            <div style={styles.content}>
                <p>这里有 3 个钱包。
                    其中，钱包 1 是测试链的矿工地址。
                    测试链只有一个矿工。</p>
                <ul>
                    <li>mainnet 表示主网地址，testnet 表示测试网地址，在这里我们只会用到 testnet。</li>
                    <li>lock_arg 是钱包对应的公钥哈希的前20位，也是这个钱包拥有的 cell 中 lock 锁 args 字段的值: lock_arg = cell.lock.args</li>
                    <li>lock_hash 是这个钱包拥有的 cell 中 lock 锁的哈希的前20位：lock_hash = hash(cell.lock) </li>
                    <li>privateKey 是钱包的私钥，你不应该像我这样把它暴露出来。</li>
                </ul>
            </div>
            <Wallets onFetchWallets={setWallets}></Wallets>
            <hr/>
            <div>
                <WalletCells wallets={wallets} wallet_lock={{hash_type:'type', code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8', args: '0x43d509d97f26007a285f39241cffcd411157196c'}}></WalletCells>
            </div>
            <div>
                <p>这是钱包对应的交易: </p>
                <Transaction query={{lock: {hash_type:'type', code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8', args: '0x43d509d97f26007a285f39241cffcd411157196c'}}}></Transaction>
            </div>
            <div>
                <p>这是测试链的配置信息：</p>
                <ChainConfig />
            </div>
        </div>
    )
}