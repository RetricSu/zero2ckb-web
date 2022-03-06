import React, { useState, useRef, useEffect } from "react";
import Cells from "../common/Cells";
import WalletTxs from "./WalletTransaction";
import Balance from "./Balance";
import type { Wallet } from "../../../../types/blockchain";
import Select, { ActionMeta, OptionTypeBase, ValueType } from "react-select";
import { I18nComponentsProps } from "../../../../types/i18n";

export interface WalletCellsProps extends I18nComponentsProps {
  wallets: Wallet[];
}

export type SelectWallet = {
  value: string;
  label: string;
};

const styles = {
  selection_area: {
    color: "black",
  },
  hidden_btn: {
    width: "100%",
    border: "0",
    backgroundColor: "rgb(0,0,0, 0)",
    height: "0",
    cursor: "auto",
  },
};

/**
 * todo: add balance here.
 */
export default function WalletCells(props: WalletCellsProps) {
  const { t } = props;
  const [wallets, setWallets] = useState<Wallet[]>([]);

  useEffect(() => {
    setWallets(props.wallets);
  }, [props.wallets]);

  const [selectedWallet, setSelectedWallet] = useState<string>();
  const options = wallets.map((w, index) => {
    return {
      value: w.lock_arg,
      label:
        t("tutorial.widget.walletCells.selectOptionLabel") +
        (index + 1) +
        ": " +
        w.lock_arg,
    };
  });

  const handlerSelectWallet = (
    value: ValueType<
      {
        value: string;
        label: string;
      },
      false
    >,
    actionMeta: ActionMeta<{
      value: string;
      label: string;
    }>
  ) => {
    setSelectedWallet(value?.value);
  };

  return (
    <div>
      <div style={styles.selection_area}>
        <Select
          placeholder={t("tutorial.widget.walletCells.selectPlaceHolder")}
          options={options}
          onChange={handlerSelectWallet}
        />
      </div>
      <br />
      <Cells
        t={t}
        query={{
          lock: {
            code_hash:
              "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
            args: selectedWallet || "",
            hash_type: "type",
          },
        }}
        length={12}
        render_dep={selectedWallet}
        text={{
          title: t("tutorial.widget.walletCells.selectCellsResultTitle"),
          btn_text: "",
        }}
        custom_style={{ btn_style: styles.hidden_btn }}
      ></Cells>

      <div>
        <WalletTxs
          query={{
            lock: {
              code_hash:
                "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
              args: selectedWallet || "",
              hash_type: "type",
            },
          }}
          render_dep={selectedWallet}
          text={{
            title: t("tutorial.widget.walletCells.selectTxsResultTitle"),
            btn_text: "",
          }}
          custom_style={{ btn_style: styles.hidden_btn }}
        ></WalletTxs>
      </div>
    </div>
  );
}
