import React, { useEffect, useState } from "react";
import styles from "../../widget/common_style";
import CodePiece from "../../widget/code";
import CellConcept from "../../widget/floating_cell/cell_concept";
import CapacityOfCell from "../../tutorial/sections/common/CapacityOfCell";
import { Cell, ChainConfig } from "../../../types/blockchain";
import Api from "../../../api/blockchain";
import cell_as_box_concept from "../../../resource/open-box.png";
import lock_concept from "../../../resource/lock-box.png";
import { I18nComponentsProps } from "../../../types/i18n";

/***
 * todo: add some drawing image to better explained the datatype
 */
export default function Preknowledge(props: I18nComponentsProps) {
  const { t } = props;

  const code = {
    /**
     * be careful with the following white space before each line start
     * which will also display on html. Meaning that it should be place exactly
     * where it should be.
     *
     * todo:
     *  of course this method is ugly. should improve the code wrapper later on.
     */
    cell_structure: `
            Cell: {
                capacity: HexString
                lock: Script
                type: Script
                data: HexString
            } 
                        `,
    outpoint_structure: `
            OutPoint: {
                tx_hash: ${t("tutorial.widget.someCodes.outPoint.txHashText")}
                index: ${t("tutorial.widget.someCodes.outPoint.indexText")}
            }
                            `,
    script_structure: `
            Script: {
                code_hash: HexString
                args: HexString
                hash_type: either 'data' or 'type'
            }
                        `,
    cell_space_rule: `
            ${t(
              "tutorial.widget.someCodes.cellCapacityRule.totalSpaceOccupy"
            )} = capacity 
                          >= ${t(
                            "tutorial.widget.someCodes.cellCapacityRule.4FieldSumCapacity"
                          )}
                        `,
    tx_space_rule: `
            capacity(input cell) > capacity(output cell)
                        `,

    systemlock_deadlock_example: `
            SECP256K1's lock: {
                code_hash: 0x0000000000000000000000000000000000000000000000000000000000000000
                args: 0x
                hash_type..
            }
                        `,
    tx_define: `
            tx: input -> output
                    `,
    input_output_define: `
            input:
                some cell...
            ｜
            ｜
            ｜
            \\/
            output:
                some new cell...
                            `,
  };

  const [code_hash, setCodeHash] = useState("");
  const [hash_type, setHashType] = useState("");

  const simpleCell: Cell = {
    cell_output: {
      capacity: "0x1dcd65000",
      lock: {
        args: "0x36c329ed630d6ce750712a477543672adab57f4c",
        code_hash: code_hash,
        hash_type: hash_type == "type" ? "type" : "data",
      },
    },
    data: "0x",
  };

  async function fetchChainConfig() {
    const api = new Api();
    var config: ChainConfig = await api.getChainConfig();
    await setCodeHash(config.SCRIPTS.SECP256K1_BLAKE160.CODE_HASH);
    await setHashType(config.SCRIPTS.SECP256K1_BLAKE160.HASH_TYPE);
  }

  useEffect(() => {
    fetchChainConfig();
  }, []);

  return (
    <div id="preknowledge">
      <div style={styles.wide_card}>
        <h1 style={styles.wide_card_title}>
          {" "}
          {t("tutorial.common.theoreticalKnowledgeMinimized.title")}{" "}
        </h1>
        <blockquote style={styles.blockquote}>
          {t("tutorial.common.theoreticalKnowledgeMinimized.q1")}
          <br />
          <br />
          {t("tutorial.common.theoreticalKnowledgeMinimized.q2")}
        </blockquote>
      </div>
      <hr />
      <div style={styles.content}>
        <h3 id="ckb-concept" style={styles.main_color}>
          {" "}
          {t("tutorial.common.theoreticalKnowledgeMinimized.unravelCKB.title")}
        </h3>
        <p>
          {" "}
          {t("tutorial.common.theoreticalKnowledgeMinimized.unravelCKB.p1")}
        </p>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.unravelCKB.p2")}
        </p>

        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.unravelCKB.p3")}
        </p>

        <CellConcept t={t}></CellConcept>

        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.unravelCKB.p4")}
        </p>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.unravelCKB.p5")}
        </p>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.unravelCKB.p6")}
        </p>
        <h4 id="how-to-own-a-cell" style={styles.main_color}>
          {" "}
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.howToOwnACell.title"
          )}
        </h4>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.howToOwnACell.p1")}
        </p>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.howToOwnACell.p2")}
        </p>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.howToOwnACell.p3")}
        </p>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.howToOwnACell.p4")}
        </p>
        <div style={styles.describe_img_wrapper}>
          <img
            style={styles.describe_img}
            src={cell_as_box_concept}
            alt="box-image"
          />
          <p style={styles.describe_img_footnote}>by Freepik</p>
        </div>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.howToOwnACell.p6")}
        </p>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.howToOwnACell.p7")}
        </p>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.howToOwnACell.p8")}
        </p>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.howToOwnACell.p9")}
        </p>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.howToOwnACell.p10")}
        </p>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.howToOwnACell.p11")}
        </p>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.howToOwnACell.p12")}
        </p>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.howToOwnACell.p13")}
        </p>
        <h4 style={styles.main_color}>
          {t("tutorial.common.theoreticalKnowledgeMinimized.howToOwnACell.p14")}
        </h4>
        <CodePiece code={code.cell_structure} />
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.howToOwnACell.p15")}
        </p>
        <ul>
          <li>
            {t(
              "tutorial.common.theoreticalKnowledgeMinimized.howToOwnACell.ul1.l1"
            )}
          </li>
          <li>
            {t(
              "tutorial.common.theoreticalKnowledgeMinimized.howToOwnACell.ul1.l2"
            )}
          </li>
          <li>
            {t(
              "tutorial.common.theoreticalKnowledgeMinimized.howToOwnACell.ul1.l3"
            )}
          </li>
          <li>
            {t(
              "tutorial.common.theoreticalKnowledgeMinimized.howToOwnACell.ul1.l4"
            )}
          </li>
        </ul>
        <p style={styles.explain_text}>
          {t("tutorial.common.theoreticalKnowledgeMinimized.howToOwnACell.p16")}
          <a
            target="_blank"
            href="https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0019-data-structures/0019-data-structures.md#Cell"
          >
            Cell data structure
          </a>
        </p>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.howToOwnACell.p17")}
        </p>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.howToOwnACell.p18")}
        </p>
        <CodePiece code={code.cell_space_rule} />
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.howToOwnACell.p19")}
        </p>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.howToOwnACell.p20")}
        </p>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.howToOwnACell.p21")}
        </p>

        {code_hash && hash_type && <CapacityOfCell t={t} cell={simpleCell} />}

        <h4 id="how-to-know-cell-is-yours" style={styles.main_color}>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.howToKnowCellIsYours.title"
          )}
        </h4>
        <p>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.howToKnowCellIsYours.p1"
          )}
        </p>
        <p>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.howToKnowCellIsYours.p2"
          )}
        </p>

        <p>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.howToKnowCellIsYours.p3"
          )}
        </p>

        <div style={styles.describe_img_wrapper}>
          <img style={styles.describe_img} src={lock_concept} alt="box-image" />
          <p style={styles.describe_img_footnote}>by Pixel perfect</p>
        </div>

        <p>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.howToKnowCellIsYours.p4"
          )}
        </p>
        <p>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.howToKnowCellIsYours.p5"
          )}
        </p>
        <p>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.howToKnowCellIsYours.p6"
          )}
        </p>
        <CodePiece code={code.script_structure} />
        <p>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.howToKnowCellIsYours.p7"
          )}
        </p>
        <ul>
          <li>
            <strong style={styles.main_color}>code_hash:</strong>{" "}
            {t(
              "tutorial.common.theoreticalKnowledgeMinimized.howToKnowCellIsYours.ul1.l1"
            )}
          </li>
          <li>
            <strong style={styles.main_color}>args: </strong>{" "}
            {t(
              "tutorial.common.theoreticalKnowledgeMinimized.howToKnowCellIsYours.ul1.l2"
            )}
          </li>
        </ul>
        <p style={styles.explain_text}>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.howToKnowCellIsYours.p8"
          )}
          <a
            target="_blank"
            href="https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0019-data-structures/0019-data-structures.md#Script"
          >
            Script data structure
          </a>
        </p>
        <p>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.howToKnowCellIsYours.p9"
          )}
        </p>
        <p>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.howToKnowCellIsYours.p10"
          )}
        </p>
        <p>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.howToKnowCellIsYours.p11"
          )}
        </p>
        <p>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.howToKnowCellIsYours.p12"
          )}
        </p>

        <h3 id="break1" style={styles.main_color}>
          {t("tutorial.context.takeABreak")}
        </h3>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.takeABreak2.p1")}
        </p>
        <ul>
          <li>
            {t(
              "tutorial.common.theoreticalKnowledgeMinimized.takeBreak1.ul1.l1"
            )}
          </li>
          <li>
            {t(
              "tutorial.common.theoreticalKnowledgeMinimized.takeBreak1.ul1.l2"
            )}
          </li>
          <li>
            {t(
              "tutorial.common.theoreticalKnowledgeMinimized.takeBreak1.ul1.l3"
            )}
          </li>
          <li>
            {t(
              "tutorial.common.theoreticalKnowledgeMinimized.takeBreak1.ul1.l4"
            )}
          </li>
          <li>
            {t(
              "tutorial.common.theoreticalKnowledgeMinimized.takeBreak1.ul1.l5"
            )}
          </li>
        </ul>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.takeBreak1.p2")}
        </p>
      </div>
      <div style={styles.content}>
        <h3 id="where-is-the-real-code" style={styles.main_color}>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.whereIsTheActualCode.title"
          )}
        </h3>
        <p>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.whereIsTheActualCode.p1"
          )}
        </p>
        <p>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.whereIsTheActualCode.p2"
          )}
        </p>
        <CodePiece code={code.script_structure}></CodePiece>
        <p>
          {" "}
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.whereIsTheActualCode.p3"
          )}
        </p>
        <p>
          {" "}
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.whereIsTheActualCode.p4"
          )}
        </p>
        <p>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.whereIsTheActualCode.p5"
          )}
        </p>
        <p>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.whereIsTheActualCode.p6"
          )}
        </p>
        <p>
          {" "}
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.whereIsTheActualCode.p7"
          )}
        </p>
        <p>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.whereIsTheActualCode.p8"
          )}
        </p>
        <p>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.whereIsTheActualCode.p9"
          )}
        </p>
        <p>
          {" "}
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.whereIsTheActualCode.p10"
          )}
        </p>
        <p>
          {" "}
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.whereIsTheActualCode.p11"
          )}
        </p>
        <p>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.whereIsTheActualCode.p12"
          )}
        </p>

        <h4 id="what-if-the-code-is-lost" style={styles.main_color}>
          {" "}
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.whatIfCodeIsLost.title"
          )}
        </h4>
        <p>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.whatIfCodeIsLost.p1"
          )}
        </p>
        <p>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.whatIfCodeIsLost.p2"
          )}
        </p>
        <CodePiece code={code.systemlock_deadlock_example} />
        <p>
          {" "}
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.whatIfCodeIsLost.p3"
          )}
        </p>
        <p>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.whatIfCodeIsLost.p4"
          )}
        </p>
        <p>
          {" "}
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.whatIfCodeIsLost.p5"
          )}
        </p>
        <p>
          {" "}
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.whatIfCodeIsLost.p6"
          )}
        </p>
        <p>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.whatIfCodeIsLost.p7"
          )}
        </p>
        <h4 id="what-is-tx" style={styles.main_color}>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.whatIfCodeIsLost.p8"
          )}
        </h4>
        <p>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.whatIfCodeIsLost.p9"
          )}
        </p>
        <CodePiece code={code.tx_define} />
        <p>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.whatIfCodeIsLost.p10"
          )}
        </p>
        <CodePiece code={code.input_output_define} />
        <p>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.whatIfCodeIsLost.p11"
          )}
        </p>
        <p>
          {" "}
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.whatIfCodeIsLost.p12"
          )}
        </p>
        <CodePiece code={code.tx_space_rule} />
        <p>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.whatIfCodeIsLost.p13"
          )}
        </p>
        <p>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.whatIfCodeIsLost.p14"
          )}
        </p>
        <p>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.whatIfCodeIsLost.p15"
          )}
        </p>
        <CodePiece code={code.outpoint_structure} />
        <h4 id="the-function-of-type-lock" style={styles.main_color}>
          {t(
            "tutorial.common.theoreticalKnowledgeMinimized.roleOfTypeLock.title"
          )}
        </h4>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.roleOfTypeLock.p1")}
        </p>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.roleOfTypeLock.p2")}
        </p>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.roleOfTypeLock.p3")}
        </p>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.roleOfTypeLock.p4")}
        </p>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.roleOfTypeLock.p5")}
        </p>
        <ul>
          <li>
            {t(
              "tutorial.common.theoreticalKnowledgeMinimized.roleOfTypeLock.ul1.l1"
            )}
          </li>
          <li>
            {t(
              "tutorial.common.theoreticalKnowledgeMinimized.roleOfTypeLock.ul1.l2"
            )}
          </li>
        </ul>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.roleOfTypeLock.p6")}
        </p>
      </div>
      <div id="break2" style={styles.content}>
        <h3 style={styles.main_color}>{t("tutorial.context.takeABreak")}</h3>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.takeABreak2.p1")}
        </p>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.takeABreak2.p2")}
        </p>
        <ul>
          <li>
            {t(
              "tutorial.common.theoreticalKnowledgeMinimized.takeABreak2.ul1.l1"
            )}
          </li>
          <li>
            {t(
              "tutorial.common.theoreticalKnowledgeMinimized.takeABreak2.ul1.l2"
            )}
          </li>
          <li>
            {t(
              "tutorial.common.theoreticalKnowledgeMinimized.takeABreak2.ul1.l3"
            )}
          </li>
          <li>
            {t(
              "tutorial.common.theoreticalKnowledgeMinimized.takeABreak2.ul1.l4"
            )}
          </li>
          <li>
            {t(
              "tutorial.common.theoreticalKnowledgeMinimized.takeABreak2.ul1.l5"
            )}
          </li>
          <li>
            {t(
              "tutorial.common.theoreticalKnowledgeMinimized.takeABreak2.ul1.l6"
            )}
          </li>
          <li>
            {t(
              "tutorial.common.theoreticalKnowledgeMinimized.takeABreak2.ul1.l7"
            )}
          </li>
          <li>
            {t(
              "tutorial.common.theoreticalKnowledgeMinimized.takeABreak2.ul1.l8"
            )}
          </li>
          <li>
            {t(
              "tutorial.common.theoreticalKnowledgeMinimized.takeABreak2.ul1.l9"
            )}
          </li>
          <li>
            {t(
              "tutorial.common.theoreticalKnowledgeMinimized.takeABreak2.ul1.l10"
            )}
          </li>
          <li>
            {t(
              "tutorial.common.theoreticalKnowledgeMinimized.takeABreak2.ul1.l11"
            )}
          </li>
          <li>
            {t(
              "tutorial.common.theoreticalKnowledgeMinimized.takeABreak2.ul1.l12"
            )}
          </li>
          <li>
            {t(
              "tutorial.common.theoreticalKnowledgeMinimized.takeABreak2.ul1.l13"
            )}
          </li>
          <li>
            {t(
              "tutorial.common.theoreticalKnowledgeMinimized.takeABreak2.ul1.l4"
            )}
          </li>
          <li>
            {t(
              "tutorial.common.theoreticalKnowledgeMinimized.takeABreak2.ul1.l15"
            )}
          </li>
        </ul>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.takeABreak2.p3")}
        </p>
        <p>
          {t("tutorial.common.theoreticalKnowledgeMinimized.takeABreak2.p4")}
        </p>
      </div>
    </div>
  );
}
