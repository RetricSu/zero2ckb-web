import React from "react";
import GitHubButton from "react-github-btn";

const styles = {
  root: {
    width: "90%",
    padding: "5px",
    marginTop: "20px",
    backgroundColor: "dimgrey",
    color: "white",
  },
  btn: {
    display: "inline-block",
    verticalAlign: "middle",
    margin: "10px 5px",
  },
};
export const FeedBack = () => {
  return (
    <div style={styles.root}>
      <label style={styles.btn}>
        <GitHubButton
          href="https://github.com/retricsu/zero2ckb-web"
          data-size="large"
          data-show-count="true"
          aria-label="Star retricsu/zero2ckb-web on GitHub"
        >
          Star
        </GitHubButton>
      </label>
      <label style={styles.btn}>
        <GitHubButton
          href="https://github.com/retricsu/zero2ckb-web/issues"
          data-size="large"
          data-show-count="true"
          aria-label="Issue retricsu/zero2ckb-web on GitHub"
        >
          Issue
        </GitHubButton>
      </label>
      <div>Help us BUIDL zero2ckb, together!</div>
      <br />
      <p style={{ color: "antiquewhite" }}>
        Join{" "}
        <a target="_blank" href="https://discord.gg/4PfPBzRZcp">
          The Zero2ckb DAO
        </a>{" "}
      </p>
    </div>
  );
};
