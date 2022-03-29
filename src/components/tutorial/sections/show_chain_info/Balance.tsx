import React, { useState, useEffect, CSSProperties } from "react";
import Api from "../../../../api/blockchain";
import { HexString } from "../../../../types/blockchain";
import FreshButton from "../../../widget/fresh_button";
import commonStyles from "../../../widget/common_style";

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

export type BalanceProps = {
  lock_args: HexString;
  render_dep?: any;
  text?: {
    title?: string;
    btn_text?: string;
  };
  custom_style?: {
    btn_style?: CSSProperties;
    layout_style?: CSSProperties;
  };
};

export default function Balance(props: BalanceProps) {
  const [balance, setBalance] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  async function fetchBalance() {
    setIsLoading(true);
    const api = new Api();
    var bal = await api.getBalance(props.lock_args);
    setBalance(bal);
    setIsLoading(false);
  }

  useEffect(() => {
    if (props.render_dep) fetchBalance();
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
      <FreshButton
        custom_style={btn_style !== undefined ? btn_style : {}}
        isLoading={isLoading}
        onClick={fetchBalance}
        text={btn_text || ""}
      ></FreshButton>
      <h4>
        {title}：{balance} CKB{" "}
      </h4>
    </div>
  );
}
