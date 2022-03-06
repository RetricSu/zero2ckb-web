import React, { useRef, useState } from "react";
import { notify } from "../../../widget/notify";
import Api from "../../../../api/blockchain";
import commonStyle from "../../../widget/common_style";
import FreshButton from "../../../widget/fresh_button";
import { I18nComponentsProps } from "../../../../types/i18n";

const styles = {
  ...commonStyle,
  ...{
    input_wrap: {
      padding: "5px",
      marginBottom: "10px",
      display: "block",
      background: "white",
    },
    input: {
      width: "100%",
      outline: "none",
      lineHeight: "2em",
      fontSize: "16px",
      border: "0",
    },
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
  },
};

export default function SerializedWitnessArgs(props: I18nComponentsProps) {
  const { t } = props;
  const [witness, setWitness] = useState("");
  const lock_ref = useRef<HTMLInputElement>(null);

  const serialized_witness = async () => {
    const witnessArgs = {
      lock: lock_ref.current?.value,
    };
    const api = new Api();
    const res = await api.getSerializedWitness(witnessArgs);
    if (res.status === "ok") {
      setWitness(res.data);
    } else {
      notify(res.data);
    }
  };

  return (
    <div style={styles.root}>
      <span style={styles.input_wrap}>
        <input
          style={styles.input}
          ref={lock_ref}
          placeholder={t(
            "tutorial.widget.serializedWitnessArgs.inputPlaceHolder"
          )}
          type="text"
        />
      </span>
      <FreshButton
        onClick={serialized_witness}
        text={t("tutorial.widget.serializedWitnessArgs.btnText")}
        custom_style={{ width: "100%", fontSize: "16px" }}
      ></FreshButton>
      <div style={styles.result}>
        <p>{witness} </p>
      </div>
    </div>
  );
}
