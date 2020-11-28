import React from 'react';
import Api from '../api/blockchain';

const styles = {
    live_cells: {
        margin: '20px'
    }
};

function Blockchain(){
    const cells_length: number = -1;
    const api = new Api();
    
    return(
        <div style={styles.live_cells}>
            cells: {cells_length}
        </div>
    )
}

export default Blockchain;