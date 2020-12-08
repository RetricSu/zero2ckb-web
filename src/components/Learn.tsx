import React from 'react';
import Notify from './widget/notify';
import BeforeWeGetStarted from './BeforeWeGetStarted';
import PreKnowledge from './PreKnowledge';
import ShowChainInfo from './ShowChainInfo';
import Class1 from './Class1';
import Class2 from './Class2';
import Class3 from './Class3';
import Class4 from './Class4';

import styles from './widget/common_style';

function Learn() {
  
  return (
    <div style={styles.page}>
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
    </div>
  );
}

export default Learn;