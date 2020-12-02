import React from 'react';
import styles from './widget/common_style';
import Form from './widget/form';

export default function(){
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
                <Form></Form>
                <p>把上面的表格填满，然后点击提交。</p>
                <h4 style={styles.main_color}>2、对交易进行签名</h4>
                
                <h4 style={styles.main_color}>3、把交易签名放回到交易中</h4>

                <h4 style={styles.main_color}>4、把交易发送到链上</h4>
    
            </div>
        </div>
    )
}