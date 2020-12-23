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
import TxConstructor from './common/TxConstructor';
import DragCellToInputJson from './common/DragCellToInputJson';

import type {
  Transaction,
  RawTransaction
} from '../../../types/blockchain'
import Cells from './common/Cells';

export default function Class1(){

    const [raw_tx, setRawTx] = useState<RawTransaction>();
    const [complete_tx, setCompleteTx] = useState<Transaction>();
    const raw_tx_template = `{
      version: "0x0",
      cell_deps: [
        {
          out_point: {
            tx_hash:
              "0x",
            index: "0x",
          },
          dep_type: "dep_group or code", 
        },
      ],
      header_deps: [],
      inputs: [
        {
          since: "0x0",
          previous_output: {
            tx_hash:
              "0x",
            index: "0x",
          },
        },
      ],
      outputs: [
        {
          capacity: "0x",
          lock: {
            code_hash:
              "0x",
            hash_type: "type or data",
            args: "0x",
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
                <p>让我们在黑板上再次重写一遍：<br/><br/>
                  一笔CKB的交易，无非是消费一些已有的 live cell，去创造出另一些新的 live cell。</p>
                <p>同时，因为 CKB 采用的是“链下计算、链上确认”的设计，所以我们在转账的时候，可以采用手动拼贴交易的方式，去完成一笔转账操作。</p>
                <p>只要我们拟好交易的内容（也就是说注明消费哪些cell、创造出什么样的新cell），然后用相应的私钥对交易进行签名，
                  当这笔交易被提交到链上，只要验证通过被证明是有效的，那么交易就会被打包完成。</p>
                <p>这种手动拼贴交易的方式意味着什么呢？在CKB这种体系下，其实我们人肉组成了一个 layer2 网络。</p>
                <p>想象现在你有一位朋友住在亚马逊丛林里，他独自生活，身边只有一台离线的电脑，没有网络，与世隔绝。</p>
                <p>某天下午他打猎归来，突然想起来还欠你一点钱，因为心生愧疚，他打开电脑，想转给你 1 万个 CKB 还债。</p>
                <p>尽管没有网络，他还是把转账交易的内容写在了一张纸上，然后在电脑里输入自己的私钥，计算出了这笔转账相应的签名，最后把签名也附在了纸上。</p>
                <p>过了半个月，当有信差来访时，他托人把这张纸邮寄到中国，又过了半个月，信纸终于送到了你的手上。</p>
                <p>你看着信纸，交易确实指明创造 1 万 CKB 的 cell 给你，于是你通过网络把这笔交易提交到了 CKB 主网上。
                  主网验证附上的签名有效，于是交易完成，你的账户里多了一万个CKB，债务两清了。</p>
                <p>你和亚马逊丛林的朋友共同组成了一个包含 2 个节点的 layer2 网络，虽然这个网络的吞吐量只有 1 笔交易/每月。</p>
                <p>CKB 目前已有有各种各样的工具帮助你自动构建交易、完成转账、合约部署等各种事情。
                  但接下来，我们还是会延续亚马逊朋友的这种方法，来实现一笔普通的转账交易，目的是使用手动拼接交易的方式，让你更深刻的理解CKB cell的工作原理。</p>

                <p>我们将通过 JSON 格式来拼接交易。</p>
                <p>假设现在我们要做一笔转账交易，让 <code style={styles.single_line_code}>钱包1</code> 
                转1000 CKB 给<code style={styles.single_line_code}>钱包2</code>，那么我们需要做的事是：</p>
                <p>找到钱包 1 拥有的 live cell ，拿出其中大于等于 1000 CKB 的 cell，作为 input 消费掉，去创造出新的 1000 CKB 的 cell 给钱包 2。</p>

                <p>下面是钱包 1 的 4 个 live cell，直接把 cell 拖到下面的框中，看看自动生成的 input 是什么样子的。</p>

                <Cells query={{lock: {
                code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
                args: '0x43d509d97f26007a285f39241cffcd411157196c',
                hash_type: 'type'
                }}}  length={4} text={{title:'钱包 1 的 live cell', btn_text:'Fetch Cell'}} ></Cells>

                <DragCellToInputJson />

                <p>你可能看到了，input 中的 cell 是以 <code style={styles.single_line_code}>previous_output</code> 的形式出现的，
                传入的是 tx_hash 和 index 组成的 outpoint，相当于是对 cell 的一个索引，或者像 cell 的一个指针，通过 outpoint 我们找到指定的 cell。</p>
                
                <p>inputs 中还有一个字段叫 <code style={styles.single_line_code}>since</code>，它是用来控制时间的，我们暂且不必管它。 </p>

                <p>除了inputs，还有一个字段叫 <code style={styles.single_line_code}>cell_deps</code>，它是一笔交易中需要依赖的 cell，
                也是以 outpoint 这种索引结果出现的。</p>

                <p>需要依赖的 cell 是什么呢？比如在普通的转账交易中，lock 锁需要用到固定的加密算法 SECP256K1_BLAKE160，也就是系统内置的一个智能合约，
                  这个加密算法的代码存放在某个 cell 中，就需要在 cell_deps 中引用进来，
                  这样 CKB-VM 虚拟机才能知道从哪里载入代码进行运算。</p>
                <p>通过测试链的配置信息，我们很容易找到交易中依赖的系统合约在 cell_deps 中需要传入的参数。</p>
                
                <p>接下来我们再使用另一个工具，看看生成一笔完整交易是怎么样的。</p>

                <p>同样，从下面钱包 1 的cell 中拖到交易构造器的input中，你会看到在output里自动生成了一个相同大小的 cell。</p>
                <p>点击output中的设置，可以对新生成的 cell 进行重新分配，包括生成几个cell、设置每个cell的大小，设置每个cell的解锁地址。</p>
                <p>output中设置的cell总大小必须小于input中的cell，差值即为矿工手续费。</p>
                <p>设置完成后，点击生成JSON按钮，就可以看到新生成的这笔交易是什么样子了。</p>

                <Cells query={{lock: {
                code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
                args: '0x43d509d97f26007a285f39241cffcd411157196c',
                hash_type: 'type'
                }}}  length={4} text={{title:'钱包 1 的 live cell', btn_text:'Fetch Cell'}} ></Cells>
                
                <TxConstructor />



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
