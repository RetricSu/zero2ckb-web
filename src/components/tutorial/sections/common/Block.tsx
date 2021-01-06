import React, { CSSProperties, useState } from 'react';
import { Container } from '@material-ui/core';
import Utils from '../../../../utils/index';
import common_style from '../../../widget/common_style';
import type {
    Block,
    Transaction
} from '../../../../types/blockchain';
import ShowTxInfo from './Tx';

export type BlockProps = {
    block: Block
    custom_style?: CSSProperties
} 

const styles = {
    ...common_style, ...{
        box: {
            maxWidth: '200px',
            maxHeight: '200px',
            border: '1px solid white',
            margin: '0.5em',
            float: 'left' as const,
            display: 'box',
            textAlign: 'left' as const,
            overflowY: 'scroll' as const
        },
        hover_box: {
            maxWidth: '200px',
            maxHeight: '200px',
            border: '1px solid white',
            margin: '0.5em',
            float: 'left' as const,
            display: 'box',
            textAlign: 'left' as const,
            overflowY: 'scroll' as const,
            background: 'gray',
        },
        box_header: {
            width: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis' as const,
            whiteSpace: 'nowrap' as const
        },
        box_header_title: {
            fontSize: '15px',
            fontWeight: 'bolder' as const,
            color: common_style.main_color.color.toString(),
            marginTop: '10px',
            marginBottom: '10px'
        },
        box_header_sub_title: {
            fontSize: '12px',
            margin: '0'
        },
        box_content: {
            width: '100%',
            overflow: 'hidden'
        },
        box_content_link: {
            textDecoration: 'underline',
            cursor: 'pointer'
        }
    }
}

export default function BlockBox(props: BlockProps) {

    const [isHover, setIsHover] = useState(false);

    const hovering = () => {
        setIsHover(true);
    };

    const unhover = () => {
        setIsHover(false);
    };

    const { block, custom_style } = props;
    
    function show_tx_list(transactions: Transaction[]) {
        const jsx = transactions.map( (tx: Transaction, index: number) => <ShowTxInfo tx={tx} key_id={index} />);
        return jsx;
    }

    const box_style = isHover ? styles.hover_box : styles.box;

    return(
        <div>
            <Container style={custom_style ? {...box_style, ...custom_style} : box_style} key={block.header.hash} onMouseEnter={hovering} onMouseLeave={unhover}>
                <div style={styles.box_header}>
                    <div style={styles.box_header_title}> 区块：#{ Utils.hex2dec( block.header.number )} </div>
                    <p style={styles.box_header_sub_title}>哈希：{block.header.hash.slice(0,12)}.. </p>
                    <p style={styles.box_header_sub_title}>时间：{Utils.convertTimestamp( BigInt(block.header.timestamp).toString(10) )} </p>
                </div>
                <hr/>
                <p style={styles.box_header_sub_title}>交易：{block.transactions.length} 条</p>
                <div style={styles.box_content}>
                    <ul style={styles.ul}>
                        { show_tx_list(block.transactions) }
                    </ul>
                </div>
            </Container>
        </div>
    )
}   