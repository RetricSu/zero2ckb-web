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
                        <p>
                            上面每个正方形代表这条链中的一个最新的区块，区块中值得关注的信息是下半部分的交易。<br/><br/>
                            点击其中任意一条交易，你会看到这条交易的详细内容，以Json的形式。<br/><br/>
                            你可能会发现，一笔真实的交易，跟我们之前在理论课程中学到的结构有所不同，准确地说是变得更复杂了一些。<br/><br/>
                            但它并没有逃出 input =》 output 这个本质。<br/><br/>
                            如果你暂时不知道交易结构里每个字段的意义，不要紧，我们将会在后续慢慢掌握。
                        </p>
                        <hr/>
                    </div>
                }
            </div>
        </div>
    )
}