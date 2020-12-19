const convertTimestamp = (ts: string | number) => {
    if(typeof ts === 'string'){
        return new Date(parseInt(ts)).toLocaleTimeString();
    }else{
        return new Date(ts).toLocaleTimeString();
    }
}

const hex2dec =  (num: string) => {
    return BigInt(num).toString(10);
}

const dec2hex = (num: string) => {
    return BigInt(num).toString(16);
}


export default {
    convertTimestamp: convertTimestamp,
    hex2dec: hex2dec,
    dec2hex: dec2hex,
}