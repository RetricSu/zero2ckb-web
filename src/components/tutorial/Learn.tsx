import { FeedBack } from "../widget/feedback/feedback";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useTranslation } from "react-i18next";
import { Container, Grid } from "@material-ui/core";

import Notify from "../widget/notify";
import Class1 from "./sections/Class1";
import Class2 from "./sections/Class2";
import Class3 from "./sections/Class3";
import Class4 from "./sections/Class4";
import ToolBox from "../toolbox/FloatingBox";
import PreKnowledge from "./sections/PreKnowledge";
import ShowChainInfo from "./sections/ShowChainInfo";
import AlertMessager from "../widget/alert_messager";
import TableOfContents from "../widget/table_of_contents";
import BeforeWeGetStarted from "./sections/BeforeWeGetStarted";

import styles from "../widget/common_style";

function Learn() {
  const { t, i18n } = useTranslation();

  return (
    <div style={{
      overflowX: "hidden"
    }}>
      <Notify />
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <AlertMessager
            msg="Note: the chain used in this tutorial will be reset at every monday mid-night 1 am."
            display={true}
          />
        </Grid>
      </Grid>
      <DndProvider backend={HTML5Backend}>
        <Grid container spacing={1} alignItems="stretch">
          <Grid item xs={12} md={3}>
            <TableOfContents t={t} i18n={i18n} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Container maxWidth="md" style={styles.page}>
              <BeforeWeGetStarted t={t} />
              <PreKnowledge t={t} />
              <ShowChainInfo t={t} />
              <Class1 t={t} />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <p>{t("tutorial.context.moreClass")}</p>
              <hr />
              <Class2 t={t} />
              <Class3 t={t} />
              <Class4 t={t} />
            </Container>
          </Grid>
          <Grid item xs={12} md={3}>
            <div style={styles.page}>
              <FeedBack />
              <ToolBox t={t} />
            </div>
          </Grid>
        </Grid>
      </DndProvider>
    </div>
  );
}

export default Learn;
