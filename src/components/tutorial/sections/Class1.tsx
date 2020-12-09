import React, { useState } from 'react';
import styles from '../../widget/common_style';
import Form from '../../widget/form';
import Hex2Dec from '../../toolbox/tools/hex2decimal';
import {notify} from '../../widget/notify';
import CodePiece from '../../widget/code';
import ToSignMessage from './class_1/FetchToSignMessage';
import ToTxHash from './class_1/ToTxHash';
import Signer from './class_1/Signer';
import SendTx from './class_1/SendTx';
import SeriliazedWitnessArgs from './class_1/SeriliazedWitnessArgs';

import type {
  Transaction,
  RawTransaction
} from '../../../types/blockchain'

export default function Class1(){

    const [raw_tx, setRawTx] = useState<RawTransaction>();
    const [complete_tx, setCompleteTx] = useState<Transaction>();
    const raw_tx_template = `{
      version: "0x0",
      cell_deps: [
        {
          out_point: {
            tx_hash:
              "0xace5ea83c478bb866edf122ff862085789158f5cbff155b7bb5f13058555b708",
            index: "0x0",
          },
          dep_type: "dep_group",
        },
      ],
      header_deps: [],
      inputs: [
        {
          since: "0x0",
          previous_output: {
            tx_hash:
              "0xc9d87fb5433d3655bdccea8a16386c202aeb72c2dcda4ad3528e8336deed3dcb",
            index: "0x0",
          },
        },
      ],
      outputs: [
        {
          capacity: "0x124762461389",
          lock: {
            code_hash:
              "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
            hash_type: "type",
            args: "0x43d509d97f26007a285f39241cffcd411157196c",
          },
        },
      ],
      outputs_data: ["0x"],
      witnesses: ["0x"]
}`;
    /*
    const raw_tx_template = `{
        version: "0x0",
        cell_deps: [
          {
            out_point: {
              tx_hash:
                "...",
              index: "...",
            },
            dep_type: "dep_group",
          },
        ],
        header_deps: [],
        inputs: [
          {
            since: "0x0",
            previous_output: {
              tx_hash:
                "...",
              index: "...",
            },
          },
        ],
        outputs: [
          {
            capacity: "...",
            lock: {
              code_hash:
                "...",
              hash_type: "...",
              args: "...",
            },
          },
        ],
        outputs_data: ["0x"]
}`
    */
    const onRawTxSubmit = (content: string) => {
        const raw_tx_content = JSON.parse(JSON.stringify(content));
        setRawTx(raw_tx_content);
        notify('raw_tx 已成功保存！')
    }

    const onCompleteTxSubmit = (content: string) => {
        const tx_content = JSON.parse(JSON.stringify(content));
        setCompleteTx(tx_content);
        notify('tx 已成功保存！');
    }

    return(
        <div>
            <div style={styles.content}>
                <h3 style={styles.main_color}>发送一笔交易</h3>
                <p>发送一笔最基础的转账交易，流程是这样：</p>
                <ul>
                    <li>1、拼接交易的内容</li>
                    <li>2、对交易进行签名</li>
                    <li>3、把交易签名放回到交易中</li>
                    <li>4、把交易发送到链上</li>
                </ul>
                <p>
                    我们来逐一进行每个步骤。
                </p>

                <h4 style={styles.main_color}>1、拼接一个最简单的转账交易</h4>
                <p>CKB 使用链下计算、链上确认的设计。所以我们完全可以用纯手工的方式来拼接一个交易，只要这个交易提交到链上能通过，那么交易就是有效的。</p>
                <p>这里可以有一个非常有趣的例子，线下没网了两个人怎么做交易。</p>

                <Form form_template={raw_tx_template} onSubmit={onRawTxSubmit} btn_text={'保存'}></Form>
                <p>把上面的表格填满，然后点击提交。</p>

                <p>当你在填写output的时候，可能对capacity应该填什么内容有点不清楚，这里是16进制的cell大小，10进制与16进制的互相转换可以使用这个小工具，应该能方便点。</p>
                <Hex2Dec />

                <h4 style={styles.main_color}>2、对交易进行签名</h4>

                <p>好了，到这里你应该已经手动把交易全部填好了，接下来我们要准备对raw_tx进行签名了。</p>
                <p>tx 跟 raw_tx 最大的不同是 tx 会在 witness 的字段里放入交易的签名。事实上你可以在witness里放入任何你需要的参数或者证明，
                    但因为现在我们在尝试的是系统内建的转账交易，这种交易默认在witness里中放入这样一个结构：</p>
                <CodePiece code={
                    {
                        lock: 'Script',
                        input_type: 'Script',
                        output_type: 'Script',
                    }
                } />
                <p>
                    其中，lock 字段是放入 lock 锁需要验证的签名。在我们现在要使用的普通转账交易中，就是 SECP256K1_BLAKE160 算法需要验证的签名。
                    所以我们将会在 witness.lock 这里放入签名。
                </p>
                <p>
                    witness是一个数组，所以可以放入多个证明。当进行 P2PKH 类型的签名时，需要在第一个位置放入签名，同时其他的位置则放入用户自己的witness。
                    交易的签名过程分为这么几步：
                </p>
                <ul>
                    <li>给witeness预留一个dummy_lock，长度65位</li>
                    <li>把相同类型的锁分组</li>
                </ul>
                <h5 style={styles.main_color}>生成 message</h5>
                <ul>
                    <li>对每个类型的锁分别哈希</li>
                    <li>哈希时，先哈希长度，再哈希实际内容</li>
                    <li>最后生成哈希摘要信息，即待签名的message</li>
                </ul>
                <h5 style={styles.main_color}>生成交易哈希</h5>
                <div>
                    <ToTxHash raw_tx={raw_tx}></ToTxHash>
                </div>
                <hr/>
                <ToSignMessage raw_tx={raw_tx} witnessArgs={[{lock:''}]}></ToSignMessage>

                <h4 style={styles.main_color}>开始签名</h4>
                <Signer></Signer>

                <h4 style={styles.main_color}>3、把交易签名放回到交易中</h4>
                <p>把生成的签名先做一遍序列化：</p>
                <SeriliazedWitnessArgs></SeriliazedWitnessArgs>

                <p>现在我们可以完善我们的交易了，把序列化好的签名放进witness字段里：</p>

                { JSON.stringify(raw_tx) &&
                    <Form form_template={ eval('`' + JSON.stringify(raw_tx).substring(1, JSON.stringify(raw_tx).length-1) + '`')} onSubmit={onCompleteTxSubmit} btn_text={'保存'}></Form>
                }
                <h4 style={styles.main_color}>4、把交易发送到链上</h4>
                <p>好了，现在我们终于可以开始发交易了！</p>
                <SendTx tx={complete_tx}></SendTx>
                <p>注意看下，成功发上交易后查询下是不是有这个新的cell出来，然后对比下这个tx_hash 和之前生成的那个是不是一样的？</p>
            </div>
        </div>
    )
}
