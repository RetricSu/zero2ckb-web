import React, { useEffect } from "react";
import "./table_of_contents.css";
import { I18nComponentsProps } from "../../types/i18n";
import I18nSwitcher from "./i18nSwitcher";

const styles = {
  ul: {
    paddingInlineStart: "20px",
  },
};

export interface TableOfContentsProps extends I18nComponentsProps {
  i18n: any;
}

export default function TableOfContents(props: TableOfContentsProps) {
  const { t, i18n } = props;

  const observe = () => {
    window.addEventListener("DOMContentLoaded", () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          if (entry.intersectionRatio > 0) {
            document
              .querySelector(`nav li a[href="#${id}"]`)
              ?.parentElement?.classList.add("active");
          } else {
            document
              .querySelector(`nav li a[href="#${id}"]`)
              ?.parentElement?.classList.remove("active");
          }
        });
      });

      // Track all sections that have an `id` applied
      document.querySelectorAll("[id]").forEach((section) => {
        observer.observe(section);
      });
    });
  };

  useEffect(() => {
    observe();
  }, []);

  return (
    <div className="main-nav-container">
      <I18nSwitcher i18n={i18n} />
      <nav className="section-nav">
        <ol>
          <li>
            <a href="#before-we-get-started">Before We Get Started</a>
          </li>
          <li>
            <a href="#preknowledge">
              {t(
                "tutorial.common.tableOfContents.theoreticalKnowledgeMinimized.title"
              )}
            </a>
            <ul style={styles.ul}>
              <li>
                <a href="#ckb-concept">
                  {t(
                    "tutorial.common.tableOfContents.theoreticalKnowledgeMinimized.unravelCKB"
                  )}
                </a>
              </li>
              <li>
                <a href="#how-to-own-a-cell">
                  {t(
                    "tutorial.common.tableOfContents.theoreticalKnowledgeMinimized.howToOwnACell"
                  )}
                </a>
              </li>
              <li>
                <a href="#how-to-know-cell-is-yours">
                  {t(
                    "tutorial.common.tableOfContents.theoreticalKnowledgeMinimized.howToTellThatYouOwnACell"
                  )}
                </a>
              </li>
              <li>
                <a href="#break1">
                  {t(
                    "tutorial.common.tableOfContents.theoreticalKnowledgeMinimized.takeABreak"
                  )}
                </a>
              </li>
              <li>
                <a href="#where-is-the-real-code">
                  {t(
                    "tutorial.common.tableOfContents.theoreticalKnowledgeMinimized.whereToFindTheHiddenCode"
                  )}
                </a>
              </li>
              <li>
                <a href="#what-if-the-code-is-lost">
                  {t(
                    "tutorial.common.tableOfContents.theoreticalKnowledgeMinimized.whatIfTheCodeIsLost"
                  )}
                </a>
              </li>
              <li>
                <a href="#what-is-tx">
                  {t(
                    "tutorial.common.tableOfContents.theoreticalKnowledgeMinimized.whatIsATransaction"
                  )}
                </a>
              </li>
              <li>
                <a href="#the-function-of-type-lock">
                  {t(
                    "tutorial.common.tableOfContents.theoreticalKnowledgeMinimized.roleOfTheTypeLock"
                  )}
                </a>
              </li>
              <li>
                <a href="#break2">
                  {t(
                    "tutorial.common.tableOfContents.theoreticalKnowledgeMinimized.takeABreak"
                  )}
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#hands-on">
              {t("tutorial.common.tableOfContents.getYourHandsDirty.title")}
            </a>
            <ul style={styles.ul}>
              <li>
                <a href="#watch-a-chain">
                  {t(
                    "tutorial.common.tableOfContents.getYourHandsDirty.studyAChain"
                  )}
                </a>
              </li>
              <li>
                <a href="#how-to-send-a-tx">
                  {t(
                    "tutorial.common.tableOfContents.getYourHandsDirty.sendATransaction.title"
                  )}
                </a>
                <ul style={styles.ul}>
                  <li>
                    <a href="#tx-input">
                      {t(
                        "tutorial.common.tableOfContents.getYourHandsDirty.sendATransaction.transactionInput"
                      )}
                    </a>
                  </li>
                  <li>
                    <a href="#tx-output">
                      {t(
                        "tutorial.common.tableOfContents.getYourHandsDirty.sendATransaction.transactionOutput"
                      )}
                    </a>
                  </li>
                  <li>
                    <a href="#sign-a-tx">
                      {t(
                        "tutorial.common.tableOfContents.getYourHandsDirty.sendATransaction.signTheTransaction"
                      )}
                    </a>
                  </li>
                  <li>
                    <a href="#construct-a-tx">
                      {t(
                        "tutorial.common.tableOfContents.getYourHandsDirty.sendATransaction.buildATransaction.title"
                      )}
                    </a>
                  </li>
                  <ul style={styles.ul}>
                    <li>
                      <a href="#fill-the-tx-form">
                        {t(
                          "tutorial.common.tableOfContents.getYourHandsDirty.sendATransaction.buildATransaction.fillInTheTransaction"
                        )}
                      </a>
                    </li>
                    <li>
                      <a href="#generate-tx-hash">
                        {t(
                          "tutorial.common.tableOfContents.getYourHandsDirty.sendATransaction.buildATransaction.generateHash"
                        )}
                      </a>
                    </li>
                    <li>
                      <a href="#generate-message">
                        {t(
                          "tutorial.common.tableOfContents.getYourHandsDirty.sendATransaction.buildATransaction.generateMessage"
                        )}
                      </a>
                    </li>
                    <li>
                      <a href="#start-signing">
                        {t(
                          "tutorial.common.tableOfContents.getYourHandsDirty.sendATransaction.buildATransaction.completeTheSignature"
                        )}
                      </a>
                    </li>
                    <li>
                      <a href="#put-sign-back">
                        {t(
                          "tutorial.common.tableOfContents.getYourHandsDirty.sendATransaction.buildATransaction.putTheSignatureBackToTransaction"
                        )}
                      </a>
                    </li>
                    <li>
                      <a href="#send-tx">
                        {t(
                          "tutorial.common.tableOfContents.getYourHandsDirty.sendATransaction.buildATransaction.sendTheTransaction"
                        )}
                      </a>
                    </li>
                  </ul>
                </ul>
              </li>
              <li>
                <a href="#how-to-send-a-mutisig-tx">
                  {t(
                    "tutorial.common.tableOfContents.getYourHandsDirty.sendAMultiSigTransaction.title"
                  )}
                </a>
              </li>
              <li>
                <a href="#how-to-deploy-contract">
                  {t(
                    "tutorial.common.tableOfContents.getYourHandsDirty.deployASmartContract.title"
                  )}
                </a>
              </li>
              <li>
                <a href="#how-to-deploy-upgradable-contract">
                  {t(
                    "tutorial.common.tableOfContents.getYourHandsDirty.deployAUpgradableSmartContract.title"
                  )}
                </a>
              </li>
            </ul>
          </li>
        </ol>
      </nav>
    </div>
  );
}
