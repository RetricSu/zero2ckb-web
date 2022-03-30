import React, { useState, useRef } from "react";
import FreshButton from "../../../widget/fresh_button";
import Api from "../../../../api/blockchain";
import { notify } from "../../../widget/notify";
import commonStyle from "../../../widget/common_style";
import { I18nComponentsProps } from "../../../../types/i18n";
import { validateParams, validators } from "../../../../utils/validator";

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

export default function Signer(props: I18nComponentsProps) {
  const { t } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [signature, setSignature] = useState("");
  const msg_ref = useRef<HTMLInputElement>(null);
  const key_ref = useRef<HTMLInputElement>(null);

  const sign_message = async () => {
    setIsLoading(true);
    const msg = msg_ref.current?.value || "";
    const key = key_ref.current?.value || "";
    const api = new Api();

    try {
      validateParams(
        [msg, key],
        [validators.ckbToSignMessage, validators.ckbPrivateKey]
      );
      const sig = await api.getSignature(msg, key);
      setSignature(sig);
    } catch (error: any) {
      notify(error.message);
    }

    setIsLoading(false);
  };

  return (
    <div style={styles.root}>
      <span style={styles.input_wrap}>
        <input
          style={styles.input}
          ref={msg_ref}
          placeholder={t("tutorial.widget.toSignTx.inputPlaceHolderMsg")}
          type="text"
        />
      </span>
      <span style={styles.input_wrap}>
        <input
          style={styles.input}
          ref={key_ref}
          placeholder={t("tutorial.widget.toSignTx.inputPlaceHolderPrivkey")}
          type="text"
        />
      </span>
      <FreshButton
        isLoading={isLoading}
        onClick={sign_message}
        text={t("tutorial.widget.toSignTx.btnText")}
        custom_style={{ width: "100%", fontSize: "16px" }}
      ></FreshButton>
      <div style={styles.result}>
        <p>{signature} </p>
      </div>
    </div>
  );
}
