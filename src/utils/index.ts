import JSBI from 'jsbi';
import { mode } from '../config/constant.json';

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

const shannon2CKB = (num: number | string | BigInt) => {
    // return BigInt(num).toString(10).substring(0, BigInt(num).toString(10).length-7) 
    //        + '.' + 
    //        BigInt(num).toString(10).substring(BigInt(num).toString(10).length-7);
    return JSBI.divide(JSBI.BigInt(num), JSBI.BigInt(100000000)).toString(10);
}

const CKB2shannon = (num: number | string | BigInt) => {
    return BigInt(num).toString(10) + '00000000';
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

const get_env_mode = () => {
    //todo: maybe auto test using os === 'ubuntu' or something.
    return mode === 'development' ? 'development' : 'production';
}

export default {
    convertTimestamp: convertTimestamp,
    hex2dec: hex2dec,
    dec2hex: dec2hex,
    shannon2CKB: shannon2CKB,
    CKB2shannon: CKB2shannon,
    isObjectInArray: isObjectInArray,
    get_env_mode: get_env_mode
}
