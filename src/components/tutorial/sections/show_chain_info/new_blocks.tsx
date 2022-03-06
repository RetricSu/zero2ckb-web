import React, { useState } from 'react';
import FreshButton from '../../../widget/fresh_button';
import Blocks from '../common/Blocks';
import Api from '../../../../api/blockchain';
import {notify} from '../../../widget/notify';
import type {
    Block
} from '../../../../types/blockchain';
import common_styles from '../../../widget/common_style';
import { I18nComponentsProps } from '../../../../types/i18n';

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

export default function NewBlocks (props: I18nComponentsProps){
    const {t} = props;
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
                    <FreshButton isLoading={isLoading} text={t("tutorial.widget.newBlocks.fetchBtnText")} onClick={fetchNewBlocks} custom_style={{width: '100%', minHeight: '60px', fontSize: '20px'}} ></FreshButton>
                </div>
                <Blocks t={t} blocks={blocks}></Blocks>
                <div style={{marginBottom:"20px", clear:'both'}}></div>
                { blocks.length != 0 && 
                    <div style={styles.content}>
                        <p style={styles.explain_text}>
                            {t("tutorial.widget.newBlocks.p1")} <br/><br/>
                            {t("tutorial.widget.newBlocks.p2")}<br/><br/>
                            {t("tutorial.widget.newBlocks.p3")}<br/><br/>
                            {t("tutorial.widget.newBlocks.p4")}<br/><br/>
                            {t("tutorial.widget.newBlocks.p5")} <code style={styles.single_line_code}>input {'=>'} output</code><br/><br/>
                            {t("tutorial.widget.newBlocks.p6")}
                        </p>
                        <hr/>
                    </div>
                }
            </div>
        </div>
    )
}
