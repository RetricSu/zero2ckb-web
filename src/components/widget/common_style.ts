const styles = {
  page: {
    maxWidth: "700px",
    margin: "atuo",
    textAlign: "center" as const,
  },
  content: {
    width: "100%",
    marginTop: "20px",
    textAlign: "left" as const,
  },
  main_color: {
    color: "#3CC68A",
  },
  background_color: {
    color: "#282c34",
  },
  wide_card: {
    padding: "10px",
    textAlign: "left" as const,
  },
  wide_card_title: {
    color: "#3CC68A",
    textAlign: "center" as const,
  },
  blockquote: {
    background: "#f9f9f9",
    borderLeft: "10px solid #3CC68A",
    margin: "1.5em 10px",
    padding: "1em 2em",
    color: "black",
  },
  clear_path: {
    clear: "both" as const,
  },
  li: {
    listStyleType: "none",
    marginLeft: "0",
  },
  ul: {
    listStyleType: "none",
    paddingLeft: "0",
  },
  status_bar: {
    width: "100%",
    padding: "5px",
    margin: "10px 0px",
    clear: "both" as const,
    justifyContent: "center" as const,
  },
  status_bar_title: {
    float: "left" as const,
    fontSize: "16px",
    fontWeight: "bolder" as const,
  },
  status_bar_btn: {
    float: "right" as const,
    textAlign: "center" as const,
    marginRight: "20px",
  },
  modal: {
    maxWidth: "700px",
    maxHeight: "80%",
    overflowY: "scroll" as const,
    padding: "20px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
  },
  paper: {
    backgroundColor: "gray",
    border: "2px solid #000",
    boxShadow: "10px",
    padding: "10px",
    width: "100%",
    outline: "none",
  },
  hidden_btn: {
    width: "100%",
    border: "0",
    backgroundColor: "rgb(0,0,0, 0)",
    height: "0",
    cursor: "auto",
  },
  single_line_code: {
    background: "white",
    color: "gray",
    padding: "2px",
    borderRadius: "5px",
  },
  explain_text: {
    fontSize: "14px",
    color: "gray",
    margin: "20px",
  },
  input_wrap: {
    padding: "2px 5px",
    marginBottom: "10px",
    display: "block",
    background: "white",
  },
  input: {
    width: "100%",
    outline: "none",
    fontSize: "14px",
    border: "0",
    overflowX: "scroll" as const,
    verticalAlign: "text-bottom",
  },
  describe_img_wrapper: {
    maxWidth: "100px",
    margin: "40px auto",
  },
  describe_img: {
    width: "100%",
    height: "100%",
    background: "#282c34",
  },
  describe_img_footnote: {
    textAlign: "center" as const,
    fontSize: "11px",
  },
};

export default styles;
