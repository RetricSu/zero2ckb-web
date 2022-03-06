import React, { useState, useEffect } from "react";
import type { Block } from "../../../../types/blockchain";
import { I18nComponentsProps } from "../../../../types/i18n";
import common_style from "../../../widget/common_style";
import BlockBox from "./Block";

export interface BlocksProps extends I18nComponentsProps {
  blocks: Block[];
}

function Blocks(props: BlocksProps) {
  const { t } = props;
  const [blocks, setBlocks] = useState(props.blocks);

  useEffect(() => {
    setBlocks(props.blocks);
  }, [props.blocks]);

  const blocks_box = blocks.map((block: Block) => (
    <BlockBox t={t} block={block} />
  ));

  return <div style={common_style.clear_path}>{blocks_box}</div>;
}

export default Blocks;
