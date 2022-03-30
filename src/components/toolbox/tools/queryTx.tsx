import { Divider } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { QueryOption } from "../../../types/blockchain";
import { I18nComponentsProps } from "../../../types/i18n";
import { validateParams, validators } from "../../../utils/validator";
import { errNotifyCallBack } from "../../tutorial/sections/common/callBacks";
import Txs from "../../tutorial/sections/show_chain_info/WalletTransaction";
import commonStyle from "../../widget/common_style";

const styles = {
  ...commonStyle,
  ...{
    search_bar: {
      width: "80%",
      padding: "5px",
      margin: "0 auto",
    },
    input: {
      fontSize: "18px",
      outline: "none",
      width: "100%",
    },
  },
};

export interface QueryTxProps extends I18nComponentsProps {
  code_hash?: string;
  hash_type?: "type" | "data";
}

export default function QueryTx(props: QueryTxProps) {
  const { t, code_hash, hash_type } = props;

  const ref = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState<QueryOption>();

  const startQuery = () => {
    const args = ref.current?.value;
    validateParams([args], [validators.hexString], errNotifyCallBack);
    setQuery({
      lock: {
        code_hash:
          code_hash ||
          "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
        args: args!,
        hash_type: hash_type || "type",
      },
    });
  };

  return (
    <div>
      <div>
        <div className="form" style={styles.search_bar}>
          <input
            style={styles.input}
            ref={ref}
            type="text"
            placeholder={t("tutorial.widget.toolBox.queryTx.inputPlaceHolder")}
          />
          <button onClick={startQuery}> 🔍 </button>
        </div>
      </div>
      <hr />
      <div>
        {query && (
          <Txs
            query={query}
            render_dep={query}
            text={{
              title: t("tutorial.widget.toolBox.queryTx.searchResultTile"),
              btn_text: t("tutorial.widget.toolBox.queryTx.retryBtnText"),
            }}
            custom_style={{ layout_style: { border: "0" } }}
          />
        )}
      </div>
    </div>
  );
}
