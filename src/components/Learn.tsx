import React from 'react';
import Blockchain from './Blockchain';

const styles = {
    page: {
        minWidth: '500px',
        width: '70%',
        margin: '0 auto',
        textAlign: 'center' as const
    },
    content: {
        marginTop: '20px',
        width: '500px',
        margin: '0 auto',
        textAlign: 'left' as const
    },
    main_color: {
        color: '#3CC68A'
    }
}

function Learn() {

  return (
    <div style={styles.page}>
        <h1>Before We Get Started</h1>
        <hr/>
        <div style={styles.content}>
            <p> 首先恭喜你！点开这个页面，就已经预示着你将比其他初学者更早搞懂关于 CKB 的一切！</p>
            <p> 不管你是为了在 CKB 上开发 DAPP，还是单纯对 CKB 感到好奇，想要搞懂它的基本原理，都可以跟随本教程，完成与 CKB 的第一次亲密接触。</p>
            <p> 这个教程分为四部分，跟随教程完整地走完一遍，我们将会完成并搞懂：</p>
            <ul>
                <li>怎样在 CKB 上构建并发送一笔最简单的转账交易 </li>
                <li>怎样在 CKB 上构建并发送一笔最简单的<strong style={styles.main_color}>多签</strong>交易 </li>
                <li>怎样在 CKB 上构建并部署一个最简单的智能合约 </li>
                <li>怎样在 CKB 上构建并部署一个<strong style={styles.main_color}>可升级</strong>的智能合约 </li>
            </ul>
            <p> 而且最棒的是，搞懂这一切
                <strong style={styles.main_color}>
                    <ul>
                        <li>不需要你在本地下载任何东西</li> 
                        <li>不需要你运行任何软件</li>
                        <li>甚至不需要你写一行代码！</li>
                    </ul>
                </strong>
                一切都将在本页面中，以一种远程与云端测试链互动的方式完成，所以对你的唯一要求是：保持持续阅读的耐心，以及对 CKB 的好奇心！</p>
            <p> 我们希望把这个教程做成 CKB 开发者 on-boarding 的第一站。如果你在学习本教程的过程中有任何建议或想法，欢迎邮件：retric@cryptape.com </p>
            <p> 那么废话不多说，让我们在 CKB 上开始这一次有趣的冒险旅程吧！</p>
        </div>
        <hr/>
        <h1 style={styles.main_color}> Pre-Knowledge </h1>
        <p>这里的知识总的来说分为三部分：一个盒子、两把锁、一笔交易。</p>
        <div style={styles.content}>
        <p> 你肯定知道比特币，也肯定听说过这样一句话：世上根本没有比特币，只有一个一个的 UTXO。</p>
        <p> CKB 所做的一切创新都构建于比特币之上，它将 UTXO 结构泛化，使之可以存储任何类型的数据结构，同时引入了以 RISC-V 为基础的虚拟机 CKB-VM，
            从而第一次将一台真正意义上的微型计算机嵌入到了区块链上！</p>
        <p> 理解 CKB 的第一步，是抛开所有复杂的概念，只抓住这条链的本质：CKB 链上的所有一切东西，都是一个个的 Cell，以及这些 Cell 的转换而已。</p>
        </div>
        <hr/>
        <div style={styles.content}>
            <h3 style={styles.main_color}> 我们以一种简化的方式来理解 CKB</h3>
            <p>
                CKB 的基本单元是 Cell，就像人体是由细胞组成的那样。一个个的 Cell 构成了整个 CKB 这条链的全局状态，我们在区块链上发起一笔交易改变了某个状态，
                无论这笔交易多么复杂，状态改变多么复杂，
                本质上对 CKB 来说，都是这笔交易把某些 Cell 消费掉，从而产生了一些新的 Cell 而已。这个过程跟比特币的 UTXO 是完全一样的。而被消费掉的 Cell 就是死去的 Dead Cell，
                未被消费的 Cell 是 live Cell。某一时刻所有的 live cell，就组成了 CKB 这条链在这一时刻的全局状态。所以这条链真的就像一个人一样，一笔交易去消费 Cell 和创造 Cell 的过程，
                就像全身的细胞在更新换代、不断分裂的过程一样，都在不断更新。
            </p>
            <p>
                Cell 可以用来存储任意类型的数据，因为 Cell 有一个字段名为 data，里面可以放 16 进制的无格式字符串进去。你往 data 上写入什么样的内容都可以，格式也是你自己定，
                只要你自己知道怎么解读这段字符串就行了。比如我可以往上面存一段话，也可以存一个日期，没有任何限制。甚至，你也可以放一段代码进去，而这段代码可以被其他 Cell 引用，
                经过虚拟机 CKB-VM 在链上运行。这其实就是 CKB 上所谓的智能合约，它的原理就是如此简单。
            </p>
            <h4 style={styles.main_color}> 那么我们怎样才能拥有一个 Cell 呢？</h4>
            <p>
                因为 Cell 是经过整条链共识得到的，所以 Cell 的存储空间必然是宝贵的，要拥有 Cell 必然也是需要成本的。
                这就引出了 CKB 原生代币 CKByte 的作用了。你可以把 Cell 当成一个一个的小盒子，可以拿来装东西，而这个盒子本身是通过代币创造出来的。你有多少币，
                你就可以有多少个盒子、多大的盒子，1个 CKB 等于 1个 byte（字节）的空间。盒子可以细分成多个盒子，只要总的盒子空间大小跟你持有的代币总量一样大就行。
            </p>
            <p>
                比如，你有 100 个CKB，那你在链上就有 100 byte 的空间，你就能创造出拥有 100 byte 空间的盒子，也就是一个个的 Cell。至于你的这 100 byte 
                总共是一个盒子还是两个盒子，可以随意创造。
            </p>
            <p>
                盒子有了空间之后可以拿来放数据，这些数据的大小要小于整个盒子的大小，因为盒子还有一些其他的基础字段组成这个盒子，它们也需要占用一定的空间。100 CKB
                等于 100 byte 的 Cell 空间，一个汉字占2个字节大小，所以如果你有 100 CKB，那么你大概可以往这个 Cell 上存不到 50 个汉字的内容上去。《红楼梦》总共约为
                78 万字，按这样来算，你大概需要 156 万个 CKB 原生代币才能把整部红楼梦上传到链上。由此我们可以发现，链上的 Cell 空间真的是非常宝贵的存在，CKB 通过这种在链上
                存储共识的设计，也是为了鼓励大家把真正有价值的、有必要需要经过链的共识记录下来的数据上传到链上，这些数据我们也给它取了个名字，叫做人类共同知识库。这也是 CKB 
                名字的由来（Common knowledge base）。
            </p>
            <h4 style={styles.main_color}>完整的 Cell 模型长这样：</h4>
            <p>
                <pre>
                    {`
                        Cell: {
                            capacity: HexString
                            lock: Script
                            type: Script
                            data: HexString
                        } 
                    `}
                </pre>
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
            </p>
            <h4 style={styles.main_color}>怎么知道这个Cell属于你？</h4>
            <p>既然需要拥有原生代币才能拥有 Cell，那么我怎么知道链上的某一个 Cell 是属于你的呢？</p>
            <p>这就要开始介绍 lock 和 type 这两个字段的作用了。</p>
            <p>刚才我们说，lock 和 type 本质上是一个Script脚本类型的锁，这个锁实际上是由这么一个结构组成的：</p>
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
            <p>这两个参数合起来，共同提供了一个完整的“锁”：我们通过 code_hash 字段找到要执行的代码在哪里，然后往这段代码里传入一个参数，
                然后代码被虚拟机 CKB-VM 执行，如果执行成功，返回 0，则表示这个锁能被顺利解开，如果执行不成功返回其他数值，则表示这个锁无法解开。
            </p>
            <p>
                运用这个原理，你能设计出一套判断哪个 Cell 属于哪个用户的逻辑了吗？
            </p>
            <p>
                聪明的同学肯定想到了，本质上一个 Cell 属于谁，就是判断谁能解开这个 Cell 身上附带的锁。这跟比特币的原理是一样的。
                我们可以通过 code_hash 引入一个加密算法的代码，然后在 args 字段放入自己的公钥，当需要使用这个 Cell 的时候，比如需要发起一笔交易，
                就用私钥提供这笔交易的签名，这样加密算法输入我们的公钥，比对我们所提供的签名，就能判断是不是由对应私钥发起的交易，从而也就能判断背后是不是
                这个 Cell 真正的主人在操作。
            </p>
            <p>反过来说，如果你在构建一笔交易的时候，使用了一些Cell作为输入，然后输出一些新的Cell，如果输出的Cell没有加任何的锁（也就是说lock和type字段都为空），
                那么这意味着任何人都可以解锁这个Cell！这也意味着任何都可以使用和消费你的Cell，你的钱任何人都能花掉！所以千万要记住，一定要上把锁。</p>
            
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
            <h3 style={styles.main_color}>真正的代码去哪了？</h3>
            <p>我们已经知道，可以在 Cell 的 lock 和 type 字段放入一个锁，来帮我们保护这个盒子的所有权和控制权。</p>
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
                那么真正的代码，又是放在哪里的呢？</p>
            <p>答案很简单，代码是放在另一个 Cell 里的！</p>
            <p>我们知道 Cell 的 data 字段可以放任意的数据进去，因此我们可以把真正的代码放在另一个 Cell 的data字段，然后把这个 Cell 作为依赖引入到一笔交易里，
                这个依赖的 Cell 就叫作 dep cell。当我们需要给一个 Cell 加上这把锁的时候，只要引入这个 dep cell，然后用 code_hash 去匹配这个dep cell的data字段的代码哈希，
                就能让CKB系统知道，我们构成这把锁的代码就是这段代码了。
            </p>
            <p>这样做的一个好处是，如果所有人都需要相同类型的锁，那么锁的代码都是相同的，只要引入相同的 dep cell 就行了，而不用每个人都把相同的代码部署一遍，浪费空间。</p>
            <p>事实上，CKB 系统内建的一个很重要的脚本叫 SECP256K1_BLAKE160，它代表的就是用 SECP256K1 这种加密算法来组成每个 Cell lock 字段的锁。</p>
            <p>当你拥有一些代币时，代币对应的 Cell 的所有权就是由系统默认创建的这种 lock 锁提供保护的。而 CKB 系统实现这一点的方法，是在创世块的时候创建了一些 Cell，
                然后在这些 Cell 的 data 字段放入 SECP256K1 这个加密算法的具体代码，然后让需要这种锁的 Cell 使用 code_hash 去引用这些 Cell，在 args 字段放入自己的
                公钥哈希，从而让这把锁有能力去判断，一笔交易中所提供的签名，是否与这个公钥相符。
            </p>
            <p>
                这时候又有一个问题了！
            </p>
            <h4 style={styles.main_color}>锁的代码如果丢了怎么办？</h4>
            <p>锁的代码是放在另一个Cell里面的，如果这个 Cell 被别人销毁了怎么办？这个 Cell 被消费掉，锁的代码就消失了，也可以被更改成新的代码，那么 code_hash 
                对应的哈希就找不到原来的代码了，这样 Cell 就永远无法再解锁了？</p>
            <p>没错！理论上锁的代码所存放的 Cell 应该随着这条链的寿命一样永远存在下去。不应该有人能动这个Cell。所以如果你去查的话，其实可以看到，CKB所有内建的锁脚本，所依赖的dep cell
                本身是任何人无法动的，因为我们在这些dep cell上的lock字段都设置了0x0000的数值，这意味着没有人能再操作这些Cell，代码也就将一直存在下去：
                <pre>{`
                    SECP256K1: {
                        code_hash: 0x0000000000000
                        args: 0x
                        hash_type..
                    }
                `}</pre>
            </p>
            <p>当然，实际上如果这个dep_cell被销毁了，我们还是能够拿解锁自己的Cell，因为你只要把相同的锁代码再重新放到一个新的Cell的data字段里，然后把这个Cell作为
                dep_cell 引入就能重新找回锁的代码。这是CKB的另一个灵活之处。
            </p>
            <p>我们上面讲的这些锁的例子，其实大部分是 Cell里lock字段的锁。</p>
            <p>实际上一个cell盒子，可以放两把锁，因为除了lock字段，还有一个type字段，它跟lock本质上完全一样，都是Script的脚本结构。只不过因为用途不同，所以取了不同的名字。</p>
            <p>lock锁通常用来保护盒子的所有权，那么type锁又是用来干什么的呢？</p>
            <p>
                答案是，type锁是用来保证 Cell 在使用过程中遵循某些变换规则的。
            </p>
            <p>
                要搞懂这句话的意思，我们需要开始介绍CKB中的一笔交易到底是怎么回事了。
            </p>
            <h4 style={styles.main_color}>交易就是从一些盒子到另一些盒子</h4>
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
            <p>input中的Cell必须都是live cell，通过一笔交易之后，这些input cell都被消费掉了，也就都成了dead cell。而新创造出来的 output cell则成了新的live cell。</p>
            <p>CKB 交易中最根本的一条规则是，所有output cell，也就是新创造出的盒子，它的容量大小必须小于input cell。
                <pre>{`
                        capacity(input cell) > capacity(output cell)
                    `}
                </pre>
            </p>
            <p>其中多出来的那一部分空间大小，也就是input和output二者的差值，就是矿工收取到的手续费。</p>
            <p>在实际的设计中，出于存储优化，我们并不会真的在input中放入cell结构，而是放入cell的索引，通过索引找到输入的cell，这个索引的结构，叫OutPoint。
                 <pre>{`
                        OutPoint: {
                            tx_hash: 表示这个cell所属的交易的哈希值（属于哪一笔交易）
                            index: 表示这个cell属于一笔交易中的输出的ID（第几个输出）
                        }
                    `}
                </pre>
            </p>
            
            <p>
                在交易中，这些Cell的从输入变成输出，它们的转换中可以遵循某些用户定下来的规则。比如我希望某个Cell在交易中必须永远不会被拆分成两个cell，那么我就可以把
                这样一条规则变成一把锁，挂在盒子上。再比如，我希望一个cell在交易中它的data字段永远不会存入任何“胡萝卜”的字样，那么也可以构造这样一种规则的锁，
                然后这把锁通常会放到盒子的type锁里。
            </p>
            <p>
                这就是type和lock这两把锁的作用。归根到底，这两作用不同，是因为这两把锁的运行规则有所差异。它们可以被总结成如下：
            </p>
            <p>
                <ul>
                    <li>
                        一笔交易中，所有input的lock锁会被执行一遍。
                    </li>
                    <li>
                        一笔交易中，所有input和output的type锁会被执行一遍。
                    </li>
                </ul>
            </p>
            <p>因为这两条不同，所以衍生出来的适合的用途也不同。当然，你可以有自己的想法，这只是官方推荐的一种用法而已。</p>
            <p>可以说，lock锁是 cell 的开门人，type锁则是 cell 的守护神！</p>
        </div>
        <div>
            恭喜你，你已经掌握了所有必须的知识！接下来我们终于可以开始动手了！
        </div>
        <Blockchain />
    </div>
  );
}

export default Learn;
