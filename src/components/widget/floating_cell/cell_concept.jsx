import LinkeAnimated from "./Fcell";
import "./style.css";
import commonStyle from '../common_style';

export default function fcell_test() {
  return (
    <div className="floating-cell-root">
      <LinkeAnimated></LinkeAnimated>
      <div style={{...commonStyle.explain_text, ...{textAlign:'center'}}}>
        在 CKB 的链上太空，漂浮着无数的 Cell。<br/><br/>
        它们存储数据，共同构成了某一时刻的全局状态。
      </div>
    </div>
  );
}
