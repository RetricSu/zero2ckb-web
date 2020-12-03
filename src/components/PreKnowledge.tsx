import React from 'react';
import styles from './widget/common_style';
import CodePiece from './widget/code';

const code = {
    cell_structure: `
                        Cell: {
                            capacity: HexString
                            lock: Script
                            type: Script
                            data: HexString
                        } 
                    `,
    
}

export default function Preknowledge(){
    return(
        <div>
            <div style={styles.wide_card}>
            <h1 style={styles.wide_card_title}> 课前准备：理论知识 </h1>
            <blockquote style={styles.blockquote}>
                世上根本没有比特币，只有一个又一个的 UTXO。
                <br/>
                世上根本没有CKB, 只有一个又一个的 Cell。
            </blockquote>
        </div>
        <hr/>
        <div style={styles.content}>
            <h3 style={styles.main_color}> 让我们以一种简化的方式来理解 CKB</h3>
            <p> 理解 CKB 的第一步，是抛开所有复杂的概念，只抓住这条链的本质：一切都是 Cell，以及 Cell 的转换而已。</p>
            <p>
                Cell 是 CKB 的基本单元，就像人体的细胞。一个个的 Cell 构成了整个 CKB 这条链的全局状态。
                我们在区块链上发起一笔交易改变了某个状态，
                无论这笔交易多么复杂，状态改变流程多么繁琐，
                最终对 CKB 来说，都是这笔交易把某些 Cell 作为 input 消费掉，从而产生了一些新的 Cell 作为 output 而已。
                这个过程跟比特币的 UTXO 是完全一样的。
            </p>
            <p>
                被消费掉的 Cell 就是死去的 Dead Cell，未被消费的 Cell 是 live Cell。
                某一时刻所有的 live cell，共同组成了 CKB 这条链在这一时刻的全局状态。
                所以这条链真的就像一个人一样，不停地经由交易去消费 Cell 和创造 Cell，
                就像全身的细胞在更新换代、分裂生长。
            </p>
            <p>
                跟 UTXO 不同的是，Cell 可以用来存储任意类型的数据。Cell 有一个字段名为 data，里面可以放 16 进制的无格式字符串进去。
                你往 data 上写入什么样的内容都可以，格式也是你自己定，只要你自己知道怎么解读这段字符串就好。<br/><br/>
                比如，我可以往上面存一段话，也可以存一个日期，
                甚至，你可以放一段二进制代码进去，而这段代码又可以被其他 Cell 引用，
                经过虚拟机 CKB-VM 在链上运行。<br/><br/>
                这其实就是 CKB 上所谓的智能合约，它的原理就是如此简单。
            </p>
            <h4 style={styles.main_color}> 那么我们怎样才能拥有一个 Cell 呢？</h4>
            <p>
                因为 Cell 是经过整条链共识得到的，所以 Cell 的存储空间必然是宝贵的，要拥有 Cell 必然需要成本。<br/><br/>
                这就引出了 CKB 原生代币的作用了。<br/><br/>
                你可以把 Cell 当成一个一个的小盒子，可以拿来装东西，而这个盒子本身是通过代币创造出来的。<br/><br/>
                你有多少币，你就可以有多大的盒子。<br/><br/>
                根据系统的设定，1个 CKB 等于 1个 byte（字节）的空间。<br/><br/>
                此外，盒子还可以细分成多个盒子，只要总的盒子空间，跟你持有的代币总量相等就行。<br/><br/>
            </p>
            <p>
                比如，你有 100 个CKB，那你在链上就有 100 byte 的空间，你就能创造出拥有 100 byte 空间的盒子。<br/><br/>
                至于你的这 100 byte 总共是一个盒子还是两个盒子，可以随意划分创造。
            </p>
            <p>
                盒子(Cell)有了空间之后可以拿来放数据，这些数据的大小要小于整个盒子的大小，因为盒子还有一些其他的组成部分，它们也需要占用一定的空间。<br/><br/>
                按一个汉字占2个字节来算，如果你有 100 CKB，那么你大概可以往这个 Cell 上存不到 50 个汉字的内容上去。<br/><br/>
                《红楼梦》总共约为 78 万字，所以你大概需要 156 万个 CKB 原生代币才能把整部书上传到链上。<br/><br/>
                由此我们可以发现，链上的 Cell 空间真的是非常宝贵的存在。<br/><br/>
                CKB 通过这种在链上存储共识的设计，也是为了鼓励大家把真正有价值的、有必要经过共识的数据上传到链上。这些数据相当于整个人类共同拥有的知识库。实际上这也是 CKB 
                名字的由来（Common knowledge base）。
            </p>
            <h4 style={styles.main_color}>完整的 Cell 模型长这样：</h4>
            <CodePiece code={code.cell_structure} />
            <p>四个字段：</p>
            <p>
                <ul>
                    <li>capacity: 16进制字符串，表示Cell的空间大小，同时也是这个 Cell 代表的原生代币的数量</li>
                    <li>lock：脚本结构，本质相当于是一个锁，下文将详解</li>
                    <li>type: 脚本结构，本质和lock一样，只是锁的用途不同，下文将详解</li>
                    <li>data: 16进制字符串，可以在这个字段存放任何你想放入的数据和任何类型的数据</li>
                </ul>
            </p>
            <p>Cell 的组成规则是，上面这四个字段所占用的空间，加起来要小于或等于 capacity 字段的数值大小。也就是说，
                <pre style={styles.content}>
                    {`
                        Cell.length >= capacity.length + lock.length + type.length + data.length
                    `}
                </pre>
            </p>
            <h4 style={styles.main_color}>怎么知道你的Cell属于你？</h4>
            <p>既然需要拥有原生代币才能拥有 Cell，那么我怎么知道链上的某一个 Cell 是属于你的呢？</p>
            <p>这就要开始介绍 lock 和 type 这两个字段的作用了。</p>
            <p>如果说 Cell 是一个盒子，那么 lock 和 type 就相当于盒子上挂着的两把锁。这种锁由一些代码和输入参数组成，当我们试图去消费一个 Cell 的时候，这把锁会自动运行，输入参数和我们提交的一些证明（比如对交易的签名），看是否锁能否被解开，由此判断我们对 Cell 是否拥有所有权和控制权。</p>
            <p>这个锁是一个Script的脚本类型，它的真实模样长这样：</p>
            <p>
                <pre>{`
                    Script: {
                        code_hash: HexString
                        args: HexString
                        hash_type..
                    }
                `}</pre>
            </p>
            <p>三个字段，我们先忽略 hash_type 留给后面再讲：</p>
            <ul>
                <li>code_hash: 表示一段代码的哈希值。</li>
                <li>args: 表示要往这段代码传入的参数。</li>
            </ul>
            <p>这两个参数合起来，共同提供了一个完整的“锁”：我们通过 code_hash 字段找到要执行的代码在哪里，然后往这段代码里传入一个参数 args，
                然后代码会被虚拟机 CKB-VM 执行，如果执行成功，将返回 0，表示这个锁能被顺利解开，如果执行不成功，则表示这个锁无法解开。
            </p>
            <p>
                运用这个原理，现在你能设计出一套判断哪个 Cell 属于哪个用户的逻辑了吗？
            </p>
            <p>
                聪明的同学肯定想到了，本质上一个 Cell 属于谁，就是判断谁能解开这个 Cell 身上附带的锁。这跟比特币的原理是一样的。
                我们可以通过 code_hash 引入一个加密算法的代码，然后在 args 字段放入自己的公钥，当需要使用这个 Cell 的时候，比如需要发起一笔交易，
                就用公钥对应的私钥对这笔交易做一个签名，这样加密算法输入公钥和交易的签名，就能判断是不是由私钥发起的交易，从而也就能判断背后是不是
                这个 Cell 真正的主人在操作。
            </p>
            <p>反过来说，如果你在构建一笔交易的时候，使用了一些 Cell 作为输入，然后输出一些新的 Cell，如果输出的 Cell 没有加任何的锁（也就是说lock和type字段都为空），
                那么这意味着，任何人都可以解锁这个Cell！也就是说，你的钱任何人都能花掉！所以千万要记住，盒子上一定要加把锁。</p>
            
            <h3 style={styles.main_color}>课间休息</h3>
            <p>好了你已经成功读到了这里，我们来回顾下目前我们所掌握的新知识：</p>
            <ul>
                <li>CKB 这条链的本质是一个个的Cell，在不停地被创造出来和死去。</li>
                <li>Cell 就是一个盒子，一个容器，它可以用来装任何类型的数据。</li>
                <li>要拥有 Cell 这个盒子，你需要有代币。代币的数量等于盒子空间的大小。1 CKB = 1个 byte 字节大小。</li>
                <li>整个Cell占用的总空间，不能超过 capacity 字段的数值大小。</li>
                <li>要保护自己的 Cell，你可以在 Cell 这个盒子上加一把锁，只有自己的钥匙能打开。</li>
            </ul>
            <p>看起来相当不错，我们已经掌握了不少的原理。相信我你已经搞懂了大半，接下来我们还需要再了解一点细节。</p>
        </div>
        <div style={styles.content}>
            <h3 style={styles.main_color}>真正的代码藏在哪里？</h3>
            <p>我们已经知道，可以使用 Cell 的 lock 和 type 字段，给盒子上锁，来帮我们保护这个盒子的所有权和控制权。</p>
            <p>锁是一种脚本 Script 结构，这个结构长这样：</p>
            <p>
                <pre>{`
                    Script: {
                        code_hash: HexString
                        args: HexString
                        hash_type..
                    }
                `}</pre>
            </p>
            <p>刚才你应该注意到了，code_hash 里放的并不是真正的代码，而是代码的哈希，相当于这段代码的一个索引。我们通过这个索引，可以找到锁真正使用的代码。
                那么这段所谓真正的代码，又是放在哪里的呢？</p>
            <p>答案很简单，代码是放在另一个 Cell 里的！</p>
            <p>我们知道 Cell 的 data 字段可以放任意的数据进去，因此我们可以把真正的代码放在另一个 Cell 的data字段，然后把这个 Cell 作为依赖引入到一笔交易里，
                这个依赖的 Cell 就叫作 dep cell。 <br/><br/>   
                当我们需要给一个 Cell 加锁的时候，只要引入这个 dep cell，然后用 code_hash 去匹配 dep cell 的 data 字段的代码哈希，
                就能让CKB系统知道，我们构成这把锁的代码就是这段代码了。
            </p>
            <p>这样做的一个好处是，如果所有人都需要相同类型的锁，那么锁的代码都是相同的，只要引入相同的 dep cell 就行了，而不用每个人都把相同的代码重新部署一遍，浪费空间。</p>
            <p>事实上，CKB 系统内建的一个很重要的脚本叫 SECP256K1_BLAKE160，它代表的就是用 SECP256K1 这种加密算法来提供每个 Cell 最基础的所属权。</p>
            <p>当你拥有一些代币时，代币对应的 Cell 的所有权，就是由 SECP256K1 这把锁提供保护的。而 CKB 系统实现这一点的方法，是在创世块的时候创建了一些 Cell，
                然后在这些 Cell 的 data 字段放入 SECP256K1 加密算法的具体代码。需要这种锁的 Cell 使用 code_hash 去引用这些存放代码的 Cell，同时在 args 字段放入自己的
                公钥哈希，那么这把锁就有能力去判断，一笔交易中所提供的签名，是否与这个公钥相符。
            </p>
            <p>
                但这时候又有一个问题了！
            </p>
            <h4 style={styles.main_color}>锁的代码如果丢了怎么办？</h4>
            <p>锁的代码是放在另一个Cell里面的，如果这个 Cell 被别人销毁了怎么办？这个 Cell 被消费掉，意味着锁的代码要么消失了，要么可以被更改成新的代码，那么 code_hash 
                对应的哈希也就找不到原来的代码了，这样我们的 Cell 岂不是永远无法再解锁了？</p>
            <p>没错！理论上，存放锁代码的 Cell 应该随着这条链的寿命一样永远存在下去。不应该有人能动这个Cell。所以如果你去查的话，其实可以看到，CKB所有内建的锁脚本，所依赖的dep cell
                本身是任何人无法动的，因为我们在这些 dep cell 上的 lock 字段都设置了 0x0000 的数值，这意味着没有人能再解锁这些Cell，代码也就将一直存在下去：
                <pre>{`
                    SECP256K1: {
                        code_hash: 0x0000000000000
                        args: 0x
                        hash_type..
                    }
                `}</pre>
            </p>
            <p>当然，实际上如果这个dep_cell被销毁了，我们还是有办法解锁自己的Cell。因为你只要把相同的锁的代码再重新部署到一个新的 Cell 里，然后把新的 Cell 作为
                dep_cell 引入，就能重新找回锁的代码了。这是CKB的另一个灵活之处。
            </p>
            <p>我们上面讲的这些锁的例子，其实大部分是 Cell 里的 lock 字段的锁。</p>
            <p>实际上一个cell盒子，可以放两把锁，因为除了 lock 字段，还有一个 type 字段。这两把锁的本质是一样的，只不过因为用途的不同，所以取了不同的名字。</p>
            <p>lock 锁通常用来保护盒子的所有权，type 锁则用来保证 Cell 在交易过程中遵循某些数据变换规则的。</p>
            <p>
                要搞懂这句话的意思，我们需要开始介绍 CKB 中的一笔交易到底是怎么回事了。
            </p>
            <h4 style={styles.main_color}>交易就是销毁一些盒子，再创造一些盒子</h4>
            <p>
                CKB 中的一笔交易，掐去不太紧要的细节，本质上就是这样：
                <pre>{`
                    tx:
                        input -> output
                `}</pre>
            </p>
            <p>其中，input和output的本质，仍然是一些Cell：
                <pre>{`

                    input:
                        some cell...

                    output:
                        some new cell...

                `}</pre>
            </p>
            <p>input 中的 Cell 必须都是 live cell，通过一笔交易之后，这些 input cell 都被消费掉了，也就都成了dead cell。而新创造出来的 output cell 则成了新的 live cell。</p>
            <p>CKB 交易中最根本的一条规则是，所有 output cell，也就是新创造出的盒子，它占用的空间大小必须小于 input cell。
                <pre>{`
                        capacity(input cell) > capacity(output cell)
                    `}
                </pre>
            </p>
            <p>多出来的那一部分空间大小，也就是 input 和 output 二者之间的差值，则是矿工收取到的手续费。</p>
            <p>在实际的设计中，出于存储优化，我们并不会真的在 input 中放入完整的 cell 结构，而是只放 cell 的索引，通过索引找到输入的 cell。这个索引的结构叫 OutPoint。
                 <pre>{`
                        OutPoint: {
                            tx_hash: 表示这个cell所属的交易的哈希值（属于哪一笔交易）
                            index: 表示这个cell属于一笔交易中的输出的ID（第几个输出）
                        }
                    `}
                </pre>
            </p>
        
            
            <p>
                在交易中，cell 从输入变成输出，它们在转换中可以遵循某些用户自定义的规则。<br/><br/>
                
                比如，我希望某个 cell 在交易中必须永远不会被拆分成两个 cell，那么我就可以把这样一条规则变成一把锁，挂在盒子上。
                再比如，我希望一个 cell 在交易中，它的 data 字段永远不会出现任何“胡萝卜”的字样，那么也可以构造这样一种规则的锁，
                通常，这把锁会被放到盒子的type锁里。
            </p>
            <p>
                这就是 type 和 lock 这两把锁的不同。一个用来保护盒子的所有权，一个用来保护转换规则。lock 锁就像 cell 的开门人，而 type 锁则是 cell 的守护神。<br/><br/>
                归根到底，这种用途的不同，是因为这两把锁在运行规则的设计上有所差异。
            </p>
            <p>
                <ul>
                    <li>
                        lock 锁：一笔交易中，所有 input 的 lock 锁会被执行一遍。
                    </li>
                    <li>
                        type 锁：一笔交易中，所有 input 和 output 的 type 锁会被执行一遍。
                    </li>
                </ul>
            </p>
            <p>因为执行机制的不同，所以衍生出来的适合的用途也不同。当然，你也可以有自己的想法，本质上这些用途只是官方推荐的一种用法而已。你完全可以不遵守。</p>
        </div>
        <div style={styles.content}>
            <h3 style={styles.main_color}>课间休息</h3>
            <p>恭喜你，你已经掌握了所有必须的知识！</p>
            <p>回顾下我们掌握的所有理论：</p>
            <ul>
                <li>CKB 这条链的本质是一个个的 Cell，在不停地被创造出来和死去。</li>
                <li>Cell 就是一个盒子，一个容器，它可以用来装任何类型的数据。</li>
                <li>要拥有 Cell 这个盒子，你需要有代币。代币的数量等于盒子空间的大小。1 CKB = 1个 byte 字节大小。</li>
                <li>整个 Cell 占用的总空间，不能超过 capacity 字段的数值大小。</li>
                <li>要保护自己的 Cell，你可以在 Cell 这个盒子上加一把锁，只有自己的钥匙能打开。</li>
                <li>锁的本质是一段可以运行的代码和一些输入参数。通过输入参数和用户提供的一些签名或者证明，代码运行判断是否能解锁。</li>
                <li>Cell 使用 code_hash 找到锁对应的代码，这些代码存放在 dep cell 里的 data 字段。</li>
                <li>每个盒子配有两把锁，一把叫 lock，一把叫 type。</li>
                <li>所有 input 的 lock 锁在交易中都会被执行一遍，所以 lock 锁通常被用来保护盒子的所有权。</li>
                <li>所有 input 和 output 的 type 锁在交易中都会被执行一遍，所以 type 锁通常被用来保证盒子的数据转换规则。</li>
                <li>一笔交易的本质是销毁一些 cell，然后创造一些 cell。</li>
            </ul>
            <p>没错，只要掌握上面这些理论知识，你就可以开始上路了。接下来我们将亲自动手体验 CKB！</p>
        </div>
        </div>
    )
}