import React, { useState } from "react";
import FreshButton from "../../../widget/fresh_button";
import { notify } from "../../../widget/notify";
import Api from "../../../../api/blockchain";
import commonStyle from "../../../widget/common_style";
import type { Block, Transaction } from "../../../../types/blockchain";
import BlockBox from "../common/Block";
import Firework from "../../../widget/fireworks/firework";
import PopFirework from "../../../widget/fireworks/animate";
import { I18nComponentsProps } from "../../../../types/i18n";

const styles = {
  ...commonStyle,
  ...{
    root: {
      width: "100%",
      padding: "10px 0px",
      clear: "both" as const,
    },
    result: {
      padding: "10px",
      border: "1px solid gray",
      marginTop: "5px",
      overflowWrap: "break-word" as const,
    },
    block_panel: {
      padding: "10px",
      border: "1px solid gray",
      marginTop: "5px",
      textAlign: "center" as const,
      clear: "both" as const,
    },
  },
};

export interface SendTxProps extends I18nComponentsProps {
  tx: Transaction | undefined;
}

export default function SendTx(props: SendTxProps) {
  const { t, tx } = props;
  const [tx_hash, setTxHash] = useState("");
  const [block, setBlock] = useState<Block>();

  const sendTx = async () => {
    const api = new Api();
    if (tx) {
      const res = await api.sendTx(tx);
      if (res.status == "ok") {
        setTxHash(res.data);
        PopFirework();
      } else {
        notify(res.data);
      }
    } else {
      notify(t("tutorial.widget.sendTx.txUndefinedAlertMsg"));
    }
  };

  const fetchBlock = async () => {
    if (!tx_hash) {
      notify("tx hash is empty.");
      return;
    }

    const api = new Api();
    const res2 = await api.getBlockByTxHash(tx_hash);
    console.log(res2);
    if (res2.status === "ok") {
      setBlock(res2.data);
    } else {
      notify(res2.data);
    }
  };

  return (
    <div style={styles.root}>
      <FreshButton
        text={t("tutorial.widget.sendTx.btnText")}
        onClick={sendTx}
        custom_style={{ width: "100%", fontSize: "16px" }}
      ></FreshButton>
      <div style={styles.result}>
        <p>tx_hash: {tx_hash} </p>
      </div>
      <div style={styles.explain_text}>
        <p>{t("tutorial.widget.sendTx.p1")}</p>
        <p>{t("tutorial.widget.sendTx.p2")}</p>
        <p>{t("tutorial.widget.sendTx.p3")}</p>
      </div>

      <FreshButton
        text={t("tutorial.widget.sendTx.checkBlockBtnText")}
        onClick={fetchBlock}
        custom_style={{ width: "100%", fontSize: "16px" }}
      ></FreshButton>
      <div style={styles.block_panel}>
        <p>
          {block && (
            <BlockBox
              t={t}
              block={block}
              custom_style={{ float: "none", margin: "0 auto" }}
            />
          )}
        </p>
      </div>
      <Firework />
    </div>
  );
}
