import LinkeAnimated from "./Fcell";
import "./style.css";
import commonStyle from "../common_style";

export default function fcell_test(props) {
  const { t } = props;
  return (
    <div className="floating-cell-root">
      <LinkeAnimated></LinkeAnimated>
      <div style={{ ...commonStyle.explain_text, ...{ textAlign: "center" } }}>
        {t("tutorial.widget.cellConcept.p1")}
        <br />
        <br />
        {t("tutorial.widget.cellConcept.p2")}
      </div>
    </div>
  );
}
