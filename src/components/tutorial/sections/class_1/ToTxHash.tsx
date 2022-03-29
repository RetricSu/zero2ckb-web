import React, { useState } from "react";
import Api from "../../../../api/blockchain";
import { RawTransaction } from "../../../../types/blockchain";
import FreshButton from "../../../widget/fresh_button";
import { notify } from "../../../widget/notify";
import CodePiece from "../../../widget/code";
import { I18nComponentsProps } from "../../../../types/i18n";

const styles = {
  root: {
    width: "100%",
    padding: "10px 0px",
  },
  result: {
    padding: "10px",
    border: "1px solid gray",
    marginTop: "5px",
    overflowWrap: "break-word" as const,
  },
};

export interface Props extends I18nComponentsProps {
  raw_tx: RawTransaction | undefined;
}

export default function ToTxHash(props: Props) {
  const { t } = props;
  const [hash, setHash] = useState("");
  const [serializeTx, setSerializeTx] = useState("");

  const generateSerializeTx = async () => {
    const api = new Api();
    if (props.raw_tx) {
      try {
        const res = await api.generateSerializeTx(props.raw_tx);
        console.log(res);
        setSerializeTx(res);
      } catch (error: any) {
        notify(error.message);
      }
    } else {
      notify(t("tutorial.widget.toTxHash.txUndefinedAlertMsg"));
    }
  };

  const generateTxHash = async () => {
    await generateSerializeTx();

    const api = new Api();
    if (props.raw_tx) {
      try {
        const res = await api.generateTxHash(props.raw_tx);
        console.log(res);
        setHash(res);
      } catch (error: any) {
        notify(error.message);
      }
    } else {
      notify(t("tutorial.widget.toTxHash.txUndefinedAlertMsg"));
    }
  };

  return (
    <div style={styles.root}>
      <div style={styles.result}>
        {t("tutorial.widget.toTxHash.serializedTxBeforeHash")}
        <CodePiece code={serializeTx || ""} custom_style={{ border: "0" }} />
      </div>
      <FreshButton
        text={t("tutorial.widget.toTxHash.btnText")}
        onClick={generateTxHash}
        custom_style={{ width: "100%", fontSize: "16px" }}
      />
      <div style={styles.result}>
        <p>tx_hash: {hash}</p>
      </div>
    </div>
  );
}
