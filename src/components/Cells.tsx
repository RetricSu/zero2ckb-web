import React, { useState, useEffect } from "react";
import Api from "../api/blockchain";
import type {
    QueryOption,
    Cell
} from '../types/blockchain';
import CodePiece from './widget/code';

export type Props = {
    query: QueryOption
    length?: number
};

const styles = {
  main: {
    textAlign: "left" as const,
  },
  wallet_panel: {
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

  useEffect(() => {
    queryCells();
  }, []);

  async function queryCells() {
    const api = new Api();
    const length = props.length || 10;
    var myCells = await api.getLiveCells(props.query);
    myCells = myCells.slice(0, length);
    setCells(
        myCells.map((cell: Cell, index: number) => {
        return (
          <li key={index} style={styles.wallet_panel}>
            <p>cell {index + 1} : </p>
            <CodePiece code={ JSON.stringify(cell.cell_output, null, 2) } />
          </li>
        );
      })
    );
  }

  return (
    <div style={styles.main}>
      {cells}
      <p style={{clear: "both"}} />
    </div>
  );
}
