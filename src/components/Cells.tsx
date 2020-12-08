import React, { useEffect, useState } from "react";
import Api from "../api/blockchain";
import type {
    QueryOption,
    Cell
} from '../types/blockchain';
import CodePiece from './widget/code';
import FreshButton from './widget/fresh_button';

export type Props = {
    query: QueryOption
    length?: number,
    render_dep?: any
};

const styles = {
  main: {
    textAlign: "left" as const,
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

  useEffect(() => {
    if(props.render_dep)
      queryCells();
  }, [props.render_dep]);

  async function queryCells() {
    setIsLoading(true);
    console.log(isLoading);
    const api = new Api();
    const length = props.length || 10;
    var myCells = await api.getLiveCells(props.query);
    myCells = myCells.slice(0, length);
    setCells(
        myCells.map((cell: Cell, index: number) => {
        return (
          <li key={index} style={styles.cell_panel}>
            <p>cell {index + 1} : </p>
            <CodePiece code={ JSON.stringify(cell, null, 2) } />
          </li>
        );
      })
    );
    setIsLoading(false);
  }

  return (
    <div>
      <p>
          <FreshButton isLoading={isLoading} onClick={queryCells} text='刷新'></FreshButton>
      </p>
      <div style={styles.main}>
        {cells}
      </div>
      <p style={{clear: "both"}} />
    </div>
  );
}
