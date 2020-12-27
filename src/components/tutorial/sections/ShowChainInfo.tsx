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
            <div style={styles.wide_card} id="hands-on">
                <h1 style={styles.wide_card_title}>第二步：动手实践</h1>
                <blockquote style={styles.blockquote}>
                    亲自上手摸摸 CKB 这条链，
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
            
            <div id="watch-a-chain">
            <NewBlocks></NewBlocks>

            <div style={styles.content}>
                <p> 接下来我们准备了 3 个钱包。</p>
                <p> 试试看把鼠标移到钱包上，打开钱包。</p>
            </div>

            <Wallets onFetchWallets={setWallets}></Wallets>

            <div style={styles.content}>
                <div style={styles.explain_text}>
                    <p>每个钱包有四条信息，其含义如下：</p>
                    <ul>
                        <li>mainnet，表示钱包的主网地址。</li>
                        <li>testnet，表示钱包的测试网地址。本次教程我们只会用到 testnet 地址。</li>
                        <li>lock_arg，是钱包对应的公钥哈希的前20位。你可以简单把它理解成公钥的指纹。</li>
                        <li>private_key，是钱包的私钥。你不应该像我这样把它暴露出来。</li>
                    </ul>
                    <p>
                        在本次教程中，这 3 个钱包将被我们用于发送交易、部署合约等各种用途。
                    </p>
                </div>
                <hr/>
                <p>
                    现在，你可以通过下面的按钮，选择其中任意一个钱包，查看这个钱包相关的 Cell 和交易。
                </p>
            </div>

            <div>
                <WalletCells wallets={wallets}></WalletCells>
            </div>

            <div style={styles.content}>
                <div style={styles.explain_text}>
                    <p>
                        点击上面任意一个 Cell 或者任意一笔交易，你会看到 JSON 格式的详细信息。
                    </p>
                    <p>
                        当我们在说，一个钱包拥有多少 CKB (原生代币)的时候，我们其实指的是，这个钱包能够解锁的所有的 live Cell 的 capacity 之和，也是这个钱包在链上占有的总存储空间。
                    </p>

                    <p> 现在，钱包 1 是云端这一条测试链默认的矿工地址。<br/><br/>
                        也就是说，钱包 1 将源源不断收到来自挖矿所获得的出块奖励。所以你会看到钱包 1 的余额在不断增长。<br/><br/>
                        目前测试链只有一个矿工。
                    </p>
                </div>
            </div>
            <hr/>
            <div style={styles.content}>
                <p>最后，我们还需要知道这条测试链的配置信息。</p>
                <ChainConfig />
                <div style={styles.explain_text}>
                    <p><code style={styles.single_line_code}>prefix：ckt</code> 表明这条链是测试链，而不是主网。</p>
                    <p><code style={styles.single_line_code}>scripts</code> 里代表的则是链内置的智能合约。</p>
                    <p>每条CKB链都会预先在创世块部署几个系统内置的智能合约，上面显示了3个系统合约的具体信息。</p>
                    <ul>
                        <li>SECP256K1_BLAKE160：是系统默认使用的 Cell 的 lock 锁的合约，用来保护 Cell 的所有权</li>
                        <li>SECP256K1_BLAKE160_MULTISIG：是 SECP256K1_BLAKE160 的多签版本</li>
                        <li>DAO：NervosDAO 合约，暂时可以不用管</li>
                    </ul>
                </div>
                <hr/>
                <p>
                    好了，这就是我们所有必须了解的信息了。
                </p>
                <p>
                    接下来，我们将开始构建并发送第一笔交易！
                </p>
                </div>
            </div>
        </div>
    )
}