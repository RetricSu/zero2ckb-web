import React, { useState } from 'react';
import Wallets from './common/Wallets';
import WalletTxs from './show_chain_info/WalletTransaction';
import ChainConfig from './show_chain_info/ChainConfig';
import WalletCells from './show_chain_info/WalletCells';
import NewBlocks from './show_chain_info/new_blocks';
import styles from '../../widget/common_style';
import type {
    Wallet
} from '../../../types/blockchain';

export default function(){
    const [wallets, setWallets] = useState<Wallet[]>([]);

    return(
        <div>
            <hr/>
            <div style={styles.wide_card}>
                <h1 style={styles.wide_card_title}>第二步：动手实践</h1>
                <blockquote style={styles.blockquote}>
                    亲自上手摸摸CKB这条链，
                    <br/><br/>
                    才能更好体会到前面的理论知识。
                </blockquote>
            </div>
            <hr/>

            <div style={styles.content}>
                <p>
                    我们已经在云端运行了一条测试链， 
                    并预先生成了一些账户地址，方便这次教程的使用。
                    <br/><br/>
                    试试点击下面的按钮，查看这条链最新的区块。
                </p>
            </div>

            <NewBlocks></NewBlocks>

            <div style={styles.content}>
                <p> 接下来我们准备了 3 个钱包。</p>
                <p> 试试看把鼠标移到钱包上，打开钱包。</p>
            </div>

            <Wallets onFetchWallets={setWallets}></Wallets>

            <div style={styles.content}>
                <p>你可以看到，钱包里包含四条信息，其具体的含义如下：</p>
                <ul>
                    <li>mainnet，表示钱包的主网地址。</li>
                    <li>testnet 表示测试网地址，在这里我们只会用到 testnet。</li>
                    <li>lock_arg，是钱包对应的公钥哈希的前20位，你可以简单把它理解成公钥的指纹。</li>
                    <li>private_key，是钱包的私钥，你不应该像我这样把它暴露出来。</li>
                </ul>
                <p>
                    在本次教程中，这 3 个钱包将被我们用于发送交易、部署合约等各种用途。
                </p>
                <p>
                    现在，你可以先通过下面的按钮，选择其中任意一个钱包，查看与这个钱包相关的 Cell 和交易的信息。
                </p>
            </div>

            <div>
                <WalletCells wallets={wallets}></WalletCells>
            </div>

            <div style={styles.content}>
                <p>
                    当我们在说，一个钱包拥有多少原生代币的时候，我们其实指的是，这个钱包能够解锁的所有的 live Cell 的 capacity 之和，也是这个钱包在链上总的存储空间。
                </p>

                <p> 其中，钱包 1 是云端这一条测试链的默认的矿工地址。<br/><br/>
                    也就是说，钱包 1 的地址，将源源不断地收到来自挖矿所获得的出块奖励。所以你会看到钱包 1 的余额在不断增长。<br/><br/>
                    目前测试链只有一个矿工。
                </p>
            </div>
            <div>
                <p>这是测试链的配置信息：</p>
                <ChainConfig />
            </div>
        </div>
    )
}