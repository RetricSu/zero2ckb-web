import React from 'react';
import Cells from './Cells';
import Wallets from './Wallets';
import Transaction from './Transaction';
import CodePiece from './widget/code';
import styles from './widget/common_style';

export default function(){
    return(
        <div>
            <div style={styles.content}>
                <h3 style={styles.main_color}>观察一条链</h3>
                <p>经过刚才的学习，现在我们进入实战。掌握了 Cell 模型，我们来看看一条链上真实的数据结构到底是怎么样的。</p>
                <hr/>
                    这里展示 cell、tx、block等结构。。。
                <hr/>
            </div>

            <Wallets></Wallets>

            <div>
                <p>这是钱包对应的 live cell：</p>
                <Cells query={{order:"desc", lock: {hash_type:'type', code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8', args: '0x43d509d97f26007a285f39241cffcd411157196c'}}}></Cells>
            </div>
            <div>
                <p>这是钱包对应的交易: </p>
                <Transaction query={{lock: {hash_type:'type', code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8', args: '0x43d509d97f26007a285f39241cffcd411157196c'}}}></Transaction>
            </div>
        </div>
    )
}