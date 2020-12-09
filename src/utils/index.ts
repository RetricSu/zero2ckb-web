const convertTimestamp = (ts: string | number) => {
    if(typeof ts === 'string'){
        return new Date(parseInt(ts)).toLocaleTimeString();
    }else{
        return new Date(ts).toLocaleTimeString();
    }
}

export default {
    convertTimestamp: convertTimestamp
}