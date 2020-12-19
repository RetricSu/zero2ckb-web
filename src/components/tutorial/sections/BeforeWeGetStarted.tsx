import React from 'react';
import styles from '../../widget/common_style';

export default function BeforeWeGetStarted(){
    return(
        <div id="beforewegetstarted">
            <h1>Before We Get Started</h1>
            <hr/>
            <div style={styles.content}>
                <p> 首先恭喜你点开了这个页面！相信我，这预示着你将比其他初学者更早搞懂关于 CKB 的一切。
                </p>
                <p> 不管你是为了在 CKB 上开发 DAPP，还是单纯对 CKB 感到好奇想要弄懂基本原理，都可以跟随本教程，完成与 CKB 的第一次亲密接触。</p>
                <p> 这个教程分为四部分，跟随教程完整走一遍，我们将会亲自动手完成、并搞懂怎样在 CKB 上：</p>
                <ul>
                    <li>构建并发送一笔最简单的转账交易 </li>
                    <li>构建并发送一笔最简单的<strong style={styles.main_color}>多签</strong>交易 </li>
                    <li>构建并部署一个最简单的智能合约 </li>
                    <li>构建并部署一个<strong style={styles.main_color}>可升级</strong>的智能合约 </li>
                </ul>
                <p> 最棒的是，搞懂这一切 </p>
                <strong style={styles.main_color}>
                    <ul>
                        <li>不需要你在本地下载任何东西</li> 
                        <li>不需要你运行任何软件</li>
                        <li>甚至不需要你写一行代码！</li>
                    </ul>
                </strong>
                <p> 一切都将在本页面中，以一种纯手工的、远程的、与云端测试链互动的方式完成。</p>
                <p> 所以你需要具备的唯一要求是：保持往下阅读的耐心，以及对 CKB 的好奇心:D</p>
                <p> 我们希望把这个教程做成 CKB 开发者 on-boarding 的第一站。如果你在学习本教程的过程中有任何建议或想法，欢迎邮件：retric@cryptape.com 反馈。</p>
                <p> 那么废话不多说，让我们在 CKB 上开始这一次有趣的冒险之旅吧！</p>
            </div>
            <hr/>
        </div>
    )
} 