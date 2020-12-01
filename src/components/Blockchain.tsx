import React, { useState, useEffect } from 'react';
import Api from '../api/blockchain';

const styles = {
    live_cells: {
        margin: '20px'
    }
};

function Blockchain(){
    
    const [cells, setCells] = useState([]);

    useEffect(() => {   
        test();
    }, []);
    
    async function test() {
        const api = new Api();
        const cells = await api.getLiveCells(undefined);
        console.log(cells);
        setCells(cells.map((cell:string, index:number) => <li key={index}>{JSON.stringify(cell)}</li>));
    }


    return(
        <div style={styles.live_cells}>
           {cells}
        </div>
    )
}

export default Blockchain;