import React, { useState } from 'react';
import FreshButton from '../../../widget/fresh_button';
import Api from '../../../../api/blockchain';
import {notify} from '../../../widget/notify';

export default function NewBlocks (){
    const [isLoading, setIsLoading] = useState(false);
    const [blocks, setBlocks] = useState();

    const fetchNewBlocks = async () => {
        setIsLoading(true);
        const api = new Api();
        const res = await api.getNewBlocks();
        if(res.status === "ok"){
            const blocks = res.data;
            setBlocks(blocks.map((b:any) => 
            <li key={b.header.number}>
                <p> {b.header.hash} </p>
                <p> {b.header.number} </p>
                <p> {b.header.epoch} </p>
            </li>    
            ));
        }else{
            notify(JSON.stringify(res));
        }
        setIsLoading(false);
    }

    return(
        <div>
            <div>
                blocks area:
                <ul>
                    {blocks}
                </ul>
            </div>
            <FreshButton isLoading={isLoading} text={'刷新'} onClick={fetchNewBlocks} ></FreshButton>
        </div>
    )
}