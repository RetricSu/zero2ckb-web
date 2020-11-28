import React from 'react';
import Blockchain from './Blockchain';

const styles = {
    page: {
        minWidth: '500px',
        width: '70%',
        margin: '0 auto',
        textAlign: 'center' as const
    },
    content: {
        marginTop: '20px',
        width: '500px',
        margin: '0 auto',
        textAlign: 'left' as const
    }
}

function Learn() {

  return (
    <div style={styles.page}>
        <h1>Lesson 1</h1>
        <p> let's learn the fisrt knowdage: every thing is cell in CKB! </p>
        <hr/>
        <div style={styles.content}>
        <p> CKB is the innovation of Bitcoin. It generalize the UTXO structure for more flexable data type thus enable programble token. 
            by introducing two kind of script(lock and type) in Cell model, for the first time we can embed a real micro computer in blockchain! </p>
        </div>
        <hr/>
        <Blockchain />
    </div>
  );
}

export default Learn;
