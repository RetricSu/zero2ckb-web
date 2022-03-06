import React from 'react';
import Notify from '../widget/notify';
import BeforeWeGetStarted from './sections/BeforeWeGetStarted';
import PreKnowledge from './sections/PreKnowledge';
import ShowChainInfo from './sections/ShowChainInfo';
import Class1 from './sections/Class1';
import Class2 from './sections/Class2';
import Class3 from './sections/Class3';
import Class4 from './sections/Class4';
import TableOfContents from '../widget/table_of_contents';
import ToolBox from '../toolbox/FloatingBox';
import AlertMessager from '../widget/alert_messager';

import { Container, Grid } from '@material-ui/core';
import styles from '../widget/common_style';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { useTranslation } from 'react-i18next';

function Learn() {
  const { t, i18n } = useTranslation();

  return (
    <Grid container spacing={1}>
        <Grid item xs={12}>
          <AlertMessager msg='Note: the chain used in this tutorial will be reset at every monday mid-night 1 am.' display={true}/>
        </Grid>
        <Grid item xs={12}>
          <Container maxWidth="md" style={styles.page}>
            <DndProvider backend={HTML5Backend}>
              <TableOfContents t={t} i18n={i18n} />
              <ToolBox t={t} />
              <Notify />
              <BeforeWeGetStarted t={t} />
              <PreKnowledge t={t} />
              <ShowChainInfo t={t}/>
              <Class1 t={t} />
              <br/><br/>
              <br/><br/>
              <br/><br/>
              <p>{t("tutorial.context.moreClass")}</p>
              <hr/>
              <Class2 t={t} />
              <Class3 t={t} />
              <Class4 t={t} />
            </DndProvider>
          </Container>
        </Grid>
    </Grid>
  );
}

export default Learn;
