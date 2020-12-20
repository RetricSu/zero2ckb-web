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

// notice: the order of key-value pair in Object
// does matter in this funciton.
// (meaning that they will not be the same and return false)
const isObjectInArray = (item: object, arr: object[]) => {
   for(let i=0;i<arr.length;i++){
        if( JSON.stringify(arr[i]) === JSON.stringify(item) ){
            return true;
        } 
   }
   return false;
}


export default {
    convertTimestamp: convertTimestamp,
    hex2dec: hex2dec,
    dec2hex: dec2hex,
    isObjectInArray: isObjectInArray
}