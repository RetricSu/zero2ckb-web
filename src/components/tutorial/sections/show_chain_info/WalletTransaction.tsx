import React, { useState, useEffect, CSSProperties } from "react";
import Api from "../../../../api/blockchain";
import { QueryOption, Transaction } from "../../../../types/blockchain";
import FreshButton from "../../../widget/fresh_button";
import commonStyles from "../../../widget/common_style";
import Txs from "../common/Txs";
import { notify } from "../../../widget/notify";

const styles = {
  ...commonStyles,
  ...{
    list_panel: {
      textAlign: "center" as const,
      border: "1px solid white",
    },
    tx_panel: {
      width: "600px",
      border: "1px solid white",
      float: "left" as const,
      marginRight: "20px",
      padding: "10px",
      listStyleType: "none",
      overflow: "scroll",
      fontSize: "10px",
      display: "block",
      textAlign: "left" as const,
    },
  },
};

export type Props = {
  query: QueryOption;
  render_dep?: any;
  length?: number;
  text?: {
    title?: string;
    btn_text?: string;
  };
  custom_style?: {
    btn_style?: CSSProperties;
    layout_style?: CSSProperties;
  };
};

export default function WalletTransaction(props: Props) {
  const [txs, setTxs] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchTransactions() {
    setIsLoading(true);
    const api = new Api();
    const length = props.length || 10;
    try {
      const txs = await api.getTransactions(props.query, length);
      setTxs(txs);
      setIsLoading(false);
    } catch (error: any) {
      notify(JSON.stringify(error.message));
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (props.render_dep) fetchTransactions();
  }, [props.render_dep]);

  const btn_style = props.custom_style?.btn_style;
  const layout_style = props.custom_style?.layout_style;
  const title = props.text?.title;
  const btn_text = props.text?.btn_text;

  return (
    <div
      style={
        layout_style !== undefined
          ? { ...styles.list_panel, ...layout_style }
          : styles.list_panel
      }
    >
      <h4>{title}</h4>
      <FreshButton
        custom_style={btn_style !== undefined ? btn_style : {}}
        isLoading={isLoading}
        onClick={fetchTransactions}
        text={btn_text || ""}
      ></FreshButton>
      <Txs txs={txs} />
      <p style={{ clear: "both" }} />
    </div>
  );
}
