/**
 * this is a simple hex to decimal reverse converter component
 * to help user figure out the capacity number.
 */

import React, { useState, useRef } from "react";
import FreshButton from "../../widget/fresh_button";
import common_style from "../../widget/common_style";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { notify } from "../../widget/notify";
import { I18nComponentsProps } from "../../../types/i18n";
import { validateParams, validators } from "../../../utils/validator";
import { errNotifyCallBack } from "../../tutorial/sections/common/callBacks";

const styles = {
  caculator_box: {
    border: "1px solid white",
    padding: "20px",
  },
  input: {
    outline: common_style.main_color.color,
    padding: "10px",
    background: "white",
    width: "90%",
    borderRadius: "3px",
    border: "1px solid white",
    fontSize: "16px",
  },
  btn: {
    marginRight: "5px",
  },
  result: {
    border: "1px solid white",
    padding: "10px",
    fontSize: "16px",
    width: "90%",
    height: "100%",
    overflowWrap: "anywhere" as const,
  },
};

export interface Hex2DecProps extends I18nComponentsProps {
  custom_style?: CSSProperties;
}

export default function Hex2Dec(props: Hex2DecProps) {
  const { t, custom_style } = props;

  const ref = useRef<HTMLInputElement>(null);
  const [isReversed, setIsReversed] = useState(false);
  const [result, setResult] = useState("");

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  const hex2dec = () => {
    if (ref.current) {
      const hex_data = ref.current.value;
      try {
        validateParams([hex_data], [validators.hexNumber]);
        setResult("" + BigInt(hex_data).toString(10));
      } catch (error: any) {
        notify(error.message);
      }
    } else {
      notify("something went wrong..");
    }
  };

  const dec2hex = () => {
    if (ref.current) {
      const dec_data = ref.current.value;
      try {
        validateParams([dec_data], [validators.decimalPositiveNumberString]);
        setResult("0x" + BigInt(dec_data).toString(16));
      } catch (error: any) {
        notify(error.message);
      }
    } else {
      notify("something went wrong..");
    }
  };

  return (
    <div
      style={
        custom_style != undefined
          ? { ...styles.caculator_box, ...custom_style }
          : styles.caculator_box
      }
    >
      <p>
        Convert {isReversed ? "Decimal" : "Hex"} to{" "}
        {isReversed ? "Hex" : "Decimal"}{" "}
      </p>
      <input
        ref={ref}
        type="text"
        style={styles.input}
        placeholder={
          isReversed
            ? t("tutorial.widget.toolBox.hexToDecimal.inputDecimalPlaceHolder")
            : t("tutorial.widget.toolBox.hexToDecimal.inputHexPlaceHolder")
        }
      />
      <p>
        <FreshButton
          onClick={isReversed ? dec2hex : hex2dec}
          text={t("tutorial.widget.toolBox.hexToDecimal.convertBtnText")}
        />
        &#160;
        <FreshButton
          onClick={reverse}
          text={t(
            "tutorial.widget.toolBox.hexToDecimal.reverseFunctionBtnText"
          )}
        />
      </p>
      <div style={styles.result}>
        {t("tutorial.widget.toolBox.hexToDecimal.resultText")} {result}
      </div>
    </div>
  );
}
