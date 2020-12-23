import React, { useState } from 'react';
import FreshButton from '../../../widget/fresh_button';
import Blocks from '../common/Blocks';
import Api from '../../../../api/blockchain';
import {notify} from '../../../widget/notify';
import type {
    Block
} from '../../../../types/blockchain';
import common_styles from '../../../widget/common_style';

const styles = {...common_styles, ...{
    container: {
        margin: '20px 0px',
        clear: 'both' as const
    },
    empty_placeholder: {
        width: '100%',
        minHeight: '50px',
        background: 'gray',
        padding: '20px 0'
    }
}}

export default function NewBlocks (){
    const [isLoading, setIsLoading] = useState(false);
    const [blocks, setBlocks] = useState<Block[]>([]);

    const fetchNewBlocks = async () => {
        setIsLoading(true);
        const api = new Api();
        const res = await api.getNewBlocks(9);
        if(res.status === "ok"){
            const blocks = res.data;
            console.log(blocks);
            setBlocks(blocks);
        }else{
            notify(JSON.stringify(res));
        }
        setIsLoading(false);
    }

    return(
        <div style={styles.container}>
            <div style={common_styles.clear_path}>
                <div style={{marginBottom: '20px'}}>
                    <FreshButton isLoading={isLoading} text={'Fetch Blocks'} onClick={fetchNewBlocks} custom_style={{width: '100%', minHeight: '60px', fontSize: '20px'}} ></FreshButton>
                </div>
                <Blocks blocks={blocks}></Blocks>
                <div style={{marginBottom:"20px", clear:'both'}}></div>
                { blocks.length != 0 && 
                    <div style={styles.content}>
                        <p style={styles.explain_text}>
                            每个方块代表一个区块。上面展示的是这条链最新的9个区块。<br/><br/>
                            区块中值得关注的信息，是下半部分的交易。<br/><br/>
                            点击其中任意一条交易，你会看到 JSON 格式的详细信息。<br/><br/>
                            你可能会发现，一笔真实的交易，跟我们之前在理论课程中学到的结构有所不同，准确地说，是变得更复杂了一些。<br/><br/>
                            但它并没有逃出 <code style={styles.single_line_code}>input {'=>'} output</code> 这个本质。<br/><br/>
                            如果你暂时看不懂交易结构里所有字段的意义，不要紧，我们将留给后续逐一攻破。
                        </p>
                        <hr/>
                    </div>
                }
            </div>
        </div>
    )
}