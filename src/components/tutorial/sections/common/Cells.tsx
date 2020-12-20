import React, { CSSProperties, useEffect, useState } from "react";
import Api from "../../../../api/blockchain";
import type {
    QueryOption,
    Cell
} from '../../../../types/blockchain';
import SingleCell from './Cell';
import FreshButton from '../../../widget/fresh_button';


export type Props = {
    query: QueryOption
    length?: number,
    render_dep?: any,
    custom_style?: {
      btn_style?: CSSProperties
      layout_style?: CSSProperties
    },
    text?: {
      title?: string
      btn_text?: string
    }
};

const styles = {
  main: {
    textAlign: "center" as const,
    border: '1px solid white',
    clear: 'both' as const,
  },
  cell_panel: {
    width: "600px",
    border: "1px solid white",
    float: "left" as const,
    marginRight: "20px",
    padding: "10px",
    listStyleType: "none",
    overflow: "hidden",
    fontSize: "10px",
    display: "block",
  },
  
};

export default function Cells(props: Props) {
  const [cells, setCells] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const btn_style = props.custom_style?.btn_style;
  const layout_style = props.custom_style?.layout_style;

  useEffect(() => {
    if(props.render_dep)
      queryCells();
  }, [props.render_dep]);

  async function queryCells() {
    setIsLoading(true);
    console.log(isLoading);
    const api = new Api();
    const length = props.length || 10;
    var myCells = await api.getLiveCells(props.query, length);
    setCells(
        myCells.map((cell: Cell, index: number) => <SingleCell cell={cell} key_id={index} /> )
    );
    setIsLoading(false);
  }

  return (
    <div style={ layout_style != undefined ? {...styles.main, ...layout_style} : styles.main}>
      <h4>{props.text?.title}</h4>
      <FreshButton custom_style={ btn_style != undefined ? btn_style : {}} isLoading={isLoading} onClick={queryCells} text={props.text?.btn_text || ''}></FreshButton>
        <ul>
            {cells}
        </ul>
      <p style={{clear: "both"}} />
    </div>
  );
}
