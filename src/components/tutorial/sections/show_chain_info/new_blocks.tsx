import React, { useState } from 'react';
import FreshButton from '../../../widget/fresh_button';
import Blocks from '../common/Blocks';
import Api from '../../../../api/blockchain';
import {notify} from '../../../widget/notify';
import type {
    Block
} from '../../../../types/blockchain';
import common_styles from '../../../widget/common_style';

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

    const status_bar = (
        <div style={common_styles.status_bar}>
            <span style={common_styles.status_bar_title}>Blocks Area</span>
            <span style={common_styles.status_bar_btn}>
                <FreshButton isLoading={isLoading} text={'刷新'} onClick={fetchNewBlocks} ></FreshButton>
            </span>
        </div>
    );

    return(
        <div style={common_styles.clear_path}>
            <div style={common_styles.clear_path}>
                {status_bar}
                <Blocks blocks={blocks}></Blocks>
            </div>
        </div>
    )
}