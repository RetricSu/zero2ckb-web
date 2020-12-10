import React from 'react';
import QueryCell from './tools/queryCell';
import QueryTx from './tools/queryTx';
import Hex2Decimal from './tools/hex2decimal';

export default function Box(){
    return(
        <div>
            <QueryCell></QueryCell>
            <QueryTx></QueryTx>
            <Hex2Decimal></Hex2Decimal>
        </div>
    )
}