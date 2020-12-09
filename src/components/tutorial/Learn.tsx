import React from 'react';
import Notify from '../widget/notify';
import BeforeWeGetStarted from './sections/BeforeWeGetStarted';
import PreKnowledge from './sections/PreKnowledge';
import ShowChainInfo from './sections/ShowChainInfo';
import Class1 from './sections/Class1';
import Class2 from './sections/Class2';
import Class3 from './sections/Class3';
import Class4 from './sections/Class4';

import { Container } from '@material-ui/core';
import styles from '../widget/common_style';

function Learn() {
  return (
    <Container maxWidth="md" style={styles.page}>
      <Notify />
      <BeforeWeGetStarted />
      <PreKnowledge />
      <ShowChainInfo />
      <Class1 />
      <br/><br/>
      <br/><br/>
      <br/><br/>
      <p>更多课程</p>
      <hr/>
      <Class2 />
      <Class3 />
      <Class4 />
    </Container>
  );
}

export default Learn;