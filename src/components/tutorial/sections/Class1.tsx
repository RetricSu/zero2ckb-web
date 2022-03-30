import React, { useEffect, useState } from "react";
import styles from "../../widget/common_style";
import Form from "../../widget/form";
import { notify } from "../../widget/notify";
import CodePiece from "../../widget/code";
import ToSignMessage from "./class_1/FetchToSignMessage";
import ToTxHash from "./class_1/ToTxHash";
import Signer from "./class_1/Signer";
import SendTx from "./class_1/SendTx";
import SerializedWitnessArgs from "./class_1/SerializedWitnessArgs";
import TxConstructor from "./common/TxConstructor";
import DragCellToInputJson from "./common/DragCellToInputJson";
import { ValidateTransaction } from "../../../utils/ckb-validator";

import type {
  Transaction,
  RawTransaction,
  Wallet,
  ChainConfig,
  QueryOption,
} from "../../../types/blockchain";
import Cells from "./common/Cells";
import Api from "../../../api/blockchain";
import { I18nComponentsProps } from "../../../types/i18n";

export default function Class1(props: I18nComponentsProps) {
  const { t } = props;
  const default_wallet_number = 0; //number 1 wallet, the miner's wallet
  const [default_lock_query_option, setDefaultLockQueryOption] =
    useState<QueryOption>({});

  const [raw_tx, setRawTx] = useState<RawTransaction>();
  const [complete_tx, setCompleteTx] = useState<Transaction>();
  const raw_tx_template = `{
      version: "0x0",
      cell_deps: [
        {
          out_point: {
            tx_hash: "${t("tutorial.common.formFillHereText")}",
            index: "${t("tutorial.common.formFillHereText")}",
          },
          dep_type: "${t("tutorial.common.formFillHereText")}", 
        },
      ],
      header_deps: [],
      inputs: [
        {
          since: "0x0",
          previous_output: {
            tx_hash: "${t("tutorial.common.formFillHereText")}",
            index: "${t("tutorial.common.formFillHereText")}",
          },
        },
      ],
      outputs: [
        {
          capacity: "${t("tutorial.common.formFillHereText")}",
          lock: {
            code_hash: "${t("tutorial.common.formFillHereText")}",
            hash_type: "${t("tutorial.common.formFillHereText")}",
            args: "${t("tutorial.common.formFillHereText")}",
          },
        },
      ],
      outputs_data: ["0x"],
      witnesses: ["0x"]
}`;

  const onRawTxSubmit = (content: string) => {
    try {
      const raw_tx_content: RawTransaction = JSON.parse(
        JSON.stringify(eval("(" + content + ")"))
      );
      try {
        ValidateTransaction(raw_tx_content);
        setRawTx(raw_tx_content);
        notify(t("tutorial.common.txSaveSuccessAlertMsg"), "success");
      } catch (error: any) {
        notify(error.message);
      }
    } catch (error: any) {
      notify(t("tutorial.common.illegalTokenAlertMsg") + error.message);
    }
  };

  const onCompleteTxSubmit = (content: string) => {
    try {
      const tx_content: Transaction = JSON.parse(
        JSON.stringify(eval("(" + content + ")"))
      );
      try {
        ValidateTransaction(tx_content);
        setCompleteTx(tx_content);
        notify(t("tutorial.common.txSaveSuccessAlertMsg"), "success");
      } catch (error: any) {
        notify(error.message);
      }
    } catch (error: any) {
      notify(t("tutorial.common.illegalTokenAlertMsg") + error.message);
    }
  };

  const fetchChainMinInfo = async () => {
    const api = new Api();
    const myWallets: Wallet[] = await api.getWallets();
    const cc: ChainConfig = await api.getChainConfig();
    setDefaultLockQueryOption({
      lock: {
        code_hash: cc.SCRIPTS.SECP256K1_BLAKE160.CODE_HASH,
        args: myWallets[default_wallet_number].lock_arg,
        hash_type:
          cc.SCRIPTS.SECP256K1_BLAKE160.HASH_TYPE === "type" ? "type" : "data",
      },
    });
  };

  useEffect(() => {
    fetchChainMinInfo();
  }, []);

  return (
    <div id="how-to-send-a-tx">
      <div style={styles.content}>
        <h3 style={styles.main_color}>{t("tutorial.class1.title")}</h3>
        <p>{t("tutorial.class1.p1")}</p>
        <p>{t("tutorial.class1.p2")}</p>
        <blockquote style={styles.blockquote}>
          {t("tutorial.class1.p3")}
        </blockquote>
        <p>{t("tutorial.class1.p4")}</p>
        <p>{t("tutorial.class1.p5")}</p>
        <p>{t("tutorial.class1.p6")}</p>
        <p>{t("tutorial.class1.p7")}</p>
        <div style={styles.explain_text}>
          <p>{t("tutorial.class1.p8")}</p>
          <p>{t("tutorial.class1.p9")}</p>
          <p>{t("tutorial.class1.p10")}</p>
          <p>{t("tutorial.class1.p11")}</p>
          <p>{t("tutorial.class1.p12")}</p>
          <p>{t("tutorial.class1.p13")}</p>
          <p>{t("tutorial.class1.p14")}</p>
        </div>
        <p>{t("tutorial.class1.p15")}</p>
        <p>{t("tutorial.class1.p16")}</p>

        <p>{t("tutorial.class1.p17")}</p>

        <h4 id="tx-input" style={styles.main_color}>
          {t("tutorial.class1.transactionInput.title")}
        </h4>
        <p>{t("tutorial.class1.transactionInput.p1")}</p>

        <Cells
          t={t}
          query={default_lock_query_option}
          render_dep={default_lock_query_option}
          length={4}
          text={{
            title: t("tutorial.common.cellOfWallet1"),
            btn_text: t("tutorial.common.fetchCellOfWallet1"),
          }}
          custom_style={{ layout_style: { border: "1px solid gray" } }}
        ></Cells>

        <DragCellToInputJson />

        <div style={styles.explain_text}>
          <p>{t("tutorial.class1.transactionInput.p2")}</p>

          <p>{t("tutorial.class1.transactionInput.p3")} </p>

          <p>{t("tutorial.class1.transactionInput.p4")}</p>
          <p>{t("tutorial.class1.transactionInput.p5")}</p>
          <p>{t("tutorial.class1.transactionInput.p6")}</p>
          <p>{t("tutorial.class1.transactionInput.p7")}</p>
        </div>

        <h4 id="tx-output" style={styles.main_color}>
          {t("tutorial.class1.transactionOutput.title")}
        </h4>
        <p>{t("tutorial.class1.transactionOutput.p1")}</p>

        <div style={styles.explain_text}>
          <p>{t("tutorial.class1.transactionOutput.p2")}</p>
          <p>{t("tutorial.class1.transactionOutput.p3")}</p>
          <p>{t("tutorial.class1.transactionOutput.p4")}</p>
          <p>{t("tutorial.class1.transactionOutput.p5")}</p>
          <p>{t("tutorial.class1.transactionOutput.p6")}</p>
        </div>

        <Cells
          t={t}
          query={default_lock_query_option}
          render_dep={default_lock_query_option}
          length={4}
          text={{
            title: t("tutorial.common.cellOfWallet1"),
            btn_text: t("tutorial.common.fetchCellOfWallet1"),
          }}
          custom_style={{ layout_style: { border: "1px solid gray" } }}
        ></Cells>

        <TxConstructor t={t} />

        <div style={styles.explain_text}>
          <p>{t("tutorial.class1.transactionOutput.p7")}</p>
          <p>{t("tutorial.class1.transactionOutput.p8")}</p>
          <p> {t("tutorial.class1.transactionOutput.p9")}</p>
        </div>

        <h4 id="sign-a-tx" style={styles.main_color}>
          {t("tutorial.class1.signTheTransaction.title")}
        </h4>
        <p>{t("tutorial.class1.signTheTransaction.p1")}</p>
        <p>{t("tutorial.class1.signTheTransaction.p2")}</p>
        <p>{t("tutorial.class1.signTheTransaction.p3")}</p>
        <br />
        <br />
        <br />
        <hr />
        <div id="construct-a-tx"></div>
        <p>{t("tutorial.class1.buildATransaction.p1")}</p>
        <p>{t("tutorial.class1.buildATransaction.p2")}</p>
        <p>{t("tutorial.class1.buildATransaction.p3")}</p>
        <p>{t("tutorial.class1.buildATransaction.p4")}</p>
        <div id="fill-the-tx-form"></div>
        <Form
          form_template={raw_tx_template}
          onSubmit={onRawTxSubmit}
          btn_text={t("tutorial.common.saveBtnText")}
          title_text={t("tutorial.class1.buildATransaction.formTitle")}
        ></Form>

        <p>{t("tutorial.class1.buildATransaction.p5")}</p>

        <p>{t("tutorial.class1.buildATransaction.p6")}</p>
        <p>{t("tutorial.class1.buildATransaction.p7")}</p>
        <p id="generate-tx-hash">{t("tutorial.class1.generateTxHash.p1")}</p>

        <ToTxHash t={t} raw_tx={raw_tx}></ToTxHash>

        <p>{t("tutorial.class1.generateTxHash.p2")}</p>
        <p> {t("tutorial.class1.generateTxHash.p3")}</p>
        <CodePiece
          code={{
            lock: t("tutorial.common.proofText"),
            input_type: t("tutorial.common.proofText"),
            output_type: t("tutorial.common.proofText"),
          }}
          custom_style={{ padding: "5px" }}
        />
        <p>{t("tutorial.class1.generateTxHash.p4")}</p>
        <p>{t("tutorial.class1.generateTxHash.p5")}</p>
        <p>{t("tutorial.class1.generateTxHash.p6")}</p>
        <p style={styles.explain_text}>
          {t("tutorial.class1.generateTxHash.p7")}
          <a
            href="https://github.com/nervosnetwork/ckb-system-scripts/wiki/How-to-sign-transaction"
            target="_blank"
          >
            How to sign transaction
          </a>
        </p>
        <p id="generate-message">{t("tutorial.class1.generateMessage.p1")}</p>

        <ToSignMessage t={t} raw_tx={raw_tx} />

        <h4 style={styles.main_color}>
          {t("tutorial.class1.completeSining.title")}
        </h4>

        <p id="start-signing">{t("tutorial.class1.completeSining.p1")}</p>

        <Signer t={t} />

        <h4 style={styles.main_color}>
          {t("tutorial.class1.putBackSignature.title")}
        </h4>
        <p>{t("tutorial.class1.putBackSignature.p1")}</p>
        <SerializedWitnessArgs t={t} />

        <p id="put-sign-back">{t("tutorial.class1.putBackSignature.p2")}</p>

        {JSON.stringify(raw_tx) && (
          <Form
            form_template={JSON.stringify(raw_tx, null, 2)}
            onSubmit={onCompleteTxSubmit}
            btn_text={t("tutorial.common.saveBtnText")}
          ></Form>
        )}

        <h4 id="send-tx" style={styles.main_color}>
          {t("tutorial.class1.sendTransaction.p1")}
        </h4>
        <SendTx t={t} tx={complete_tx}></SendTx>
        <p>{t("tutorial.class1.sendTransaction.p2")}</p>
        <p>{t("tutorial.class1.sendTransaction.p3")}</p>
      </div>
    </div>
  );
}
