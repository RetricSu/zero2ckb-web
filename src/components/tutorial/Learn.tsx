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

  const lngs: any = {
    en: { nativeName: 'English' },
    zh: { nativeName: 'Chinese' }
  };

  return (
    <Grid container spacing={1}>
        <Grid item xs={12}>
          <AlertMessager msg='Note: the chain used in this tutorial will be reset at every monday mid-night 1 am.' display={true}/>
        </Grid>
        <Grid item xs={12}>
          <Container maxWidth="md" style={styles.page}>
            <DndProvider backend={HTML5Backend}>
              <TableOfContents t={t} />
              <ToolBox t={t} />
              <Notify />
              <BeforeWeGetStarted t={t} />
              <PreKnowledge t={t} />
              <ShowChainInfo t={t}/>
              <Class1 t={t} />
              <br/><br/>
              <br/><br/>
              <br/><br/>
              <div>
                {Object.keys(lngs).map((lng) => (
                  <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
                    {lngs[lng].nativeName}
                  </button>
                ))}
              </div>
              <p>{t("tutorial.context.moreClass")}</p>
              <hr/>
              <Class2 />
              <Class3 />
              <Class4 />
            </DndProvider>
          </Container>
        </Grid>
    </Grid>
  );
}

export default Learn;