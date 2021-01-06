import React, { useEffect, useState } from 'react';
import styles from '../../widget/common_style';
import Form from '../../widget/form';
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
  RawTransaction,
  Wallet,
  ChainConfig,
  QueryOption
} from '../../../types/blockchain'
import Cells from './common/Cells';
import Api from '../../../api/blockchain';
import CompleteTxWithWitness from './class_1/CompleteTxWithWitness';

export default function Class1(){

    const default_wallet_number = 0; //number 1 wallet, the miner's wallet
    const [default_lock_query_option, setDefaultLockQueryOption] = useState<QueryOption>({});

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

    const prepareDefaultWitnessFromRawTx = () => {
        const witnesses = [];
        if(raw_tx?.inputs){
          for(let i=0;i<raw_tx?.inputs.length;i++){
            witnesses.push({
              lock: ''
            });
          } 
        }
        return witnesses;
    }

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

    const fetchChainMinInfor = async () => {
        const api = new Api();
        const myWallets: Wallet[] = await api.getWallets();
        const cc: ChainConfig = await api.getChainConfig();
        setDefaultLockQueryOption({
          lock: {
            code_hash: cc.SCRIPTS.SECP256K1_BLAKE160.CODE_HASH,
            args: myWallets[default_wallet_number].lock_arg,
            hash_type: cc.SCRIPTS.SECP256K1_BLAKE160.HASH_TYPE === 'type' ? 'type':'data'
        }});
    }

    useEffect(()=>{
      fetchChainMinInfor();
    }, []);

    return(
        <div id="how-to-send-a-tx">
            <div style={styles.content}>
                <h3 style={styles.main_color}>发送一笔交易</h3>
                <p>我们将在本节内容学会并亲自动手完成一笔最基础的转账交易。</p>
                <p>在开始之前，让我们在黑板上再次重写一遍：</p>
                <blockquote style={styles.blockquote}>
                  一笔CKB的交易，无非是消费一些已有的 live cell，去创造出另一些新的 live cell。
                </blockquote>
                <p>同时，因为 CKB 采用的是“链下计算、链上确认”的设计，所以我们在转账的时候，甚至可以采用手动拼贴交易的方式，去完成一笔转账操作。</p>
                <p>只要我们事先拟好交易的内容（也就是注明这笔交易要消费哪些cell、创造出什么样的新cell），然后用相应的私钥对交易进行签名，
                  当这笔交易被提交到链上，只要验证通过、签名有效，那么交易就会被打包完成。</p>
                <p>这种手动拼贴交易的方式意味着什么呢？</p>
                <p>在 CKB 这种体系下，其实我们人肉组成了一个 layer2 网络。</p>
                <div style={styles.explain_text}>
                  <p>想象现在你有一位朋友住在亚马逊丛林里，他独自生活，身边只有一台离线的电脑，没有网络，与世隔绝。</p>
                  <p>某天下午他打猎归来，突然想起来还欠你一点钱，他打开电脑，想转给你 1 万个 CKB 还债。</p>
                  <p>尽管没有网络，他还是把转账交易的内容写在了一张纸上，然后在电脑里输入自己的私钥，计算出了这笔转账相应的签名，最后把签名也附在了纸上。</p>
                  <p>过了半个月，当有信差来访时，他托人把这张纸邮寄到中国，又过了半个月，信纸终于送到了你的手上。</p>
                  <p>你看着信纸，交易确实指明创造 1 万 CKB 的 cell 给你，你决定把这笔交易提交到 CKB 主网上。
                    主网验证附上的签名有效，于是交易完成，你的账户里多了一万个CKB，债务两清了。</p>
                  <p>你和亚马逊丛林的朋友共同组成了一个包含 2 个节点的 layer2 网络，虽然这个网络的吞吐量只有 1 笔交易/每月。</p>
                </div>
                <p>尽管 CKB 目前已经有了各种各样的工具，帮助你自动构建交易、完成转账、部署合约，等等，
                  但接下来，我们还是会延续亚马逊朋友的这种方法，来实现一笔普通的转账交易。
                  <br/><br/>
                  目的是使用手动拼接交易的方式，让你更深刻的理解 CKB cell 的工作原理。</p>

                <p>我们将使用 JSON 格式来手动拼接交易。</p>
                
                <h4 id="tx-input" style={styles.main_color}>交易的 INPUT</h4>
                <p>下面是钱包 1 的 4 个 live cell，直接把 cell 拖到下面的框中，看看自动生成的 input 是什么样子的。</p>

                <Cells query={default_lock_query_option} render_dep={default_lock_query_option}  
                length={4} text={{title:'钱包 1 的 Cell', btn_text:'Fetch'}} 
                custom_style={{layout_style:{border:'1px solid gray'}}} ></Cells>

                <DragCellToInputJson />

                <div style={styles.explain_text}> 
                  <p>你可能看到了，input 中的 cell 是以 <code style={styles.single_line_code}>previous_output</code> 的形式出现的，
                  传入的是 tx_hash 和 index 组成的 outpoint，相当于是对 cell 的一个索引，或者像 cell 的一个指针，通过 outpoint 我们找到想要消费的 cell。</p>

                  <p>inputs 中还有一个字段叫 <code style={styles.single_line_code}>since</code>，它是用来控制时间的，我们暂且不必管它。 </p>

                  <p>除了inputs，还有一个字段叫 <code style={styles.single_line_code}>cell_deps</code>，它是一笔交易中需要依赖的 cell，
                  也是以 outpoint 这种索引结果出现的。</p>

                  <p>什么是需要依赖的 cell 呢？<br/><br/>
                    比如在普通的转账交易中，lock 锁需要用到固定的加密算法 SECP256K1_BLAKE160，也就是系统内置的一个智能合约，
                    这个加密算法的代码存放在某个 cell 中，就需要在 cell_deps 中引用进来，
                    这样 CKB-VM 虚拟机才能知道从哪里载入代码进行运算。</p>
                  <p>通过上文测试链的配置信息，我们很容易找到 cell_deps 中需要传入的参数。</p>
                </div>
                
                <h4 id="tx-output" style={styles.main_color}>交易的 OUTPUT</h4>
                <p>接下来我们再使用另一个工具，看看生成的output、以及一笔完整的交易长什么样子。</p>
                
                <div style={styles.explain_text}>
                  <p>同样，把钱包 1 的 cell 拖到 input 中。</p>
                  <p>output 方框内将马上自动生成一个相同大小的新 cell。</p>
                  <p>点击 output 中的设置按钮，可以对新生成的 cell 进行重新分配，包括生成几个 cell、设置每个新 cell 的大小，设置每个 cell 的解锁地址，等等。</p>
                  <p>output 占用的 capacity 空间必须小于 input，二者的差值即为矿工能挣到的手续费。</p>
                  <p>设置完成后，点击“生成交易”的按钮，就可以看到这笔交易的 JSON 是什么样子了。</p>
                </div>

                <Cells query={default_lock_query_option} render_dep={default_lock_query_option} length={4} 
                text={{title:'钱包 1 的 Cell', btn_text:'Fetch'}} 
                custom_style={{layout_style:{border:'1px solid gray'}}}></Cells>

                <TxConstructor />
                
                <div style={styles.explain_text}>
                  <p>你应该注意到了，交易中的 <code style={styles.single_line_code}>outputs</code> 
                  把新生成的 cell 的信息都写出来了，包括 capactiy 大小、lock 锁等信息。</p>
                  <p>但 output 中的 cell 并没有指明 data 的信息，相反，data 被统一挪到了 
                    <code style={styles.single_line_code}>outputs_data</code> 字段中，按顺序对应 outputs 中的 cell。</p>
                  <p>这样做也是出于性能优化角度来设计的。</p>
                  <p>最后，一笔完整的交易还包括 <code style={styles.single_line_code}>version</code> 和 <code style={styles.single_line_code}>header_deps</code> 两个字段。
                  前者为版本信息，目前固定设置为 0x0 ，后者暂时不用管，放空就行。
                  </p>
                </div>

                <h4 id="sign-a-tx" style={styles.main_color}>对交易进行签名</h4>
                <p>一笔转账拼好之后，需要用相应的私钥，对这笔交易进行签名，表明我们确实是 cell 的主人，有权对这些 cell 执行操作。</p>
                <p>签名将被放入一个新的名为 witnesses 的字段中，作为交易的证明。</p>
                <p>到这里你已经完整了解了一笔交易的过程，我们马上开始动手发交易。</p>
                <br/><br/><br/>
                <hr/>
                <div id="construct-a-tx"></div>
                <p>现在，把下面白框中的空白交易填满。<br/><br/>
                  把它当作一次练习，自己用手动的方式填写一笔转账交易。<br/><br/>
                  你可能需要用到查找钱包对应的 live Cell、查看链配置信息(用来填写 cell_deps)、16 进制与 10 进制互相转换这些功能，它们在右手边的工具箱中都可以找到。<br/><br/>
                  点击右边 👉 Nervos 的 logo，即可打开工具箱。</p>
                <div id="fill-the-tx-form"></div>
                <Form form_template={raw_tx_template} onSubmit={onRawTxSubmit} btn_text={'保存'} title_text={'将下面的交易补充完成'}></Form>

                <p>填写完成后，点击保存按钮。</p>

                <p>好了，到这里你已经手动把交易全部填好了。</p>
                <p>这时我们已经可以为这笔交易生成一个独一无二的哈希了，也就是 tx_hash 已经可以提前确定出来。</p>
                <p id="generate-tx-hash">点击下面的按钮，试试生成生成交易的哈希。</p>

                <ToTxHash raw_tx={raw_tx}></ToTxHash>

                <p> 尽管这笔交易已经可以提前生成 tx_hash，但它现在仍然是一笔 raw_tx。raw_tx 跟 tx 最大的不同是，tx 会在 witnessness 字段中放入交易的签名。<br/><br/>
                    事实上，你可以在witness里放入任何你需要的参数或者证明。
                    但因为现在我们在尝试的是系统内建的转账交易，这种交易互相约定会在 witness 中放入这样一个结构：</p>
                <CodePiece code={
                    {
                        lock: '证明',
                        input_type: '证明',
                        output_type: '证明',
                    }
                } custom_style={{padding: '5px'}} />
                <p>
                    其中，lock 字段是放入 lock 锁需要验证的签名。在我们现在要使用的普通转账交易中，
                    就是 SECP256K1_BLAKE160 算法需要验证的签名。
                    所以我们将会在 witness.lock 这里放入签名。
                </p>
                <p>
                    witness是一个数组，所以可以放入多个证明。
                    我们需要在第一个位置放入 P2PKH 的签名，同时其他的位置则放入用户自己的 witness。
                </p>
                <p id="generate-message">为了完成签名，我们首先需要让这笔交易生成一个待签名的 message。</p>
                
                <ToSignMessage raw_tx={raw_tx} />

                <h4 style={styles.main_color}>开始签名</h4>

                <p id="start-signing">有了 message，以及钱包里的私钥，我们就可以计算出签名了。</p>

                <Signer></Signer>

                <h4 style={styles.main_color}>把签名放回到交易中</h4>
                <p>把生成的签名填入下面的输入框中，点击按钮，以 witnessArgs 的形式做一遍序列化：</p>
                <SeriliazedWitnessArgs></SeriliazedWitnessArgs>

                <p id="put-sign-back" >现在我们可以完善原本的交易了，把序列化好的签名放进 witnesses 字段里：</p>

                { JSON.stringify(raw_tx) &&
                    <Form form_template={ eval('`' + JSON.stringify(raw_tx).substring(1, JSON.stringify(raw_tx).length-1) + '`')} onSubmit={onCompleteTxSubmit} btn_text={'保存'}></Form>
                }

                <h4 id="send-tx" style={styles.main_color}>最后一步，把交易发送到链上</h4>
                <SendTx tx={complete_tx}></SendTx>
                <p>最后恭喜你，成功完成了第一小节的内容～</p>
                <p>接下来，我们将会学习如何发送一笔<span style={styles.main_color}>多签</span>的转账交易。</p>
            </div>
        </div>
    )
}
