import React, { useState } from "react";
import Wallets from "./common/Wallets";
import ChainConfig from "./show_chain_info/ChainConfig";
import WalletCells from "./show_chain_info/WalletCells";
import NewBlocks from "./show_chain_info/new_blocks";
import styles from "../../widget/common_style";
import type { Wallet } from "../../../types/blockchain";
import { I18nComponentsProps } from "../../../types/i18n";

export default function (props: I18nComponentsProps) {
  const { t } = props;

  const [wallets, setWallets] = useState<Wallet[]>([]);

  return (
    <div>
      <hr />
      <div style={styles.wide_card} id="hands-on">
        <h1 style={styles.wide_card_title}>
          {t("tutorial.common.getYourHandDirty.title")}
        </h1>
        <blockquote style={styles.blockquote}>
          {t("tutorial.common.getYourHandDirty.p1")}
        </blockquote>
      </div>
      <hr />

      <div style={styles.content}>
        <p>{t("tutorial.common.getYourHandDirty.studyAChain.p1")}</p>
        <p>{t("tutorial.common.getYourHandDirty.studyAChain.p2")}</p>
      </div>

      <div id="watch-a-chain">
        <NewBlocks t={t} />

        <div style={styles.content}>
          <p> {t("tutorial.common.getYourHandDirty.studyAChain.p3")}</p>
          <p> {t("tutorial.common.getYourHandDirty.studyAChain.p4")}</p>
        </div>

        <Wallets t={t} onFetchWallets={setWallets}></Wallets>

        <div style={styles.content}>
          <div style={styles.explain_text}>
            <p>{t("tutorial.common.getYourHandDirty.studyAChain.p5")}</p>
            <ul>
              <li>
                {t("tutorial.common.getYourHandDirty.studyAChain.ul1.l1")}
              </li>
              <li>
                {t("tutorial.common.getYourHandDirty.studyAChain.ul1.l2")}
              </li>
              <li>
                {t("tutorial.common.getYourHandDirty.studyAChain.ul1.l3")}
              </li>
              <li>
                {t("tutorial.common.getYourHandDirty.studyAChain.ul1.l4")}
              </li>
            </ul>
            <p>{t("tutorial.common.getYourHandDirty.studyAChain.p6")}</p>
          </div>
          <hr />
          <p>{t("tutorial.common.getYourHandDirty.studyAChain.p7")}</p>
        </div>

        <div>
          <WalletCells t={t} wallets={wallets}></WalletCells>
        </div>

        <div style={styles.content}>
          <div style={styles.explain_text}>
            <p>{t("tutorial.common.getYourHandDirty.studyAChain.p8")}</p>
            <p>{t("tutorial.common.getYourHandDirty.studyAChain.p9")}</p>
            <p>{t("tutorial.common.getYourHandDirty.studyAChain.p10")}</p>
            <p> {t("tutorial.common.getYourHandDirty.studyAChain.p11")}</p>
            <p>{t("tutorial.common.getYourHandDirty.studyAChain.p12")}</p>
          </div>
        </div>
        <hr />
        <div style={styles.content}>
          <p>{t("tutorial.common.getYourHandDirty.studyAChain.p13")}</p>
          <ChainConfig t={t} />
          <div style={styles.explain_text}>
            <p>
              <code style={styles.single_line_code}>prefix：ckt</code>{" "}
              {t("tutorial.common.getYourHandDirty.studyAChain.p15")}
            </p>
            <p>
              <code style={styles.single_line_code}>scripts</code>{" "}
              {t("tutorial.common.getYourHandDirty.studyAChain.p16")}
            </p>
            <p>{t("tutorial.common.getYourHandDirty.studyAChain.p17")}</p>
            <ul>
              <li>
                {t("tutorial.common.getYourHandDirty.studyAChain.ul2.l1")}
              </li>
              <li>
                {t("tutorial.common.getYourHandDirty.studyAChain.ul2.l2")}
              </li>
              <li>
                {t("tutorial.common.getYourHandDirty.studyAChain.ul2.l3")}
              </li>
            </ul>
          </div>
          <hr />
          <p>{t("tutorial.common.getYourHandDirty.studyAChain.p18")}</p>
          <p>{t("tutorial.common.getYourHandDirty.studyAChain.p19")}</p>
        </div>
      </div>
    </div>
  );
}
